import { Service } from "./service";
import { Transaction } from "./transaction";

export class TransactionItem {
    id: number;
    transaction_id: number;
    service_id: number;

    transaction: Transaction;
    service: Service;
    nominal: number;
    amount: number;

    deleted: boolean;
  
    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
}
