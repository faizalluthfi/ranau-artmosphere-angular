import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
import { NotificationService } from '../../services/notification.service';
import { ReportCategoriesService } from '../../services/report-categories.service';
import { ReportCategory } from '../../classes/report-category';
import { AppService } from 'app/services/app.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss']
})
export class NewCategoryComponent implements OnInit {
  form: FormGroup;
  reportCategories: ReportCategory[];

  constructor(
    formBuilder: FormBuilder,
    private appService: AppService,
    private service: CategoryService,
    private categoriesService: CategoriesService,
    private reportCategoriesService: ReportCategoriesService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = formBuilder.group({
      name: [null, Validators.required],
      report_category_id: [null, Validators.required],
      services: formBuilder.array([])
    });
  }

  ngOnInit() {
    this.reportCategoriesService.getReportCategories().then(reportCategories => {
      this.reportCategories = reportCategories;
      if (reportCategories.length > 0) {
        this.form.controls.report_category_id.setValue(reportCategories[0].id);
      }
    });
  }

  submit() {
    this.service.createCategory(this.form.value).tap(() => {
      this.appService.sendToIpc('backup');
      this.notificationService.setNotification('Kategori berhasil disimpan.', 'success');
      this.categoriesService.getCategories();
      this.router.navigate(['..'], {relativeTo: this.route});
    });
  }

}
