import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Entity, Column, ManyToOne } from 'typeorm';
import { AuthEntity } from './auth.entity';
import { AbstractEntity } from './abstract.entity';

@Entity()
export class CommentEntity extends AbstractEntity {
  @ManyToOne(() => AuthEntity, (auth) => auth.videos, { eager: true, cascade: true })
  auth: AuthEntity;

  @Column()
  @IsString({ message: 'title should be a string!' })
  @IsNotEmpty({ message: 'title should not be empty!' })
  title: string;

  @Column()
  @IsString({ message: 'description should be a string!' })
  @IsOptional()
  description: string;

  @Column()
  @IsString({ message: 'url should be a string!' })
  @IsOptional()
  url: string;

  @Column()
  @IsNumber({}, { message: 'url should be a number!' })
  @IsOptional()
  views: number;
}
