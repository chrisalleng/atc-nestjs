import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, PrimaryColumn, ManyToOne } from 'typeorm';
import { Player } from '../player/player.entity';

@Entity()
export class Pilot {

  @PrimaryGeneratedColumn()
  pilot_id: number;

  @Column()
  id: string;

  @ManyToOne(() => Player, (player) => player.pilots)
  player: Player;
  
  @Column()
  ship: string;
}