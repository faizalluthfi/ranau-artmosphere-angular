import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { CategoriesService } from '../services/categories.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from '../classes/category';
import { NotificationService } from '../services/notification.service';
import { ReportCategoriesService } from '../services/report-categories.service';
import { ReportCategory } from '../classes/report-category';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  @ViewChild('servicesInputs') servicesInputs;
  category: Category;
  form: FormGroup;
  category_id: number;
  reportCategories: ReportCategory[];

  constructor(
    private formBuilder: FormBuilder,
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
    this.servicesInputs.loading = true;
    
    this.reportCategoriesService.getReportCategories().then(reportCategories => {
      this.reportCategories = reportCategories;

      this.route.params.subscribe(params => {
        this.servicesInputs.loading = true;
        this.service.getCategory(params.id).then(category => {
          this.category_id = category.id;
          this.category = category;
          let services = <FormArray>this.form.controls.services;
          while (services.length > 0) services.removeAt(0);
          this.category.services.forEach(service =>
            services.push(this.formBuilder.group({
                id: [null],
                name: [null, Validators.required],
                price: [null, Validators.required],
                note: [null],
                deleted: [null]
              }))
          );
          this.form.patchValue(this.category);
          this.form.markAsPristine();
          this.servicesInputs.countServices();
          this.servicesInputs.loading = false;
        });
      });
    });
  }

  submit() {
    this.service.updateCategory(this.category.id, this.form.value).tap(() => {
      this.notificationService.setNotification('Kategori berhasil disimpan.', 'success');
      this.categoriesService.getCategories();
      this.router.navigate(['..'], {relativeTo: this.route});
    });
  }

  delete() {
    if (window.confirm('Apakah anda yakin akan menghapus kategori ini?')) {
      this.service.deleteCategory(this.category.id).tap(() => {
        this.notificationService.setNotification('Kategori berhasil dihapus.', 'success');
        this.categoriesService.getCategories();
        this.router.navigate(['..'], {relativeTo: this.route});
      });
    }
  }

}
