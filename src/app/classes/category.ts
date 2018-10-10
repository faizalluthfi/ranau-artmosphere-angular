import { Service } from "./service";

export class Category {
  id: number;
  name: string;
  deleted: boolean;
  services: Service[] = [];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
