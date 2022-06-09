import "reflect-metadata"
import { DataSource } from "typeorm"
import { Diagnosis } from "./entity/Diagnosis"
import { Medicine } from "./entity/Medicine"
import { Patient } from './entity/Patient'
import { PerformedTest } from "./entity/PerformedTest"
import { Report } from "./entity/Report"
import { Test } from "./entity/Test"
import { Treatment } from "./entity/Treatment"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "otk_szo2sl",
    password: "otk_szo2sl",
    database: "otk_szo2sl",
    synchronize: true,
    logging: false,
    entities: [Diagnosis, Medicine, Patient, PerformedTest, Report, Test, Treatment],
    migrations: [],
    subscribers: [],
})
