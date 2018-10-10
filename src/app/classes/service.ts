import { Category } from "./category";

export class Service {
  id: number;
  name: string;
  price: number;
  deleted: boolean;
  category_id: number;
  category: Category;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
