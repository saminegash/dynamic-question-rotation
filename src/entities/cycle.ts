import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Cycle {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    start_date!: Date

    @Column()
    end_date!: Date

    @Column()
    duration_days!: number
}