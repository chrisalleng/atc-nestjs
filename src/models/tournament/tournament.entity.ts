import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, PrimaryColumn, OneToMany } from 'typeorm';
import { Player } from '../player/player.entity';

@Entity()
export class Tournament {
  @PrimaryColumn()
  id: number;

  @OneToMany(() => Player, (player) => player.tournament, { cascade: true })
  players: Player[];

  @Column()
  name: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({default: 0})
  format: number;

  @Column({default: 0})
  type: number;

  @Column({ type: 'timestamp' })
  created_at: string;

  @Column({ type: 'timestamp' })
  updated_at: string;
}