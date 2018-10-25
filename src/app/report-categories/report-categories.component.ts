import { Component, OnInit } from '@angular/core';
import { ReportCategory } from '../classes/report-category';
import { ReportCategoriesService } from '../services/report-categories.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report-categories',
  templateUrl: './report-categories.component.html',
  styleUrls: ['./report-categories.component.scss']
})
export class ReportCategoriesComponent implements OnInit {
  reportCategories: ReportCategory[];
  subscriptions: Subscription[] = [];

  constructor(private reportCategoriesService: ReportCategoriesService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.subscriptions = this.subscriptions.concat([
      this.reportCategoriesService.reportCategories.subscribe(reportCategories => {
        this.reportCategories = reportCategories;
      })
    ]);
    this.reportCategoriesService.getReportCategories();
  }

}
