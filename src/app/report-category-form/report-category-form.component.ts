import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReportCategoryService } from '../services/report-category.service';
import { ReportCategoriesService } from '../services/report-categories.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { ReportCategory } from '../classes/report-category';

@Component({
  selector: 'app-report-category-form',
  templateUrl: './report-category-form.component.html',
  styleUrls: ['./report-category-form.component.scss']
})
export class ReportCategoryFormComponent implements OnInit {
  form: FormGroup;
  reportCategory: ReportCategory;

  constructor(
    formBuilder: FormBuilder,
    private service: ReportCategoryService,
    private reportCategoriesService: ReportCategoriesService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = formBuilder.group({
      name: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.form.reset();
      if (params.id) {
        this.service.getReportCategory(params.id).then(reportCategory => {
          this.reportCategory = reportCategory;
          this.form.patchValue(reportCategory);
          this.form.markAsPristine();
        });
      } else {
        this.reportCategory = new ReportCategory();
      }
    });
  }

  submit() {
    if (this.reportCategory.id) {
      this.service.updateReportCategory(this.reportCategory.id, this.form.value).tap(() => {
        this.notificationService.setNotification('Kategori berhasil disimpan.', 'success');
        this.reportCategoriesService.getReportCategories();
        this.router.navigate(['..'], {relativeTo: this.route});
      });
      return;
    }
    this.service.createReportCategory(this.form.value).tap(() => {
      this.notificationService.setNotification('Kategori berhasil disimpan.', 'success');
      this.reportCategoriesService.getReportCategories();
      this.router.navigate(['..'], {relativeTo: this.route});
    });
  }

}
