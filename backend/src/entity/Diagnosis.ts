import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany, ManyToMany, JoinTable } from "typeorm"
import { Medicine } from "./Medicine";
import { Patient } from "./Patient"
import { Report } from "./Report";
import { Treatment } from "./Treatment";

@Entity()
export class Diagnosis {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text'})
    diagnosis: string;

    @CreateDateColumn()
    date: Date;

    @ManyToOne(type => Patient, patient => patient.diagnoses, {
        nullable: false,
        eager: true,
        cascade: true
    })
    patient: Patient;

    @ManyToMany(type => Medicine, medicine => medicine.diagnoses, {
        eager: true
    })
    @JoinTable()
    medicines: Medicine[];

    @ManyToMany(type => Treatment, treatment => treatment.diagnoses, {
        eager: true
    })
    @JoinTable()
    treatments: Treatment[];
    
    @OneToMany(type => Report, report => report.diagnosis)
    reports: Report[];
}
