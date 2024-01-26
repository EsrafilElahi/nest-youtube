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
  @OneToMany(() => CommentEntity, (comment) => comment.parentComment, { eager: true, cascade: true })
  replies: CommentEntity[];

  // Eager loading is beneficial when you know you'll always need the related data, as it reduces the number of queries by fetching everything in one go.
  // Lazy loading is useful when you want to avoid fetching unnecessary data and only load related entities when needed.

  @Column()
  @ManyToOne(() => CommentEntity, (comment) => comment.replies, { eager: true, cascade: true })
  parentComment: CommentEntity;
}
