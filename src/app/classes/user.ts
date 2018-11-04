import { Transaction } from "./transaction";

export class User {
  id: number;
  name: string;
  role_id: number;
  deleted: boolean;
  password: String;
  password_confirmation: String;
  transactions: Transaction[] = [];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
