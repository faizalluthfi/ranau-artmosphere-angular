import { Service } from "./service";
import { ReportCategory } from "./report-category";

export class Category {
  id: number;
  name: string;
  deleted: boolean;
  services: Service[] = [];
  report_category: ReportCategory;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
