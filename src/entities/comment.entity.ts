import { IsOptional, IsString } from 'class-validator';
import { Entity, Column, ManyToOne, JoinColumn, OneToMany, JoinTable, TreeChildren, TreeParent, BeforeUpdate, BeforeInsert } from 'typeorm';
import { AuthEntity } from './auth.entity';
import { AbstractEntity } from './abstract.entity';
import { VideoEntity } from './video.entity';

@Entity()
export class CommentEntity extends AbstractEntity {
  @ManyToOne(() => AuthEntity, (auth) => auth.comments, { eager: true, cascade: true })
  auth: AuthEntity;

  @Column()
  @IsString({ message: 'text should be a string!' })
  @IsOptional()
  text: string;

  // here no need to { eager: true, cascade: true } beacause there is no relation external table, it's self join
  @OneToMany(() => CommentEntity, (comment) => comment.parentComment)
  @JoinColumn()
  replies: CommentEntity[];

  // Eager loading is beneficial when you know you'll always need the related data, as it reduces the number of queries by fetching everything in one go.
  // Lazy loading is useful when you want to avoid fetching unnecessary data and only load related entities when needed.

  @ManyToOne(() => CommentEntity, (comment) => comment.replies)
  parentComment: CommentEntity;

  @BeforeUpdate()
  @BeforeInsert()
  async setDefaultValue() {
    this.replies = this.replies || [];
    this.parentComment = this.parentComment || null;
  }

  @ManyToOne(() => VideoEntity, (video) => video.comments, { onDelete: 'SET NULL' })
  video: VideoEntity;
}

// eager: true (Eager Loading):
// When eager: true is set on a relationship, it means that the related entity will be loaded along with the main entity when querying the database.
// In your case, when you load a CommentEntity from the database, the associated AuthEntity, replies, and parentComment will be loaded eagerly, meaning all the related entities will be fetched in a single query.

// lazy: true (Lazy Loading):
// When lazy: true is set on a relationship, it means that the related entity will be loaded only when explicitly requested.
// In your case, if you access the replies or parentComment property of a CommentEntity instance, the related entities will be loaded at that point, triggering additional queries to the database.
