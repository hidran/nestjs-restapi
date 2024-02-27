import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 64, nullable: true })
  name: string;

  @Column({ nullable: true, length: 64 })
  lastName: string;

  @Column({ unique: true, nullable: true })
  fiscalCode: string;

  @Column({ nullable: true, length: 16 })
  phone: string;

  @Column({ nullable: true, length: 2 })
  province: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @UpdateDateColumn()
  updated_at: string;

  @DeleteDateColumn()
  deleted_at: string;

  @CreateDateColumn()
  created_at: string;

  @Column({ length: 64, nullable: true })
  password: string;
}
