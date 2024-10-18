import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique } from "typeorm"
import { Question } from "./question"
import { Cycle } from "./cycle"
import { Region } from "./region"

@Entity()
@Unique(["cycle", "region"])
export class QuestionAssignment {
    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(() => Question)
    question!: Question

    @ManyToOne(() => Cycle)
    cycle!: Cycle

    @ManyToOne(() => Region)
    region!: Region
}
