import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Question } from "./question"

@Entity()
export class Region {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @OneToMany(() => Question, question => question.region)
    questions!: Question[]
}