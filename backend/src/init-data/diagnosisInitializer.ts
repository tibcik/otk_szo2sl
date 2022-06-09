import { AppDataSource } from "../data-source";
import { GenderTypes, Patient } from "../entity/Patient";
import { Initializer } from "./initializer";
import { faker } from "@faker-js/faker";
import { Diagnosis } from "../entity/Diagnosis";
import { IsNull } from "typeorm";

export default class DiagnosisInitializer extends Initializer {
    repository = AppDataSource.getRepository(Diagnosis)

    constructor(count: number, patients: Patient[]) {
        super();

        const patients_count = patients.length - 1;

        faker.locale = 'hu';

        for(let i = 0; i < count; i++) {
            const patient = patients[faker.datatype.number(patients_count)];
        
            const diagnosis_text = faker.lorem.paragraphs(2);

            const diagnosis = this.repository.create({
                diagnosis: diagnosis_text,
                patient: patient
            })

            this.entities.push(diagnosis);
        }
    }
}