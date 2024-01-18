import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, Length, MinLength } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Auth } from './AuthEntity';

@Entity()
export class Profile {
  @Column()
  @PrimaryGeneratedColumn()
  profileId: string;

  @Column()
  @OneToOne(() => Auth, (auth) => auth.profile)
  auth: Auth;

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
