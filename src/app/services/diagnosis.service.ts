import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Diagnosis } from '../models/diagnosis';

@Injectable({
  providedIn: 'root'
})
export class DiagnosisService {
    constructor(
      private http: HttpClient
      ) { }

    async loadDiagnoses(patient: number) {
      return firstValueFrom(this.http.get<Diagnosis[]>('/api/diagnoses', {
        params: {
            patientId: patient
        }
      }));
    }

    async addDiagnosis(diagnosis: Diagnosis) {
      return firstValueFrom(this.http.post<Diagnosis>('/api/diagnoses', diagnosis));
    }
}