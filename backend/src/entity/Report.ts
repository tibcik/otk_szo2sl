import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, } from "typeorm"
import { Diagnosis } from "./Diagnosis"

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'datetime' })
    date: Date;

    @Column({
        default: null
    })
    path: string;

    @ManyToOne(type => Diagnosis, diagnosis => diagnosis.reports, {
        nullable: false,
        eager: true,
        cascade: true
    })
    diagnosis: Diagnosis;
}
