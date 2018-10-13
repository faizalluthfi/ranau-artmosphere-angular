import { DailyUse } from "./daily-use";

export class DailyMaterialsUse {
    id: number;
    daily_use_id: number;
    nominal: number;
    daily_use: DailyUse;
  
    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
}
