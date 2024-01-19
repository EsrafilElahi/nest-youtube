import { IsEnum, IsNotEmpty, IsNumber, IsString, Length, MaxLength, MinLength } from 'class-validator';
import { Entity, Column, OneToOne } from 'typeorm';
import { AuthEntity } from './auth.entity';
import { AbstractEntity } from './abstract.entity';
import { Role } from 'src/interface/interfaces';

@Entity()
export class ProfileEntity extends AbstractEntity {
  @OneToOne(() => AuthEntity, (auth) => auth.profile)
  auth: AuthEntity;

  @Column()
  @IsString({ message: 'First name should be a string!' })
  @IsNotEmpty({ message: 'First name should not be empty!' })
  firstName: string;

  @Column()
  @IsString({ message: 'Last name should be a string!' })
  @IsNotEmpty({ message: 'Last name should not be empty!' })
  lastName: string;

  @Column()
  @IsString({ message: 'Phone should be a string!' })
  @MinLength(11, { message: 'Phone number must be 11 characters long!' })
  @MaxLength(11, { message: 'Phone number must be 11 characters long!' })
  phone: string;

  @Column()
  @IsString({ message: 'Bio should be a string!' })
  bio: string;

  @Column()
  @IsString({ message: 'Address should be a string!' })
  address: string;

  @Column()
  @IsString({ message: 'Job should be a string!' })
  job: string;

  @Column()
  @IsString({ message: 'Avatar should be a string!' })
  avatar: string;

  @Column()
  @IsEnum(Role, { message: 'role must be valid!' })
  role: Role;
}
