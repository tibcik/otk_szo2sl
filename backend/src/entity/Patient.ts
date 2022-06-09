import { Entity, PrimaryGeneratedColumn, Column, OneToMany, } from "typeorm"
import { Diagnosis } from "./Diagnosis"
import { PerformedTest } from "./PerformedTest"

export enum GenderTypes {
    MALE = "male",
    FEMALE = "female"
}

@Entity()
export class Patient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: "date" })
    b_date: Date;

    @Column({ type: "int", width: 9, unique: true, nullable: true})
    taj: number;
    /*
    9 számjegyű
    a 9. számjegy: ((1. + 3. + 5. + 7.) * 3 + (2. + 4. + 6.) * 7) % 10
    A TAJ szám elsõ nyolc számjegyébõl a páratlan helyen állókat hárommal, a páros helyen állókat héttel szorozzuk, 
    és a szorzatokat összeadjuk. Az összeget tízzel elosztva a maradékot tekintjük a kilencedik, azaz CDV kódnak.
    */

    @Column({
        type: "enum",
        enum: GenderTypes
    })
    gender: GenderTypes;

    @OneToMany(type => Diagnosis, diagnosis => diagnosis.patient)
    diagnoses: Diagnosis[];

    @OneToMany(type => PerformedTest, performed_tests => performed_tests.patient)
    tests: PerformedTest[];
}