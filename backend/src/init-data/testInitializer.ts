import { AppDataSource } from "../data-source";
import { Patient } from "../entity/Patient";
import { Initializer } from "./initializer";
import { faker } from "@faker-js/faker";
import { Diagnosis } from "../entity/Diagnosis";
import { IsNull } from "typeorm";
import { Medicine } from "../entity/Medicine";
import { Report } from "../entity/Report";
import { GenderTypesPlus, Test } from "../entity/Test";

export default class TestInitializer extends Initializer {
    repository = AppDataSource.getRepository(Test);

    constructor(count: number) {
        super();

        for(let i = 0; i < count; i++) {
            const name = faker.lorem.sentence();
            const start_age = faker.datatype.number(60);
            const interval = faker.datatype.number(10);
            const genderType = faker.datatype.number(2);
            let gender  = GenderTypesPlus.MALE;
            if(genderType == 1) gender = GenderTypesPlus.FEMALE;
            else if(genderType == 2) gender = GenderTypesPlus.ALL;

            const test = this.repository.create({
                name: name,
                start_age: start_age,
                interval: interval,
                gender: gender
            });

            this.entities.push(test);
        }
    }
}