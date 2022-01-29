import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Event } from '../model/event';
import { eventsUrl } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class EventService {

  eUrl = eventsUrl

  constructor(
    private http: HttpClient) {
  }

  getAll(): Observable<Event[]> {
    return this.http.get<Event[]>(this.eUrl);
  }

  get(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.eUrl}/${id}`);
  }

  update(event: Event): Observable<Event> {
    return this.http.patch<Event>(
      `${this.eUrl}/${event.id}`,event,)
  }

  create(event: Event): Observable<Event> {
    console.log(`Adding id: ${event.id}`)
    return this.http.post<Event>(this.eUrl, event).pipe(catchError(this.handleError('create error')))
  }

  remove(event: Event | number): Observable<Event> {
    const id = typeof event === 'number' ? event : event.id
    const url = `${this.eUrl}/${id}`
    console.log(`Removing url: ${url}`)
    return this.http.delete<Event>(url).pipe(catchError(this.handleError('remove error')))
  }

  private handleError(operation: string) {
    console.log(operation)
    return (error: HttpErrorResponse): Observable<Event> => {
    console.log(JSON.stringify(HttpErrorResponse))
    return of(new Event())
  }
}

}
