import { IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { Entity, Column, OneToOne, JoinColumn, OneToMany, ManyToMany, ManyToOne } from 'typeorm';
import { AuthEntity } from './auth.entity';
import { AbstractEntity } from './abstract.entity';
import { Role } from 'src/interface/interfaces';

@Entity()
export class VideoEntity extends AbstractEntity {
  @ManyToOne(() => AuthEntity, (auth) => auth.videos, { eager: true, cascade: true })
  auth: AuthEntity;

  @Column()
  @IsString({ message: 'title should be a string!' })
  @IsNotEmpty({ message: 'title should not be empty!' })
  title: string;

  @Column()
  @IsString({ message: 'description should be a string!' })
  @IsNotEmpty({ message: 'description should not be empty!' })
  description: string;

  @Column()
  @IsString({ message: 'url should be a string!' })
  @IsNotEmpty({ message: 'url should not be empty!' })
  url: string;

  @Column()
  @IsNumber({}, { message: 'url should be a number!' })
  @IsNotEmpty({ message: 'views should be number and should not be empty!' })
  views: number;
}
