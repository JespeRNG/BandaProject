import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import { ROUNDS_OF_HASHING } from '@src/constants/constants';
import { Session } from '@src/session/entities/session.entity';

@Entity()
@Unique('UQ_USERNAME', ['username'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty()
  @Column({ unique: true })
  username!: string;

  @ApiProperty()
  @Column({ unique: true })
  email!: string;

  @Column()
  @Exclude()
  password!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Session, (session) => session.user)
  sessions!: Session[];

  @BeforeInsert()
  protected async hashPassword(): Promise<void> {
    if (this.password) {
      this.password = await bcrypt.hash(
        this.password,
        ROUNDS_OF_HASHING
      );
    }
  }
}
