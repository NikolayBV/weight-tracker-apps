/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsEmail,
  IsString,
  MinLength,
  IsInt,
  Min,
  IsEnum,
} from 'class-validator';
import { Gender } from '@prisma/client';

export class CreateUserDto {
  @IsEmail(undefined, { message: 'Неверный формат email' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Пароль должен быть минимум 6 символов' })
  password: string;

  @IsInt({ message: 'Возраст должен быть целым числом' })
  @Min(1, { message: 'Возраст должен быть больше 0' })
  birthdayDate: Date;

  @IsInt({ message: 'Рост должен быть целым числом' })
  @Min(1, { message: 'Рост должен быть больше 0' })
  height: number;

  @IsEnum(Gender)
  gender: Gender;
}
