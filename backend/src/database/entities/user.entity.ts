import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ length: 50, unique: true, comment: '用户名' })
  username: string;

  @Column({ length: 255, comment: '密码' })
  password: string;

  @Column({ length: 50, nullable: true, comment: '真实姓名' })
  realName: string;

  @Column({ length: 100, nullable: true, unique: true, comment: '邮箱' })
  email: string;

  @Column({ length: 20, nullable: true, comment: '手机号' })
  phone: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'editor', 'viewer'],
    default: 'viewer',
    comment: '角色',
  })
  role: string;

  @Column({ type: 'tinyint', default: 1, comment: '状态：1-启用，0-禁用' })
  status: number;

  @Column({ type: 'datetime', nullable: true, comment: '最后登录时间' })
  lastLoginAt: Date;
}
