import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Category } from '../classes/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  readonly category: Subject<Category> = new Subject<Category>();

  constructor() { }

  getCategory(id: number) {
    return window['Categories'].where('id', id).fetch();
  }

  createCategory(category: Category) {
    return new window['Categories']()
      .save(category);
  }

  updateCategory(category: Category): any {
    return new window['Categories']('id', category.id)
      .save(category);
  }

  deleteCategory(id: number) {
    return new window['Categories']('id', id)
      .save({deleted: true});
  }
}
