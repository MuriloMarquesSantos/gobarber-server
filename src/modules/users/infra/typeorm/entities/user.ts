import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import UserResponse from '@modules/users/dtos/UserResponse';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  toUserResponse(): UserResponse {
    return {
      name: this.name,
      email: this.email,
      id: this.id,
      avatar: `http://localhost:3333/files/${this.avatar}`,
    };
  }
}

export default User;
