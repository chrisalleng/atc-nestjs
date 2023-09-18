import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';
import { Player } from '../player/player.entity';
import { XWSPilot } from '../xwsPilot/xwsPilot.entity';

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

  @OneToMany(() => XWSPilot, (pilot) => pilot.faction)
  xwsPilots: XWSPilot[];
}