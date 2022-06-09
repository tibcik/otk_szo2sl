import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Patient } from '../models/patient';
import { PerformedTestCount } from '../models/performed-test';
import { Test } from '../models/test';

@Injectable({
  providedIn: 'root'
})
export class PerformedTesttService {
    constructor(private http: HttpClient) { }

    async loadNeededTestByPatient(patient: number) {
        return firstValueFrom(this.http.get<Test[]>('/api/performed_tests/needed', {
            params: {
                patientId: patient
            }
        }));
    }

    async loadNeededTestCount(patient: number) {
        return firstValueFrom(this.http.get<PerformedTestCount>('/api/performed_tests/needed_count', {
            params: {
                patientId: patient
            }
        }));
    }

    async loadNeededTestByTest(testId: number) {
        return firstValueFrom(this.http.get<Patient[]>('/api/performed_tests/needed', {
            params: {
                testId: testId
            }
        }));
    }
}