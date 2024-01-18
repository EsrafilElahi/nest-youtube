import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, Length, MinLength } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { AuthEntity } from './AuthEntity';

@Entity()
export class ProfileEntity {
  @Column()
  @PrimaryGeneratedColumn()
  profileId: string;

  @Column()
  @OneToOne(() => AuthEntity, (auth) => auth.profile)
  auth: AuthEntity;

  @Column()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Column()
  @IsNumber()
  @Length(11)
  phone: string;

  @Column()
  @IsString()
  bio: string;

  @Column()
  @IsString()
  address: string;

  @Column()
  @IsString()
  job: string;

  @Column()
  @IsString()
  avatar: string;
}
