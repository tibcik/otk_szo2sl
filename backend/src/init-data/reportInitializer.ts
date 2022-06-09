import { AppDataSource } from "../data-source";
import { GenderTypes, Patient } from "../entity/Patient";
import { Initializer } from "./initializer";
import { faker } from "@faker-js/faker";
import { Diagnosis } from "../entity/Diagnosis";
import { IsNull } from "typeorm";
import { Medicine } from "../entity/Medicine";
import { Report } from "../entity/Report";

export default class ReportInitializer extends Initializer {
    repository = AppDataSource.getRepository(Report)

    constructor(count: number, diagnoses: Diagnosis[]) {
        super();

        const diagnosis_count = diagnoses.length - 1;

        for(let i = 0; i < count; i++) {
            let diagnosis = diagnoses[faker.datatype.number(diagnosis_count)];

            const name = faker.unique(faker.lorem.word);
            const date = faker.date.past(10);
            const path = `example.jpg`;

            const report = this.repository.create({
                name: name,
                date: date,
                path: path,
                diagnosis: diagnosis
            });

            this.entities.push(report);
        }
    }
}