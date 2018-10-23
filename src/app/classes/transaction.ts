import { TransactionItem } from "./transaction-item";

export class Transaction {
  id: number;
  total: number;
  discount: number;
  money_nominal: number;
  created_at: number;
  items: TransactionItem[] = [];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
