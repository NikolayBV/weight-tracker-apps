import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  providers: [AuthService, AuthGuard],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}