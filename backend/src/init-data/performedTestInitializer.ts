import { AppDataSource } from "../data-source";
import { Patient } from "../entity/Patient";
import { Initializer } from "./initializer";
import { faker } from "@faker-js/faker";
import { Diagnosis } from "../entity/Diagnosis";
import { IsNull } from "typeorm";
import { Medicine } from "../entity/Medicine";
import { Report } from "../entity/Report";
import { Treatment } from "../entity/Treatment";
import { PerformedTest } from "../entity/PerformedTest";
import { GenderTypesPlus, Test } from "../entity/Test";

export default class PerformedTestInitializer extends Initializer {
    repository = AppDataSource.getRepository(PerformedTest);

    constructor(count: number, patients: Patient[], tests: Test[]) {
        super();

        const patient_count = patients.length - 1;
        const test_count = tests.length - 1;

        for(let i = 0; i < count; i++) {
            const patient = patients[faker.datatype.number(patient_count)];
            const test = tests[faker.datatype.number(test_count)];

            if(test.gender.toString() != patient.gender && test.gender != GenderTypesPlus.ALL) {
                i--;
                continue;
            }

            const last = faker.date.past(10);

            const performedTest = this.repository.create({
                patient: patient,
                test: test,
                last: last
            });

            this.entities.push(performedTest);
        }
    }
}