import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { Request, Response } from 'express';
import { LoginDto } from '../dto/login.dto';
import { compare } from 'bcrypt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginResponse } from './auth.types';

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

  async login(loginDto: LoginDto, res: Response): Promise<LoginResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user || !(await compare(loginDto.password, user.password))) {
      throw new ForbiddenException('Неверный email или пароль');
    }

    const tokens = await this.getTokens(user.id, user.email);

    this.setRefreshTokenCookie(res, tokens.refreshToken);

    return {
      message: 'Успешный вход',
      token: tokens.accessToken,
      user: {
        id: user.id,
        email: user.email,
        birthdayDate: user.birthdayDate,
        height: user.height,
        gender: user.gender,
      },
    };
  }

  async register(createUserDto: CreateUserDto, res: Response): Promise<void> {
    try {
      const user = await this.usersService.registerUser(createUserDto);
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
    } catch (error) {
      if (error) {
        throw new ConflictException(
          'Пользователь с таким email уже существует',
        );
      }
      throw error;
    }
  }

  async refreshToken(
    req: Request,
    res: Response,
  ): Promise<{ accessToken: string }> {
    const token = req.cookies?.refresh_token as string;

    if (!token) {
      this.clearRefreshTokenCookie(res);
      throw new UnauthorizedException('Refresh token not provided');
    }

    try {
      const payload = this.jwtService.verify<JwtPayload>(token, {
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
      path: '/auth/refresh',
    });
  }

  private clearRefreshTokenCookie(res: Response): void {
    res.clearCookie('refresh_token', {
      path: '/auth/refresh',
    });
  }
}