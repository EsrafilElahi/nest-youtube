import { IsEnum, IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
import { Entity, Column, OneToOne } from 'typeorm';
import { AuthEntity } from './auth.entity';
import { AbstractEntity } from './abstract.entity';
import { Role } from 'src/interface/interfaces';

@Entity()
export class ProfileEntity extends AbstractEntity {
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

  @Column()
  @IsEnum(Role)
  role: Role;
}
