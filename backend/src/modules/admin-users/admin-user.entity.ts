import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('admin_users')
export class AdminUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ default: 'editor' })
  role: string;

  @Column({ default: 'active' })
  status: string;

  @Column({ type: 'datetime', nullable: true })
  lastLoginTime: Date;

  @Column({ type: 'tinyint', width: 1, default: 0, comment: '是否需首次登录改密：1-是，0-否' })
  mustChangePassword: boolean;

  @Column({ type: 'int', default: 0, comment: '令牌版本，密码变更后递增以吊销旧会话' })
  tokenVersion: number;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}
