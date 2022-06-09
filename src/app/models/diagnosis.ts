import { ErrorModel } from "./error";
import { Medicine } from "./medicine";
import { Patient } from "./patient";
import { Report } from "./report";
import { Treatment } from "./treatment";

export interface Diagnosis extends ErrorModel {
    id: number
    diagnosis: string;
    date: Date;
    parentDiagnosis: Diagnosis;
    childDiagnosis: Diagnosis;
    patient: Patient;
    medicines: Medicine[];
    treatments: Treatment[];
    reports: Report[];
}
 