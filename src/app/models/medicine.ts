import { Diagnosis } from "./diagnosis"
import { ErrorModel } from "./error"

export interface Medicine extends ErrorModel {
    id: number
    name: string
    diagnoses: Diagnosis[]
}
