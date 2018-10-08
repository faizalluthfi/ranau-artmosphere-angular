import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  category: Category;
  form: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private service: CategoryService,
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = formBuilder.group({
      name: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.service.getCategory(params.id).then(result => this.category = result.attributes);
    });
  }

  submit() {
    this.service.updateCategory(this.category).tap(() => this.categoriesService.getCategories());
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  delete() {
    this.service.deleteCategory(this.category.id).tap(() => this.categoriesService.getCategories());
    this.router.navigate(['..'], {relativeTo: this.route});
  }

}
