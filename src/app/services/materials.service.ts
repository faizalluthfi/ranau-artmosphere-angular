import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialsService {
  readonly result: Subject<any> = new Subject<any>();

  constructor() { }

  getMaterials() {
    return new window['Materials']()
      .where('deleted', null)
      .orderBy('name')
      .fetchAll()
      .then(result => {
        this.result.next(result);
      });
  }
}
