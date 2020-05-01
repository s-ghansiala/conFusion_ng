import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Observable <Leader[]> {
    //return Promise.resolve(LEADERS);
    return of(LEADERS).pipe(delay(2000));
  }

  getFeatruedLeader(): Observable <Leader> {
    //return Promise.resolve(LEADERS.filter((leader) => leader.featured)[0]);
    return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));
  }
}
