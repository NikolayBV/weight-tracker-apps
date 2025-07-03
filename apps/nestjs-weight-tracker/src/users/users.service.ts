import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: string, dto: UpdateUserDto) {
    try {
      const { email, password, birthdayDate, height, gender } = dto;

      const data: Record<string, any> = {};

      if (email) data.email = email;
      if (password && password.trim() !== '') {
        data.password = await hash(password, 10);
      }
      if (birthdayDate) data.birthdayDate = new Date(birthdayDate);
      if (height !== undefined && !isNaN(Number(height))) {
        data.height = Number(height);
      }
      if (gender) data.gender = gender;

      return await this.prisma.user.update({
        where: { id },
        data,
      });
    } catch (error) {
      console.error('Ошибка обновления пользователя:', error);
      throw new NotFoundException(`Пользователь с ID ${id} не найден`);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async registerUser(dto: CreateUserDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) {
      throw new ConflictException('Email уже зарегистрирован');
    }

    const hashPass = await hash(dto.password, 10);
    return await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashPass,
        birthdayDate: new Date(dto.birthdayDate),
        height: +dto.height,
        gender: dto.gender,
      },
    });
  }
}
