import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Treatment } from '../models/treatment';

@Injectable({
  providedIn: 'root'
})
export class TreatmentsService {
    constructor(private http: HttpClient) { }

    async loadTreatments() {
      return firstValueFrom(this.http.get<Treatment[]>('/api/treatments'));
  }
}