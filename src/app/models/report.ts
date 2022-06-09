import { Diagnosis } from "./diagnosis"
import { ErrorModel } from "./error"

export interface Report extends ErrorModel {
    id: number
    name: string
    date: Date
    path: string
    diagnosis: Diagnosis
}
