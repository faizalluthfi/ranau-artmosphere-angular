import { Component, OnInit } from '@angular/core';
import { Transaction } from '../classes/transaction';
import { Subscription } from 'rxjs';
import { TransactionsService } from '../services/transactions.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent implements OnInit {
  month: moment.Moment;
  transactions: Transaction[];
  subscriptions: Subscription[] = [];

  constructor(private transactionsService: TransactionsService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.month = moment().startOf('month');

    this.subscriptions = this.subscriptions.concat([
      this.transactionsService.result.subscribe(result => {
        this.transactions = result.models.map(model => model.attributes);
      })
    ]);
    this.loadData();
  }

  loadData() {
    this.transactionsService.getTransactions(this.month);
  }

  get previousMonth(): moment.Moment {
    return moment(this.month).subtract(1, 'month');
  }

  get nextMonth(): moment.Moment {
    return moment(this.month).add(1, 'month');
  }

}
