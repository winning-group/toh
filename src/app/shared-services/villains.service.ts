import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Villain } from '../models/villains';
import { MessageService } from '../message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class VillainsService {

  private VillainsUrl = 'api/villains';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET Villains from the server */
  getVillains (): Observable<Villain[]> {
    return this.http.get<Villain[]>(this.VillainsUrl)
      .pipe(
        tap(_ => this.log('fetched Villains')),
        catchError(this.handleError<Villain[]>('getVillains', []))
      );
  }

  /** GET Villain by id. Will 404 if id not found */
  getVillain(id: number): Observable<Villain> {
    const url = `${this.VillainsUrl}/${id}`;
    return this.http.get<Villain>(url).pipe(
      tap(_ => this.log(`fetched Villain id=${id}`)),
      catchError(this.handleError<Villain>(`getVillain id=${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Villain to the server */
  addVillain (Villain: Villain): Observable<Villain> {
    return this.http.post<Villain>(this.VillainsUrl, Villain, httpOptions).pipe(
      tap((newVillain: Villain) => this.log(`added Villain w/ id=${newVillain.id}`)),
      catchError(this.handleError<Villain>('addVillain'))
    );
  }

  /** DELETE: delete the Villain from the server */
  deleteVillain (Villain: Villain | number): Observable<Villain> {
    const id = typeof Villain === 'number' ? Villain : Villain.id;
    const url = `${this.VillainsUrl}/${id}`;

    return this.http.delete<Villain>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Villain id=${id}`)),
      catchError(this.handleError<Villain>('deleteVillain'))
    );
  }

  /** PUT: update the Villain on the server */
  updateVillain (Villain: Villain): Observable<any> {
    return this.http.put(this.VillainsUrl, Villain, httpOptions).pipe(
      tap(_ => this.log(`updated Villain id=${Villain.id}`)),
      catchError(this.handleError<any>('updateVillain'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
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
