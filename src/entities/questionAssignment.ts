import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
  JoinColumn,
} from "typeorm";
import { Question } from "./question";
import { Cycle } from "./cycle";
import { Region } from "./region";

@Entity()
@Unique(["cycle", "region"])
export class QuestionAssignment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Question)
  @JoinColumn({ name: "question_id" })
  question!: Question;

  @ManyToOne(() => Cycle)
  @JoinColumn({ name: "cycle_id" }) 
  cycle!: Cycle;

  @ManyToOne(() => Region)
  @JoinColumn({ name: "region_id" })
  region!: Region;
}
