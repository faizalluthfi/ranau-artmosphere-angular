import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Subscription } from 'rxjs';
import { Category } from '../classes/category';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
  categories: Category[];
  subscriptions: Subscription[] = [];

  constructor(private categoriesService: CategoriesService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.subscriptions = this.subscriptions.concat([
      this.categoriesService.result.subscribe(result => {
        console.log(result);
        this.categories = result.models.map(model => model.attributes);
      })
    ]);
    this.categoriesService.getCategories();
  }

}
