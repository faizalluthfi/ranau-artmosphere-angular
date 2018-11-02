import { Transaction } from "./transaction";

export class User {
  id: number;
  name: string;
  role_id: number;
  deleted: boolean;
  transactions: Transaction[] = [];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
