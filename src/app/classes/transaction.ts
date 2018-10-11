import { TransactionItem } from "./transaction-item";

export class Transaction {
  id: number;
  created_at: number;
  items: TransactionItem[] = [];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
