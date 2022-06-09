import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Medicine } from '../models/medicine';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
    constructor(private http: HttpClient) { }

    async loadMedicines() {
      return firstValueFrom(this.http.get<Medicine[]>('/api/medicines'));
  }
}