import { Diagnosis } from "./diagnosis"
import { ErrorModel } from "./error"

export interface Treatment extends ErrorModel {
    id: number
    name: string
    diagnoses: Diagnosis[]
}
