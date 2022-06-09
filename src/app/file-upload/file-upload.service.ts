import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  upload(file: any, id: number):Observable<any> {
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
}
