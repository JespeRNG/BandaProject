import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { REFRESH_EXPIRESIN } from '@src/constants/constants';
import { User } from '@src/user/entities/user.entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, (user) => user.sessions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  @ApiProperty()
  user!: User;

  @ApiProperty()
  @Column()
  refreshToken!: string;

  @Column()
  expiresAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  userId!: string;

  @BeforeInsert()
  protected setExpiresAt(): void {
    const days = parseInt(REFRESH_EXPIRESIN);
    this.expiresAt = new Date(
      Date.now() + days * 24 * 60 * 60 * 1000
    ); //transforming days into milliseconds and into date
  }
}
