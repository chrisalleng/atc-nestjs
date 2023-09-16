import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Player {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  tournament_id: number;

  @Column()
  score: number;

  @Column()
  swiss_rank: number;

  @Column()
  top_cut_rank: number;

  @Column()
  mov: number;

  @Column({type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  sos: number;

  @Column()
  dropped: boolean;

  @Column({type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  percentile: number;
}