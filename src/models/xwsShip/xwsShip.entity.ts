import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';
import { XWSFaction } from '../xwsFaction/xwsFaction.entity';

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
}