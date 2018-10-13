import { DailyUse } from "./daily-use";
import { Material } from "./material";

export class DailyMaterialsUse {
    id: number;
    daily_use_id: number;
    nominal: number;
    daily_use: DailyUse;
    material_id: number;
    material: Material;
  
    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
}
