import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Transaction } from '../classes/transaction';
import * as promise from 'bluebird';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  readonly transaction: Subject<Transaction> = new Subject<Transaction>();

  constructor() { }

  getTransaction(id: number) {
    return window['Transactions'].where('id', id)
      .fetch({withRelated: ['items.service']})
      .then(result => {
        return result.toJSON();
      });
  }

  createTransaction(transaction: Transaction) {
    let values: any = Object.assign({created_at: moment().valueOf()}, transaction);
    delete values.items;
    return new window['Transactions']()
      .save(values)
      .then(savedTransaction => {
        promise.map(transaction.items, item => {
          new window['TransactionItems']().save(
            Object.assign(
              Object.assign({}, item),
              {transaction_id: savedTransaction.id}
            )
          );
        })
        return savedTransaction;
      });
  }

  updateTransaction(id: number, transaction: Transaction): any {
    return promise.map(transaction.items, item => {
      if (item.id) {
        new window['TransactionItems']('id', item.id).save(
          Object.assign(
            Object.assign({}, item),
            {transaction_id: id}
          )
        );
      } else {
        new window['TransactionItems']().save(
          Object.assign(
            Object.assign({}, item),
            {transaction_id: id}
          )
        );
      }
    });;
  }

  deleteTransaction(id: number) {
    return new window['Transactions']('id', id)
      .save({deleted: true});
  }
}
