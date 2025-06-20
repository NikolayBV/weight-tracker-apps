import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetWeightDto } from './dto/getWeight.dto';

@Injectable()
export class WeightsService {
  constructor(private prisma: PrismaService) {}

  async addWeight(userId: string, dto: { weight: string; date: string }) {
    const weight = await this.prisma.weight.create({
      data: {
        userId,
        weight: +dto.weight,
        date: new Date(dto.date),
      },
    });
    if (!weight) {
      throw new ForbiddenException('Ошибка');
    }

    return {
      message: 'Вес успешно добавлен',
      entry: weight,
    };
  }

  async getWeight(dto: GetWeightDto) {
    const { userId, sortBy, order } = dto;
    const weights = await this.prisma.weight.findMany({
      where: { userId },
      orderBy: {
        [sortBy]: order,
      },
    });
    if (weights.length === 0) {
      return {
        message: 'Данные отсутствуют',
      };
    }
    return {
      message: 'Вес успешно получен',
      entries: weights,
    };
  }
}
