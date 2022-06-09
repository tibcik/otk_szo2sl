import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, } from "typeorm"
import { Diagnosis } from "./Diagnosis"

@Entity()
export class Treatment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(type => Diagnosis, diagnosis => diagnosis.treatments)
    diagnoses: Diagnosis[];
}
