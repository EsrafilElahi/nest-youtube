import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { Entity, Column, OneToOne, JoinColumn, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';
import { Role } from 'src/interface/interfaces';
import { ProfileEntity } from './profile.entity';
import { AbstractEntity } from './abstract.entity';
import { hash } from 'bcryptjs';
import { VideoEntity } from './video.entity';

@Entity()
export class AuthEntity extends AbstractEntity {
  @Column()
  @IsNotEmpty({ message: 'Email should not be empty!' })
  @IsEmail()
  email: string;

  @Column()
  @IsNotEmpty({ message: 'Password should not be empty!' })
  @MinLength(6, { message: 'password length must be greater than 6' })
  password: string;

  @Column()
  @IsEnum(Role, { message: 'role must be valid!' })
  role: Role;

  @OneToOne(() => ProfileEntity, (profile) => profile.auth)
  @JoinColumn()
  profile: ProfileEntity;

  @OneToMany(() => VideoEntity, (video) => video.auth)
  @JoinColumn()
  videos: VideoEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password) {
      return;
    }
    this.password = await hash(this.password, 10);
  }
}
