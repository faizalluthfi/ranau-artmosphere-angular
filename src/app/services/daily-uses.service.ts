import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DailyUsesService {
  readonly result: Subject<any> = new Subject<any>();
  month: moment.Moment;

  constructor() { }

  getDailyUses(month: moment.Moment = null) {
    if (month) this.month = month;
    return new window['DailyUses']()
      .query(qb => qb.whereBetween('created_at', [this.month.valueOf(), moment(this.month).endOf('month').valueOf()]))
      .orderBy('created_at', 'desc')
      .fetchAll()
      .then(result => {
        this.result.next(result);
      });
  }
}
