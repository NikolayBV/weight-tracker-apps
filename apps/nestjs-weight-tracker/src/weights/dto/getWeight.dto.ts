import { IsString, IsIn } from 'class-validator';

export class GetWeightDto {
  @IsString()
  userId: string;

  @IsIn(['date', 'weight'])
  sortBy: 'date' | 'weight';

  @IsIn(['asc', 'desc'])
  order: 'asc' | 'desc';
}
