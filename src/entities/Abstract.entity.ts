import { BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Entity } from 'typeorm';

export abstract class AbstractEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
