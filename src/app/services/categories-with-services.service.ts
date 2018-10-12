import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Category } from 'app/classes/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesWithServicesService {
  readonly categories: Subject<Category[]> = new Subject<Category[]>();

  constructor() { }

  loadCategories() {
    return new window['Categories']()
      .where('deleted', null)
      .orderBy('name')
      .fetchAll({withRelated: ['services']})
      .then(result => {
        this.categories.next(result.toJSON());
      });
  }
}
