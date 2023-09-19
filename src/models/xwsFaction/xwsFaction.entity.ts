import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';
import { Player } from '../player/player.entity';
import { XWSPilot } from '../xwsPilot/xwsPilot.entity';
import { XWSShip } from '../xwsShip/xwsShip.entity';

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

  @OneToMany(() => XWSShip, (ship) => ship.faction)
  xwsShips: XWSPilot[];
}