import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Test } from '../models/test';

@Injectable({
  providedIn: 'root'
})
export class TestService {
    constructor(private http: HttpClient) { }

    async loadTests() {
        return firstValueFrom(this.http.get<Test[]>('/api/tests'));
    }

    async createTest(test: Test) {
        return firstValueFrom(this.http.post<Test>("/api/tests", test));
    }

    async loadTest(id: string) {
        return firstValueFrom(this.http.get<Test>(`/api/tests/${id}`));
    }

    async deleteTest(id: number) {
        return firstValueFrom(this.http.delete<any>(`/api/tests/${id}`));
    }
}