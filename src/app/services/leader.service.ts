import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Promise <Leader[]> {
    //return Promise.resolve(LEADERS);
    return new Promise(resolve =>{
      setTimeout(() => resolve(LEADERS), 2000);
    });
  }

  getFeatruedLeader(): Promise <Leader> {
    //return Promise.resolve(LEADERS.filter((leader) => leader.featured)[0]);
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(LEADERS.filter((leader) => leader.featured)[0]), 2000);
    });
  }
}
