import { Entity, PrimaryGeneratedColumn, ManyToOne, UpdateDateColumn, } from "typeorm"
import { Patient } from "./Patient"
import { Test } from "./Test"

@Entity()
export class PerformedTest {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Patient, patient => patient.tests, {
        nullable: false,
        eager: true,
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate:'CASCADE'
    })
    patient: Patient;

    @ManyToOne(type => Test, test => test.patients, {
        nullable: false,
        eager: true,
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate:'CASCADE'
    })
    test: Test;

    @UpdateDateColumn()
    last: Date;
}
