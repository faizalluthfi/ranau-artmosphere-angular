import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Category } from '../classes/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  readonly result: Subject<any> = new Subject<any>();

  constructor() { }

  getCategories() {
    return new window['Categories']()
      .orderBy('name')
      .fetchAll()
      .then(result => {
        this.result.next(result);
      });
  }
}
