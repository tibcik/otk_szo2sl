import { ErrorModel } from "./error";
import { PerformedTest } from "./performed-test";

export enum GenderTypes {
    MALE = "male",
    FEMALE = "female",
    ALL = "all"
}

export interface Test extends ErrorModel {
    id: number
    name: string;
    start_age: number;
    interval: number;
    gender: GenderTypes
    patients: PerformedTest[]
}
