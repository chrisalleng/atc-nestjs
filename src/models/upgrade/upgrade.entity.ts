import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';
import { Pilot } from '../pilot/pilot.entity';

@Entity()
export class Upgrade {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  xws: string;

  @ManyToOne(() => Pilot, (pilot) => pilot.upgrades)
  pilot: Pilot;
}