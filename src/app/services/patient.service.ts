import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, throwError } from 'rxjs';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
    constructor(private http: HttpClient) { }

    async loadPatients() {
        return firstValueFrom(this.http.get<Patient[]>('/api/patients'));
    }

    async loadPatientsByTaj(taj: string) {
        return firstValueFrom(this.http.get<Patient[]>('/api/patients', {
          params: {
            taj: taj
          }
        }));
    }

    async loadPatientById(id: string) {
      return firstValueFrom(this.http.get<Patient>(`/api/patients/${id}`));
    }

    async deletePatient(id: number) {
      return firstValueFrom(this.http.delete<any>(`/api/patients/${id}`));
    }

    async creatPatient(patient: Patient) {
      return firstValueFrom(this.http.post<Patient>(`/api/patients`, patient));
    }
}