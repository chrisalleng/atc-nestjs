import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';
import { Pilot } from '../pilot/pilot.entity';
import { XWSUpgrade } from '../xwsUpgrade/xwsUpgrade.entity';
import { XWSPilot } from '../xwsPilot/xwsPilot.entity';

@Entity()
export class Upgrade {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => XWSUpgrade, (xwsUpgrade) => xwsUpgrade.upgrades)
  xws: XWSUpgrade;

  @ManyToOne(() => Pilot, (pilot) => pilot.upgrades, { onDelete: 'CASCADE' })
  pilot: Pilot;
}