import { ForbiddenException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { Request, Response } from 'express';
import { LoginDto } from '../dto/login.dto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto, res: Response) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });
    if (!user || !(await compare(loginDto.password, user.password))) {
      throw new ForbiddenException('Неверный email или пароль');
    }

    const tokens = await this.getTokens(user.id, user.email);

    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

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

  async getTokens(
    userId: string,
    email: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { sub: userId, email };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async refreshToken(req: Request, res: Response) {
    const token = req.cookies?.refresh_token as string;

    if (!token) {
      res.clearCookie('refresh_token');
      throw new UnauthorizedException('Refresh token not provided');
    }
    let payload: { sub: string; email: string };
    try {
      payload = this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const tokens = await this.getTokens(payload.sub, payload.email);

      res.cookie('refresh_token', tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return { accessToken: tokens.accessToken };
    } catch (e) {
      res.clearCookie('refresh_token');
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
