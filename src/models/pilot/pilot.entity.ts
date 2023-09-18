import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';
import { Player } from '../player/player.entity';
import { Upgrade } from '../upgrade/upgrade.entity';
import { XWSPilot } from '../xwsPilot/xwsPilot.entity';

@Entity()
export class Pilot {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  xws: string;

  @ManyToOne(() => Player, (player) => player.pilots, { onDelete: 'CASCADE' })
  player: Player;

  @ManyToOne(() => XWSPilot, (xwsPilot) => xwsPilot.pilots,)
  xwsPilot: XWSPilot;

  @OneToMany(() => Upgrade, (upgrade) => upgrade.pilot, { cascade: true })
  upgrades: Upgrade[];
  
  @Column()
  ship: string;
}