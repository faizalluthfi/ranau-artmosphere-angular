import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  readonly result: Subject<any> = new Subject<any>();

  constructor() { }

  getTransactions() {
    return new window['Transactions']()
      .orderBy('created_at', 'desc')
      .fetchAll()
      .then(result => {
        this.result.next(result);
      });
  }
}
