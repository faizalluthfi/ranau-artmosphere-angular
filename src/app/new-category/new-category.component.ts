import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriesListComponent } from '../categories-list/categories-list.component';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss']
})
export class NewCategoryComponent implements OnInit {
  form: FormGroup;

  constructor(
    formBuilder: FormBuilder,
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
  }

  submit() {
    this.service.createCategory(this.form.value).tap(() => {
      this.categoriesService.getCategories();
      this.router.navigate(['..'], {relativeTo: this.route});
    });
  }

}
