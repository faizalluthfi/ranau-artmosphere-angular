import { Category } from "./category";

export class ReportCategory {
  id: number;
  name: string;
  categories: Category[] = [];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
