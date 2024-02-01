import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { AuthEntity } from './auth.entity';
import { AbstractEntity } from './abstract.entity';
import { CommentEntity } from './comment.entity';
import { VideoEntity } from './video.entity';

@Entity()
export class LikeEntity extends AbstractEntity {
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
  @JoinColumn({ name: 'userId' })
  auth: AuthEntity;

  @Column()
  userId: number;

  @Column()
  entityType: string; // 'video' or 'comment'

  @Column()
  entityId: number;

  @ManyToOne(() => VideoEntity, { eager: true, nullable: true })
  // @JoinColumn({ name: 'entityId', referencedColumnName: 'id', insert: false, update: false })
  video: VideoEntity;

  @ManyToOne(() => CommentEntity, { eager: true, nullable: true })
  // @JoinColumn({ name: 'entityId', referencedColumnName: 'id', insert: false, update: false })
  comment: CommentEntity;

  @Column()
  isLike: boolean; // true for like, false for dislike
}
