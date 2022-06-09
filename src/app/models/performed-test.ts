import { ErrorModel } from "./error"
import { Patient } from "./patient"
import { Test } from "./test"

export interface PerformedTest {
    id: number
    patient: Patient
    test: Test
    last: Date
}

export interface PerformedTestCount extends ErrorModel {
    count: number
}