import { Component, OnInit } from '@angular/core';
import { DailyUsesService } from '../services/daily-uses.service';
import { Transaction } from '../classes/transaction';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-daily-uses-list',
  templateUrl: './daily-uses-list.component.html',
  styleUrls: ['./daily-uses-list.component.scss']
})
export class DailyUsesListComponent implements OnInit {
  dailyUses: Transaction[];
  subscriptions: Subscription[] = [];

  constructor(private service: DailyUsesService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.subscriptions = this.subscriptions.concat([
      this.service.result.subscribe(result => {
        this.dailyUses = result.models.map(model => model.attributes);
      })
    ]);
    this.service.getDailyUses();
  }

}
