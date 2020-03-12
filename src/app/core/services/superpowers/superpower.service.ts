import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Superpower } from 'shared/models/superpower';
import { MessageService } from '../message/message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class SuperpowerService {

  private superpowersUrl = 'api/superpowers';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET superpowers from the server */
  getSuperpowers (): Observable<Superpower[]> {
    return this.http.get<Superpower[]>(this.superpowersUrl)
      .pipe(
        tap(_ => this.log('fetched superpowers')),
        catchError(this.handleError<Superpower[]>('getSuperpowers', []))
      );
  }

  /** GET superpower by id. Return `undefined` when id not found */
  getSuperpowerNo404<Data>(id: number): Observable<Superpower> {
    const url = `${this.superpowersUrl}/?id=${id}`;
    return this.http.get<Superpower[]>(url)
      .pipe(
        map(superpowers => superpowers[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} superpower id=${id}`);
        }),
        catchError(this.handleError<Superpower>(`getSuperpower id=${id}`))
      );
  }

  /** GET superpower by id. Will 404 if id not found */
  getSuperpower(id: number): Observable<Superpower> {
    const url = `${this.superpowersUrl}/${id}`;
    return this.http.get<Superpower>(url).pipe(
      tap(_ => this.log(`fetched superpower id=${id}`)),
      catchError(this.handleError<Superpower>(`getSuperpower id=${id}`))
    );
  }


  //////// Save methods //////////

  /** POST: add a new superpower to the server */
  addSuperpower (superpower: Superpower): Observable<Superpower> {
    return this.http.post<Superpower>(this.superpowersUrl, superpower, httpOptions).pipe(
      tap((newSuperpower: Superpower) => this.log(`added superpower w/ id=${newSuperpower.id}`)),
      catchError(this.handleError<Superpower>('addSuperpower'))
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

  /** Log a SuperpowerService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`SuperpowerService: ${message}`);
  }
}