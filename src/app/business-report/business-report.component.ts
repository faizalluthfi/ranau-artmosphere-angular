import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { BusinessReportService } from '../services/business-report.service';
import { AppService } from '../services/app.service';
import * as moment from 'moment';
import { Moment } from 'moment';
import { CategoriesService } from '../services/categories.service';
import { Category } from 'app/classes/category';
import { Subscription } from 'rxjs';
import { MaterialsService } from '../services/materials.service';
import { Material } from '../classes/material';
import * as XLSX from 'xlsx';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-business-report',
  templateUrl: './business-report.component.html',
  styleUrls: ['./business-report.component.scss']
})
export class BusinessReportComponent implements OnInit, OnDestroy {
  @ViewChild('grid', { read: ElementRef }) grid: ElementRef;
  @ViewChild('table', {read: ElementRef}) table: ElementRef;

  month: Moment;
  categories: Category[] = [];
  materials: Material[] = [];
  subscriptions: Subscription[];
  data: any[];

  columnDefs: any[];
  gridApi: any;

  constructor(
    private service: BusinessReportService,
    private categoriesService: CategoriesService,
    private materialsService: MaterialsService,
    private decimalPipe: DecimalPipe
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

  gridModelUpdated(params) {
    this.gridApi = params.api;
    let columnApi = params.columnApi;
    const allColumnIds = [];
    const columns = columnApi.getAllColumns() || []
    columns.forEach(function (column) {
      allColumnIds.push(column.colId);
    });
    columnApi.autoSizeColumns(allColumnIds);
  }

  setMonth(month: Moment) {
    this.gridApi.showLoadingOverlay();
    this.month = month;
    this.loadData();
  }

  loadData() {
    this.service.loadTransactionsData(this.month)
      .then(transactionsData => {
        this.service.loadExpensesData(this.month)
          .then(expensesData => {
            this.columnDefs = [];
            this.columnDefs.push({
              headerName: 'Tanggal',
              field: 'day_of_month'
            });
            this.categories.forEach(category => {
              this.columnDefs.push({
                headerName: category.name,
                field: `transactionsData`,
                cellClass: 'text-right',
                valueFormatter: data => data.value[category.id] > 0 ? this.decimalPipe.transform(data.value[category.id]) : ''
              });
            });
            this.columnDefs.push({
              headerName: 'Total',
              field: 'transactionsTotal',
              cellClass: 'text-right',
              valueFormatter: data => data.value > 0 ? this.decimalPipe.transform(data.value) : ''
            });
            this.materials.forEach(material => {
              this.columnDefs.push({
                headerName: material.name,
                field: `expensesData`,
                cellClass: 'text-right',
                valueFormatter: data => data.value[material.id] > 0 ? this.decimalPipe.transform(data.value[material.id]) : ''
              });
            });
            this.columnDefs.push({
              headerName: 'Total',
              field: 'expensesTotal',
              cellClass: 'text-right',
              valueFormatter: data => data.value > 0 ? this.decimalPipe.transform(data.value) : ''
            });
            this.columnDefs.push({
              headerName: 'Saldo',
              field: 'balance',
              cellClass: 'text-right',
              valueFormatter: data => data.value > 0 ? this.decimalPipe.transform(data.value) : ''
            });
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
            this.gridApi.hideOverlay();
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

  export() {
    let sheetName = 'Export';
    let wb = XLSX.utils.table_to_book(this.table.nativeElement, <any>{raw: true, sheet: sheetName});
    XLSX.writeFile(wb, 'export.xlsx');
  }

}
