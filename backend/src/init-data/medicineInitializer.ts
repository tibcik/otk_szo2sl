import { AppDataSource } from "../data-source";
import { GenderTypes, Patient } from "../entity/Patient";
import { Initializer } from "./initializer";
import { faker } from "@faker-js/faker";
import { Diagnosis } from "../entity/Diagnosis";
import { IsNull } from "typeorm";
import { Medicine } from "../entity/Medicine";

export default class MedicineInitializer extends Initializer {
    repository = AppDataSource.getRepository(Medicine)

    constructor(count: number) {
        super();

        for(let i = 0; i < count; i++) {
            const name = faker.unique(faker.commerce.productName);

            const medicine = this.repository.create({
                name: name,
                diagnoses: []
            });

            this.entities.push(medicine);
        }
    }

    async initRelationship(count: number, diagnoses: Diagnosis[]) {
        if(!this.initialized)
            return;

        const linked: string[] = [];
        
        for(let i = 0; i < count; i++) {
            const medicine = faker.helpers.arrayElement(this.entities as []);
            const diagnosis_list = faker.helpers.arrayElements(diagnoses as [], faker.datatype.number(5));

            for(let index in diagnosis_list) {
                const diagnosis = diagnosis_list[index] as Diagnosis;
                const id = diagnosis.id + "_" + (medicine as Medicine).id;
                if(linked.indexOf(id) !== -1)
                    continue;

                linked.push(id);

                await AppDataSource.getRepository(Diagnosis).createQueryBuilder()
                    .limit(1)
                    .relation(Diagnosis, "medicines")
                    .of(diagnosis)
                    .add(medicine);
            }
        }
    }
}