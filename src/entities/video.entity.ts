import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { AuthEntity } from './auth.entity';
import { AbstractEntity } from './abstract.entity';
import { CommentEntity } from './comment.entity';

@Entity()
export class VideoEntity extends AbstractEntity {
  // In TypeORM, the { eager: true } option in a @ManyToOne or @OneToOne relationship decorator is used to automatically load the related entity when querying for the owning entity. This means that when you fetch a VideoEntity, the related AuthEntity will also be loaded immediately.By default, TypeORM performs lazy loading for these relationships, which means the related entity is loaded only when accessed. However, when you set { eager: true }, TypeORM fetches the related entity along with the owning entity in a single query, reducing the need for additional queries when accessing the related entity.

  // Examples:

  // ------------------ Without Eager Loading (Lazy Loading): ------------------
  // const video = await videoRepository.findOne(1);
  // const auth = video.auth;
  // Lazy loading, triggers an additional query

  // ------------------ Witho Eager Loading (Lazy Loading): ------------------

  // video = await videoRepository.findOne(1, { relations: ['auth'] });
  // auth = video.auth;
  // No additional query, as it was fetched eagerly

  @ManyToOne(() => AuthEntity, (auth) => auth.videos, { eager: true, cascade: true })
  auth: AuthEntity;

  @Column()
  @IsString({ message: 'title should be a string!' })
  @IsNotEmpty({ message: 'title should not be empty!' })
  title: string;

  @Column()
  @IsString({ message: 'description should be a string!' })
  @IsOptional()
  description: string;

  @Column()
  @IsString({ message: 'url should be a string!' })
  @IsOptional()
  url: string;

  @Column()
  @IsNumber({}, { message: 'url should be a number!' })
  @IsOptional()
  views: number;

  @Column()
  @OneToMany(() => CommentEntity, (comment) => comment.video, { eager: true, cascade: true })
  @JoinColumn()
  comments: CommentEntity[];
}
