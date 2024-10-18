import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Region } from "./region";

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  content!: string;

  @ManyToOne(() => Region, (region) => region.questions)
  @JoinColumn({ name: "region_id" }) 
  region!: Region;
}
