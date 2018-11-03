import { Transaction } from "./transaction";

export class User {
  id: number;
  name: string;
  role_id: number;
  deleted: boolean;
  password: String;
  transactions: Transaction[] = [];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
