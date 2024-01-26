import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
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
  @JoinColumn()
  @OneToMany(() => CommentEntity, (comment) => comment.parentComment, { eager: true, lazy: true, cascade: true })
  replies: CommentEntity[];

  @Column()
  @ManyToOne(() => CommentEntity, (comment) => comment.replies, { eager: true, lazy: true, cascade: true })
  parentComment: CommentEntity;
}
