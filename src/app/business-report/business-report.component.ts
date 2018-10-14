import { Component, OnInit, OnDestroy } from '@angular/core';
import { BusinessReportService } from '../services/business-report.service';
import { AppService } from '../services/app.service';
import * as moment from 'moment';
import { Moment } from 'moment';
import { CategoriesService } from '../services/categories.service';
import { Category } from 'app/classes/category';
import { Subscription } from 'rxjs';
import { MaterialsService } from '../services/materials.service';
import { Material } from '../classes/material';

@Component({
  selector: 'app-business-report',
  templateUrl: './business-report.component.html',
  styleUrls: ['./business-report.component.scss']
})
export class BusinessReportComponent implements OnInit, OnDestroy {
  month: Moment;
  categories: Category[];
  materials: Material[];
  subscriptions: Subscription[];
  data: any[] = [];

  constructor(
    private service: BusinessReportService,
    private appService: AppService,
    private categoriesService: CategoriesService,
    private materialsService: MaterialsService
  ) { }

  ngOnInit() {
    this.month = moment().startOf('month');

    this.subscriptions = [
      this.categoriesService.result.subscribe(result => {
        this.categories = result.models.map(model => model.attributes);
        this.materialsService.getMaterials();
      }),
      this.materialsService.materials.subscribe(materials => {
        this.materials = materials;
        this.loadData();
      })
    ];

    this.categoriesService.getCategories();
  }

  loadData() {
    this.service.loadTransactionsData(this.month)
      .then(transactionsData => {
        this.service.loadExpensesData(this.month)
          .then(expensesData => {
            this.data = [];
            for (let i = 1; i <= moment(this.month).endOf('month').date(); i++) {
              let item = {
                day_of_month: i,
                transactionsTotal: 0,
                expensesTotal: 0,
                balance: 0,
                transactionsData: {},
                expensesData: {}
              };
              this.categories.forEach(category => {
                item.transactionsData[category.id] = 0;
              });
              this.materials.forEach(material => {
                item.expensesData[material.id] = 0;
              });
              this.data.push(item);
            }
            transactionsData.forEach(data => {
              const row = this.data[data.day_of_month - 1];
              const value = parseInt(data.nominal);
              row.transactionsData[data.category_id] = value;
              row.transactionsTotal += value;
              row.balance += value;
            });
            expensesData.forEach(data => {
              const row = this.data[data.day_of_month - 1];
              const value = parseInt(data.nominal) || 0;
              row.expensesData[data.material_id] = value;
              row.expensesTotal += value;
              row.balance -= value;
            });
          });
      });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  get previousMonth(): Moment {
    return moment(this.month).subtract(1, 'month');
  }

  get nextMonth(): Moment {
    return moment(this.month).add(1, 'month');
  }

  printToPdf() {
    this.appService.sendToIpc('print-to-pdf', {pageSize: {width: 840994, height: 594106}});
  }

}
