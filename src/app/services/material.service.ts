import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Material } from '../classes/material';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  readonly material: Subject<Material> = new Subject<Material>();

  getMaterial(id: number) {
    return window['Materials'].where('id', id)
      .fetch()
      .then(result => { return result.toJSON() });
  }

  createMaterial(material: Material) {
    return new window['Materials']()
      .save(material)
      .then(result => { return result.toJSON() });
  }

  updateMaterial(id: number, material: Material): any {
    return new window['Materials']('id', id)
      .save(material)
      .then(result => { return result.toJSON() });
  }

  deleteMaterial(id: number) {
    return new window['Materials']('id', id)
      .save({deleted: true});
  }
}
