import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BusinessReportService } from '../services/business-report.service';
import * as moment from 'moment';
import 'moment/locale/id';
import { Moment } from 'moment';
import { MaterialsService } from '../services/materials.service';
import { Material } from '../classes/material';
import { DecimalPipe } from '@angular/common';
import { ReportCategory } from '../classes/report-category';
import { ReportCategoriesService } from '../services/report-categories.service';
import { AppService } from '../services/app.service';

const thinBorder = { style: 'thin', color: { rgb: '000000' } };
const borders = {
  top: thinBorder,
  bottom: thinBorder,
  left: thinBorder,
  right: thinBorder,
  diagonal: thinBorder
};
const headerAlignment = {
  horizontal: 'center',
  vertical: 'middle'
};
const specialStyles = {
  fill: {fgColor: {rgb: 'F5F5F5FF'}}
};
const cellStyles = {
  border: borders
};
const headerStyles = {
  font: {
    bold: true
  },
  alignment: headerAlignment,
  border: borders
};

const headersStyles = {
  normal: headerStyles,
  special: Object.assign( Object.assign({}, headerStyles), specialStyles)
};
const cellsStyles = {
  normal: cellStyles,
  special: Object.assign( Object.assign({}, cellStyles), specialStyles)
};

@Component({
  selector: 'app-business-report',
  templateUrl: './business-report.component.html',
  styleUrls: ['./business-report.component.scss']
})
export class BusinessReportComponent implements OnInit {
  @ViewChild('grid', { read: ElementRef, static: true }) grid: ElementRef;
  @ViewChild('table', { read: ElementRef, static: true }) table: ElementRef;

  month: Moment;
  reportCategories: ReportCategory[] = [];
  materials: Material[] = [];
  data: any[];
  totalRows: any[];

  columnDefs: any[];
  gridApi: any;

  constructor(
    private service: BusinessReportService,
    private reportCategoriesService: ReportCategoriesService,
    private materialsService: MaterialsService,
    private appService: AppService,
    private decimalPipe: DecimalPipe
  ) { }

  ngOnInit() {
    this.month = moment().startOf('month');

    this.reportCategoriesService.getReportCategories().then(reportCategories => {
      this.reportCategories = reportCategories;
      this.materialsService.getMaterials().then(materials => {
        this.materials = materials;
        this.loadData();
      });
    });
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

  async loadData() {
    const transactionsData = await this.service.loadTransactionsData(this.month);
    const expensesData = await this.service.loadExpensesData(this.month);
    const discountData = await this.service.loadDiscountData(this.month);

    this.columnDefs = [];
    this.columnDefs.push({
      headerName: 'Tanggal',
      field: 'day_of_month',
      cellClass: 'special-column',
      pinned: 'left'
    });
    this.reportCategories.forEach(category => {
      this.columnDefs.push({
        headerName: category.name,
        field: `transactions${category.id}`,
        cellClass: 'text-right',
        valueFormatter: data => data.value ? this.decimalPipe.transform(data.value) : ''
      });
    });
    this.columnDefs.push({
      headerName: 'Total',
      field: 'transactionsTotal',
      cellClass: 'text-right special-column',
      valueFormatter: data => data.value ? this.decimalPipe.transform(data.value) : ''
    });
    this.materials.forEach(material => {
      this.columnDefs.push({
        headerName: material.name,
        field: `expenses${material.id}`,
        cellClass: 'text-right',
        valueFormatter: data => data.value ? this.decimalPipe.transform(data.value) : ''
      });
    });
    this.columnDefs.push({
      headerName: 'Diskon',
      field: 'discount',
      cellClass: 'text-right',
      valueFormatter: data => data.value ? this.decimalPipe.transform(data.value) : ''
    });
    this.columnDefs.push({
      headerName: 'Total',
      field: 'expensesTotal',
      cellClass: 'text-right special-column',
      valueFormatter: data => data.value ? this.decimalPipe.transform(data.value) : ''
    });
    this.columnDefs.push({
      headerName: 'Saldo',
      field: 'balance',
      cellClass: 'text-right special-column',
      valueFormatter: data => data.value ? this.decimalPipe.transform(data.value) : ''
    });
    this.data = [];
    let totalRow = {
      day_of_month: 'Total',
      transactionsTotal: 0,
      expensesTotal: 0,
      balance: 0
    };
    for (let i = 1; i <= moment(this.month).endOf('month').date(); i++) {
      let item: any = {day_of_month: i};
      this.reportCategories.forEach(category => item[`transactions${category.id}`] = 0);
      item.transactionsTotal = 0;
      this.materials.forEach(material => item[`expenses${material.id}`] = 0);
      item.expensesTotal = 0;
      item.balance = 0;
      this.data.push(item);
    }
    transactionsData.forEach(data => {
      const row = this.data[data.day_of_month - 1];
      const value = parseInt(data.nominal);
      row[`transactions${data.report_category_id}`] = value ? value : '';
      row.transactionsTotal += value;
      row.balance += value;
    });
    expensesData.forEach(data => {
      const row = this.data[data.day_of_month - 1];
      const value = parseInt(data.nominal) || 0;
      row[`expenses${data.material_id}`] = value ? value : '';
      row.expensesTotal += value;
      row.balance -= value;
    });
    discountData.forEach(data => {
      const row = this.data[data.day_of_month - 1];
      const value = parseInt(data.discount) || 0;
      row[`discount`] = value ? value : '';
      row.expensesTotal += value;
      row.balance -= value;
    });
    this.data.forEach((row, i) => {
      for (let key in row) {
        if (!row[key]) this.data[i][key] = '';

        const value = this.data[i][key] || 0;

        if (key != 'day_of_month') {
          totalRow[key] = totalRow[key] || 0;
          totalRow[key] += value;
        }
      }
    });
    for (let key in totalRow) {
      if (!totalRow[key]) totalRow[key] = '';
    }
    this.totalRows = [totalRow];
    if(this.gridApi) this.gridApi.hideOverlay();
  }

  get previousMonth(): Moment {
    return moment(this.month).subtract(1, 'month');
  }

  get nextMonth(): Moment {
    return moment(this.month).add(1, 'month');
  }

  export() {
    const specification = {};
    this.columnDefs.forEach(def => {
      specification[def.field] = {
        displayName: def.headerName,
        headerStyle: ['day_of_month', 'transactionsTotal', 'expensesTotal', 'balance'].includes(def.field) ? headersStyles.special : headersStyles.normal,
        cellStyle: ['day_of_month', 'transactionsTotal', 'expensesTotal', 'balance'].includes(def.field) ? cellsStyles.special : cellsStyles.normal,
        width: Math.max(def.headerName.length * 8, 64)
      };
    });
    moment.locale('id');
    const monthLabel = moment(this.month).format('MMMM YYYY');
    this.appService.sendToIpc('export-to-excel', JSON.stringify({
      name: monthLabel,
      heading: [
        [
          {
            value: `Laporan Keuangan ArtMosphere ${monthLabel}`,
            style: {
              font: {
                bold: true
              },
              alignment: {
                horizontal: 'center'
              }
            }
          }
        ],
        ['']
      ],
      merges: [
        {start: {row: 1, column: 1}, end: {row: 1, column: this.columnDefs.length}}
      ],
      specification: specification,
      data: [].concat(this.data, this.totalRows)
    }));
  }

}
