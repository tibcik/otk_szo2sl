import { Entity, PrimaryGeneratedColumn, Column, OneToMany, } from "typeorm"
import { GenderTypes } from "./Patient";
import { PerformedTest } from "./PerformedTest";

export enum GenderTypesPlus {
    MALE = "male",
    FEMALE = "female",
    ALL = "all"
}

@Entity()
export class Test {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    start_age: number;

    @Column()
    interval: number;

    @Column({
        type: "enum",
        enum: GenderTypesPlus
    })
    gender: GenderTypesPlus;

    @OneToMany(type => PerformedTest, performed_tests => performed_tests.test)
    patients: PerformedTest[];
}
