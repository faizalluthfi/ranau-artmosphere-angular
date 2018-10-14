import { Component, OnInit } from '@angular/core';
import { DailyUsesService } from '../services/daily-uses.service';
import { Transaction } from '../classes/transaction';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-daily-uses-list',
  templateUrl: './daily-uses-list.component.html',
  styleUrls: ['./daily-uses-list.component.scss']
})
export class DailyUsesListComponent implements OnInit {
  month: moment.Moment;
  dailyUses: Transaction[];
  subscriptions: Subscription[] = [];

  constructor(private service: DailyUsesService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.month = moment().startOf('month');

    this.subscriptions = this.subscriptions.concat([
      this.service.result.subscribe(result => {
        this.dailyUses = result.models.map(model => model.attributes);
      })
    ]);
    this.loadData();
  }

  loadData() {
    this.service.getDailyUses(this.month);
  }

  get previousMonth(): moment.Moment {
    return moment(this.month).subtract(1, 'month');
  }

  get nextMonth(): moment.Moment {
    return moment(this.month).add(1, 'month');
  }

}
