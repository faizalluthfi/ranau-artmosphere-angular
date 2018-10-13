import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DailyUsesService {
  readonly result: Subject<any> = new Subject<any>();

  constructor() { }

  getDailyUses() {
    return new window['DailyUses']()
      .orderBy('created_at')
      .fetchAll()
      .then(result => {
        this.result.next(result);
      });
  }
}
