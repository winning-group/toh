import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import {
  Observable,
  of,
} from 'rxjs';
import {
  catchError,
  tap,
} from 'rxjs/operators';

import { MessageService } from 'core/services/message/message.service';
import { Villain } from 'shared/models';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({ providedIn: 'root' })
export class VillainService {

  private villainsUrl = 'api/villains';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }

  /** GET villains from the server */
  getVillains(): Observable<Villain[]> {
    return this.http.get<Villain[]>(this.villainsUrl)
      .pipe(
        tap(_ => this.log('fetched villains')),
        catchError(this.handleError<Villain[]>('getVillains', [])),
      );
  }

  /** GET villain by id. Will 404 if id not found */
  getVillain(id: number): Observable<Villain> {
    const url = `${this.villainsUrl}/${id}`;
    return this.http.get<Villain>(url).pipe(
      tap(_ => this.log(`fetched villain id=${id}`)),
      catchError(this.handleError<Villain>(`getVillain id=${id}`)),
    );
  }

  //////// Save methods //////////

  /** POST: add a new villain to the server */
  addVillain(villain: Villain): Observable<Villain> {
    return this.http.post<Villain>(this.villainsUrl, villain, httpOptions).pipe(
      tap((newVillain: Villain) => this.log(`added villain w/ id=${newVillain.id}`)),
      catchError(this.handleError<Villain>('addVillain')),
    );
  }

  /** DELETE: delete the villain from the server */
  deleteVillain(villain: Villain | number): Observable<Villain> {
    const id = typeof villain === 'number' ?
      villain :
      villain.id;
    const url = `${this.villainsUrl}/${id}`;

    return this.http.delete<Villain>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted villain id=${id}`)),
      catchError(this.handleError<Villain>('deleteVillain')),
    );
  }

  /** PUT: update the villain on the server */
  updateVillain(villain: Villain): Observable<any> {
    return this.http.put(this.villainsUrl, villain, httpOptions).pipe(
      tap(_ => this.log(`updated villain id=${villain.id}`)),
      catchError(this.handleError<any>('updateVillain')),
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a VillainService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`VillainService: ${message}`);
  }
}
