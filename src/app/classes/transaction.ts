import { TransactionItem } from "./transaction-item";
import { User } from "./user";

export class Transaction {
  id: number;
  total: number;
  discount: number;
  money_nominal: number;
  created_at: number;
  items: TransactionItem[] = [];
  user: User;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
