import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Entity, Column, ManyToOne } from 'typeorm';
import { AuthEntity } from './auth.entity';
import { AbstractEntity } from './abstract.entity';

@Entity()
export class CommentEntity extends AbstractEntity {
  @ManyToOne(() => AuthEntity, (auth) => auth.comments, { eager: true, cascade: true })
  auth: AuthEntity;

  @Column()
  @IsString({ message: 'text should be a string!' })
  @IsOptional()
  text: string;

  @Column()
  replies: CommentEntity[];

  @Column()
  parentComment: CommentEntity;
}
