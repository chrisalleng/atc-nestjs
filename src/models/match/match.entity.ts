import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, PrimaryColumn, OneToMany, ManyToOne } from 'typeorm';
import { Player } from '../player/player.entity';
import { Tournament } from '../tournament/tournament.entity';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Player, (player) => player.matches)
  firstPlayer: Player;

  @ManyToOne(() => Player, (player) => player.matchesOpponent)
  secondPlayer: Player;

  @ManyToOne(() => Tournament, (tournament) => tournament.matches)
  tournament: Tournament;

  @Column()
  firstPlayerScore: number;

  @Column()
  secondPlayerScore: number;

  @Column()
  result: string;

  @Column()
  scenario: string;

  @Column()
  type: string;
}