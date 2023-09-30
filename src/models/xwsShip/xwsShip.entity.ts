import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';
import { XWSFaction } from '../xwsFaction/xwsFaction.entity';
import { XWSPilot } from '../xwsPilot/xwsPilot.entity';

@Entity()
export class XWSShip {

  @PrimaryColumn()
  xws: string;

  @Column()
  name: string;

  @Column()
  size: string;

  @Column()
  icon: string;

  @ManyToOne(() => XWSFaction, (faction) => faction.xwsShips)
  faction: XWSFaction;

  @OneToMany(() => XWSPilot, (pilot) => pilot.ship)
  pilots: XWSPilot[];
}