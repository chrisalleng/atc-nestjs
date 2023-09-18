import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';
import { Pilot } from '../pilot/pilot.entity';

@Entity()
export class XWSPilot {

  @PrimaryColumn()
  xws: string;

  @Column()
  name: string;

  //TODO make ship table
  @Column()
  ship: string

  //TODO move to many to one
  @Column()
  faction: string;

  @Column()
  subtitle: string;

  @Column()
  limited: boolean;

  @Column()
  initiative: number;

  @Column()
  cost: number;

  @Column()
  loadout: number;

  @Column()
  artwork: string;

  @Column()
  image: string;

  @Column()
  standard: boolean;

  @Column()
  standardLoadout: boolean;

  @OneToMany(() => Pilot, (pilot) => pilot.xwsPilot)
  pilots: Pilot[];
}