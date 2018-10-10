import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Category } from '../classes/category';
import * as promise from 'bluebird';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  readonly category: Subject<Category> = new Subject<Category>();

  constructor() { }

  getCategory(id: number) {
    return window['Categories'].where('id', id)
      .fetch({withRelated: ['services']})
      .then(result => {
        return result.toJSON();
      });
  }

  createCategory(category: Category) {
    let values: any = Object.assign({}, category);
    delete values.services;
    return new window['Categories']()
      .save(values)
      .then(savedCategory => {
        promise.map(category.services, service => {
          new window['Services']().save(
            Object.assign(
              Object.assign({}, service),
              {category_id: savedCategory.id}
            )
          );
        })
      });
  }

  updateCategory(id: number, category: Category): any {
    let values: any = Object.assign({}, category);
    delete values.services;
    return new window['Categories']('id', id)
      .save(values)
      .then(savedCategory => {
        promise.map(category.services, service => {
          if (service.id) {
            new window['Services']('id', service.id).save(
              Object.assign(
                Object.assign({}, service),
                {category_id: savedCategory.id}
              )
            );
          } else {
            new window['Services']().save(
              Object.assign(
                Object.assign({}, service),
                {category_id: savedCategory.id}
              )
            );
          }
        });
      });
  }

  deleteCategory(id: number) {
    return new window['Categories']('id', id)
      .save({deleted: true});
  }
}
