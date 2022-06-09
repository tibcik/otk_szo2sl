import { Diagnosis } from "./diagnosis"
import { ErrorModel } from "./error"
import { PerformedTest } from "./performed-test"

export enum GenderTypes {
    MALE = "male",
    FEMALE = "female"
}

export interface Patient extends ErrorModel {
    id: number
    name: string
    b_date: Date | null
    taj: number
    gender: GenderTypes
    diagnoses: Diagnosis[];
    tests: PerformedTest[];
}