import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ReferenceDataService<T extends { id: number }> {

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private apiUrl: string,
    private modelName: string
  ) { }

  /** GET reference data list from the server */
  getList(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl)
      .pipe(
        tap(_ => this.log(`fetched ${this.modelName} list`)),
        catchError(this.handleError<T[]>(`getList(${this.modelName})`, []))
      );
  }

  /** GET reference data by id. Return `undefined` when id not found */
  getByIdNo404(id: number): Observable<T> {
    const url = `${this.apiUrl}/?id=${id}`;
    return this.http.get<T[]>(url)
      .pipe(
        map(refData => refData[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} ${this.modelName} id=${id}`);
        }),
        catchError(this.handleError<T>(`getByIdNo404(${this.modelName}) id=${id}`))
      );
  }

  /** GET reference data by id. Will 404 if id not found */
  getById(id: number): Observable<T> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<T>(url).pipe(
      tap(_ => this.log(`fetched ${this.modelName} id=${id}`)),
      catchError(this.handleError<T>(`getById(${this.modelName}) id=${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new reference data to the server */
  add(refData: T): Observable<T> {
    return this.http.post<T>(this.apiUrl, refData, httpOptions).pipe(
      tap((newRefData: T) => this.log(`added ${this.modelName} w/ id=${newRefData.id}`)),
      catchError(this.handleError<T>(`add(${this.modelName})`))
    );
  }

  /** DELETE: delete the reference data from the server */
  delete(refData: T | number): Observable<T> {
    const id = typeof refData === 'number' ? refData : refData.id;
    const url = `${this.apiUrl}/${id}`;

    return this.http.delete<T>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted ${this.modelName} id=${id}`)),
      catchError(this.handleError<T>(`delete(${this.modelName})`))
    );
  }

  /** PUT: update the reference data on the server */
  update(refData: T): Observable<T> {
    return this.http.put<T>(this.apiUrl, refData, httpOptions).pipe(
      tap(_ => this.log(`updated ${this.modelName} id=${refData.id}`)),
      catchError(this.handleError<any>(`update(${this.modelName})`))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  protected log(message: string) {
    this.messageService.add(`ReferenceDataService: ${message}`);
  }
}
