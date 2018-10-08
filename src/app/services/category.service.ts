import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Category } from '../classes/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  readonly category: Subject<Category> = new Subject<Category>();

  constructor() { }

  createCategory(category: Category) {
    return new window['Categories']()
      .save(category);
  }
}
