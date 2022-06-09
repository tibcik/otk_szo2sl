import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Report } from '../models/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  upload(file: any, id: number): Observable<any> {
    const formData = new FormData();
    formData.append("file", file, file.name);

    return this.http.post("/api/reports/" + id, formData, {
      reportProgress: true,
      observe: 'events',
    })
    .pipe(catchError(this.errorMgmt));
  }

  errorMgmt(error: HttpErrorResponse) {
    return throwError(() => {
      return error;
    });
  }

  download(report: Report): Observable<any> {
      return this.http.get('/api/reports/' + report.id, { responseType: 'blob' });
  }
}
