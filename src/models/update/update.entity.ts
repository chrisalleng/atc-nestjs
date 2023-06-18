import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Update {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn( {type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
  created: Date;

  @Column({ default: true })
  isActive: boolean;
}