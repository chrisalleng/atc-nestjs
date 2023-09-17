import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';
import { Player } from '../player/player.entity';

@Entity()
export class XWSFaction {

  @PrimaryColumn()
  xws: string;

  @Column()
  name: string;

  @Column()
  icon: string;

  @OneToMany(() => Player, (player) => player.faction)
  players: Player[];
}