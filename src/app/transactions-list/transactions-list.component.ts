import { Component, OnInit } from '@angular/core';
import { Transaction } from '../classes/transaction';
import { Subscription } from 'rxjs';
import { TransactionsService } from '../services/transactions.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent implements OnInit {
  transactions: Transaction[];
  subscriptions: Subscription[] = [];

  constructor(private transactionsService: TransactionsService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.subscriptions = this.subscriptions.concat([
      this.transactionsService.result.subscribe(result => {
        this.transactions = result.models.map(model => model.attributes);
      })
    ]);
    this.transactionsService.getTransactions();
  }

}
