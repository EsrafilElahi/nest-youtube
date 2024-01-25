import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Entity, Column, OneToOne } from 'typeorm';
import { AuthEntity } from './auth.entity';
import { AbstractEntity } from './abstract.entity';
import { Role } from 'src/interface/interfaces';

@Entity()
export class ProfileEntity extends AbstractEntity {
  // In TypeORM, the { eager: true } option in a @ManyToOne or @OneToOne relationship decorator is used to automatically load the related entity when querying for the owning entity. This means that when you fetch a VideoEntity, the related AuthEntity will also be loaded immediately.By default, TypeORM performs lazy loading for these relationships, which means the related entity is loaded only when accessed. However, when you set { eager: true }, TypeORM fetches the related entity along with the owning entity in a single query, reducing the need for additional queries when accessing the related entity.

  @OneToOne(() => AuthEntity, (auth) => auth.profile, { eager: true, cascade: true })
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
