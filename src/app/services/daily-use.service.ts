import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as promise from 'bluebird';
import { DailyUse } from '../classes/daily-use';

@Injectable({
  providedIn: 'root'
})
export class DailyUseService {
  readonly dailyUse: Subject<DailyUse> = new Subject<DailyUse>();

  getDailyUse(id: number) {
    return window['DailyUses'].where('id', id)
      .fetch({withRelated: ['materials.material']})
      .then(result => {
        return result.toJSON();
      });
  }

  createDailyUse(dailyUse: DailyUse) {
    let values: any = Object.assign({}, dailyUse);
    delete values.materials;
    return new window['DailyUses']()
      .save(values)
      .then(savedDailyUse => {
        promise.map(dailyUse.materials, material => {
          new window['DailyMaterialsUses']().save(
            Object.assign(
              Object.assign({}, material),
              {daily_use_id: savedDailyUse.id}
            )
          );
        })
        return savedDailyUse;
      });
  }

  updateDailyUse(id: number, dailyUse: DailyUse): any {
    let values: any = Object.assign({}, dailyUse);
    delete values.materials;
    return new window['DailyUses']('id', id)
      .save(values)
      .then(savedDailyUse => {
        promise.map(dailyUse.materials, material => {
          if (material.id) {
            new window['DailyMaterialsUses']('id', material.id).save(
              Object.assign(
                Object.assign({}, material),
                {daily_use_id: savedDailyUse.id}
              )
            );
          } else {
            new window['DailyMaterialsUses']().save(
              Object.assign(
                Object.assign({}, material),
                {daily_use_id: savedDailyUse.id}
              )
            );
          }
        });
      });
  }
}
