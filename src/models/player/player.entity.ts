import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, PrimaryColumn, OneToMany, ManyToOne } from 'typeorm';
import { Pilot } from '../pilot/pilot.entity';
import { Tournament } from '../tournament/tournament.entity';
import { XWSFaction } from '../xwsFaction/xwsFaction.entity';
import { Match } from '../match/match.entity';

@Entity()
export class Player {
  @PrimaryColumn()
  id: number;

  @OneToMany(() => Pilot, (pilot) => pilot.player, { cascade: true })
  pilots: Pilot[];

  @OneToMany(() => Match, (match) => match.firstPlayer, { cascade: true })
  matches: Player[];

  @OneToMany(() => Match, (match) => match.secondPlayer, { cascade: true })
  matchesOpponent: Player[];

  @ManyToOne(() => Tournament, (tournament) => tournament.players, { onDelete: 'CASCADE' })
  tournament: Tournament;

  @ManyToOne(() => XWSFaction, (xwsFaction) => xwsFaction.players)
  faction: XWSFaction;

  @Column()
  name: string;

  @Column()
  score: number;

  @Column()
  swiss_rank: number;

  @Column()
  top_cut_rank: number;

  @Column()
  mov: number;

  @Column({type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  sos: number;

  @Column()
  dropped: boolean;

  @Column()
  list_json: string;

  @Column({type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  percentile: number;
}