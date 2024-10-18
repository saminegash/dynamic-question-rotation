import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Region } from "./region";

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  content!: string;

  @ManyToOne(() => Region, (region) => region.questions)
  region!: Region;
}
