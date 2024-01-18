import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Role } from 'src/interface/interfaces';
import { ProfileEntity } from './ProfileEntity';

@Entity()
export class AuthEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @Column()
  @IsEnum(Role)
  role: Role;

  @OneToOne(() => ProfileEntity, (profile) => profile.auth)
  @JoinColumn()
  profile: ProfileEntity;
}
