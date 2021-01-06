import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Consulta } from '../models/consulta';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/Consultas/';
  }

  getConsultas(): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(this.myAppUrl + this.myApiUrl)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  // getFilteredConsultas(id: number, dataInicial: Date, dataFinal: Date, nome: String, dataNascimento: Date, observacoes: String): Observable<Consulta[]> {
  //   return this.http.get<Consulta[]>(this.myAppUrl + this.myApiUrl + "GetFilteredConsultas/" + nome + "/" + observacoes + "/" + id + "/" + dataInicial + "/" + dataFinal + "/" + dataNascimento)
  //     .pipe(
  //       retry(1),
  //       catchError(this.errorHandler)
  //     );
  // }

  getFilteredConsultas(consulta): Observable<Consulta[]> {
    return this.http.post<Consulta[]>(this.myAppUrl + this.myApiUrl + "FilteredConsultas", JSON.stringify(consulta), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  getConsulta(id: number): Observable<Consulta> {
    return this.http.get<Consulta>(this.myAppUrl + this.myApiUrl + id)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  saveConsulta(consulta): Observable<Consulta> {
    return this.http.post<Consulta>(this.myAppUrl + this.myApiUrl, JSON.stringify(consulta), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updateConsulta(id: number, consulta): Observable<Consulta> {
    return this.http.put<Consulta>(this.myAppUrl + this.myApiUrl + id, JSON.stringify(consulta), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deleteConsulta(id: number): Observable<Consulta> {
    return this.http.delete<Consulta>(this.myAppUrl + this.myApiUrl + id)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  validateConsulta(consulta): Observable<boolean> {
    return this.http.post<boolean>(this.myAppUrl + this.myApiUrl + "PostValidateConsulta", JSON.stringify(consulta), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
