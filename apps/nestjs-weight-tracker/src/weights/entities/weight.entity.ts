import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Weight {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  userId: string;

  @Column()
  date: Date;

  @Column()
  weight: number;

  @Column()
  createdAt: Date;
}
