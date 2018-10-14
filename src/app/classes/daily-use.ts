import { DailyMaterialsUse } from "./daily-materials-use";

export class DailyUse {
  id: number;
  total: number;
  created_at: number;
  materials: DailyMaterialsUse[] = [];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
