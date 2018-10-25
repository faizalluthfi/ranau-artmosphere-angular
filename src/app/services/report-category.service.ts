import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ReportCategory } from '../classes/report-category';

@Injectable({
  providedIn: 'root'
})
export class ReportCategoryService {
  getReportCategory(id: number) {
    return window['ReportCategories'].where('id', id)
      .fetch()
      .then(result => { return result.toJSON() });
  }

  createReportCategory(reportCategory: ReportCategory) {
    return new window['ReportCategories']()
      .save(reportCategory)
      .then(result => { return result.toJSON() });
  }

  updateReportCategory(id: number, reportCategory: ReportCategory): any {
    return new window['ReportCategories']('id', id)
      .save(reportCategory)
      .then(result => { return result.toJSON() });
  }
}
