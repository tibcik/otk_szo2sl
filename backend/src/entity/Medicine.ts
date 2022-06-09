import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, } from "typeorm"
import { Diagnosis } from "./Diagnosis"

@Entity()
export class Medicine {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @ManyToMany(type => Diagnosis, diagnosis => diagnosis.medicines)
    diagnoses: Diagnosis[];
}
