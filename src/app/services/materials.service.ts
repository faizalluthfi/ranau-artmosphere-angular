import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Material } from 'app/classes/material';

@Injectable({
  providedIn: 'root'
})
export class MaterialsService {
  readonly materials: Subject<Material[]> = new Subject<Material[]>();

  constructor() { }

  getMaterials() {
    return new window['Materials']()
      .where('deleted', null)
      .orderBy('name')
      .fetchAll()
      .then(result => {
        const materials = result.toJSON();
        this.materials.next(materials);
        return materials;
      });
  }
}
