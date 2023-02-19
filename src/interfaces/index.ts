export interface ExpenseBase {
  amount: number;
  remark?: string;
  category: string;
}

export interface Expense extends ExpenseBase {
  id: string;
}

export interface ExpenseStateInterface {
  expenses: Array<Expense>;
}
