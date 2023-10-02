import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, PrimaryColumn, OneToMany } from 'typeorm';
import { Player } from '../player/player.entity';
import { Match } from '../match/match.entity';

@Entity()
export class Tournament {
  @PrimaryColumn()
  id: number;

  @OneToMany(() => Player, (player) => player.tournament, { cascade: true })
  players: Player[];

  @OneToMany(() => Match, (match) => match.tournament, { cascade: true })
  matches: Match[];

  @Column()
  name: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({default: 0})
  format: string;

  @Column({default: 0})
  type: string;

  @Column({default: 0})
  size: number;

  @Column({ type: 'timestamp' })
  created_at: string;

  @Column({ type: 'timestamp' })
  updated_at: string;
}