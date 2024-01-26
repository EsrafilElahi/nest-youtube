import { IsEmail, IsEnum, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { Entity, Column, OneToOne, JoinColumn, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';
import { Role } from 'src/interface/interfaces';
import { ProfileEntity } from './profile.entity';
import { AbstractEntity } from './abstract.entity';
import { hash } from 'bcryptjs';
import { VideoEntity } from './video.entity';
import { CommentEntity } from './comment.entity';

@Entity()
export class AuthEntity extends AbstractEntity {
  @Column({ unique: true })
  @IsNotEmpty({ message: 'Email should not be empty!' })
  @IsEmail()
  email: string;

  @Column({ select: false })
  @IsNotEmpty({ message: 'Password should not be empty!' })
  @MinLength(6, { message: 'password length must be greater than 6' })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.DEVELOPER })
  @IsEnum(Role, { message: 'role must be valid!' })
  @IsOptional()
  role: Role;

  @OneToOne(() => ProfileEntity, (profile) => profile.auth)
  @JoinColumn()
  @IsOptional()
  profile: ProfileEntity;

  @OneToMany(() => VideoEntity, (video) => video.auth)
  @JoinColumn()
  @IsOptional()
  videos: VideoEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.auth)
  @JoinColumn()
  @IsOptional()
  comments: CommentEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password) {
      return;
    }
    this.password = await hash(this.password, 10);
  }
}
