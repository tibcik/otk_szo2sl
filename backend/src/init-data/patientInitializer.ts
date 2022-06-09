import { AppDataSource } from "../data-source";
import { GenderTypes, Patient } from "../entity/Patient";
import { Initializer } from "./initializer";
import { faker } from "@faker-js/faker";

function generateTAJ(base: number) {
    let sum = 0;
    let taj = base;
    for(let i = 7; i >= 0; i--) {
        let num = taj % 10;
        taj = (taj / 10) | 0;

        if(i % 2) sum += num * 7;
        else sum += num * 3;
    }
    const checksum = sum % 10;

    return base * 10 + checksum;
}

export default class PatientInitializer extends Initializer {
    repository = AppDataSource.getRepository(Patient);
    taj_base = 0;

    constructor(count: number) {
        super();

        this.taj_base = faker.datatype.number(9999999);

        faker.locale = 'hu';

        for(let i = 0; i < count; i++) {
            if(this.taj_base === 10000000)
                this.taj_base = 0;

            let gender = GenderTypes.MALE;
            if(faker.datatype.boolean()) gender = GenderTypes.FEMALE;

            const first_name = faker.name.firstName(gender);
            const last_name = faker.name.lastName(gender);
            const name = `${last_name} ${first_name}`;
            const b_data = faker.date.past(100);
            
            const taj = generateTAJ(this.taj_base++);

            const patient = this.repository.create({
                name: name,
                b_date: b_data,
                taj: taj,
                gender: gender
            });

            this.entities.push(patient);
        }
    }
}