import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { Request, Response } from 'express';
import { LoginDto } from '../dto/login.dto';
import { compare } from 'bcrypt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

interface JwtPayload {
  sub: string;
  email: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(loginDto: LoginDto, res: Response): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user || !(await compare(loginDto.password, user.password))) {
      throw new ForbiddenException('Неверный email или пароль');
    }

    const tokens = await this.getTokens(user.id, user.email);

    this.setRefreshTokenCookie(res, tokens.refreshToken);
    res.status(HttpStatus.OK).json({
      message: 'Успешный вход',
      token: tokens.accessToken,
      user: {
        id: user.id,
        email: user.email,
        birthdayDate: user.birthdayDate,
        height: user.height,
        gender: user.gender,
      },
    });
  }

  async register(createUserDto: CreateUserDto, res: Response): Promise<void> {
    const user = await this.usersService.registerUser(createUserDto);

    if (!user) {
      this.clearRefreshTokenCookie(res);
      throw new UnauthorizedException('Refresh token not provided');
    }

    const tokens = await this.getTokens(user.id, user.email);

    this.setRefreshTokenCookie(res, tokens.refreshToken);

    res.status(HttpStatus.CREATED).json({
      message: 'Пользователь зарегистрирован',
      token: tokens.accessToken,
      user: {
        id: user.id,
        email: user.email,
        birthdayDate: user.birthdayDate,
        height: user.height,
      },
    });
  }

  async refreshToken(
    req: Request,
    res: Response,
  ): Promise<{ accessToken: string }> {
    console.log('start');
    console.log(req.cookies);
    const token = req.cookies?.refresh_token as string;

    if (!token) {
      this.clearRefreshTokenCookie(res);
      throw new UnauthorizedException('Refresh token not provided');
    }
    console.log(token, 'api/refresh');
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const userExists = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!userExists) {
        this.clearRefreshTokenCookie(res);
        throw new UnauthorizedException('User no longer exists');
      }

      const tokens = await this.getTokens(payload.sub, payload.email);
      this.setRefreshTokenCookie(res, tokens.refreshToken);

      return { accessToken: tokens.accessToken };
    } catch (e) {
      console.log(e);
      this.clearRefreshTokenCookie(res);
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  private async getTokens(userId: string, email: string): Promise<Tokens> {
    const payload = { sub: userId, email };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
      }),
    ]);

    return { accessToken, refreshToken };
  }

  private setRefreshTokenCookie(res: Response, token: string): void {
    res.cookie('refresh_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/api/auth/refresh',
    });
  }

  private clearRefreshTokenCookie(res: Response): void {
    res.clearCookie('refresh_token', {
      path: '/api/auth/refresh',
    });
  }
}
