import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { CategoriesService } from '../services/categories.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from '../classes/category';

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

  constructor(
    private formBuilder: FormBuilder,
    private service: CategoryService,
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = formBuilder.group({
      name: [null, Validators.required],
      services: formBuilder.array([])
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.service.getCategory(params.id).then(category => {
        this.category_id = category.id;
        this.category = category;
        let services = <FormArray>this.form.controls.services;
        while (services.length > 0) services.removeAt(0);
        this.category.services.forEach(service =>
          services.push(this.formBuilder.group({
              id: [null],
              name: [null, Validators.required],
              deleted: [null]
            }))
        );
        this.form.patchValue(this.category);
        this.form.markAsPristine();
        this.servicesInputs.countServices();
      });
    });
  }

  submit() {
    this.service.updateCategory(this.category.id, this.form.value).tap(() => this.categoriesService.getCategories());
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  delete() {
    if (window.confirm('Apakah anda yakin akan menghapus kategori ini?')) {
      this.service.deleteCategory(this.category.id).tap(() => this.categoriesService.getCategories());
      this.router.navigate(['..'], {relativeTo: this.route});
    }
  }

}
