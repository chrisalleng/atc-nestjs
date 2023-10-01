import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';
import { Upgrade } from '../upgrade/upgrade.entity';
@Entity()
export class XWSUpgrade {

  @PrimaryColumn()
  xws: string;

  @Column()
  name: string;

  @Column("text", { array: true })
  slots: string[];

  @Column()
  cost: number;

  @Column()
  image: string;

  @Column()
  artwork: string;

  @Column()
  standard: boolean;

  @OneToMany(() => Upgrade, (upgrade) => upgrade.xws)
  upgrades: Upgrade[];
}