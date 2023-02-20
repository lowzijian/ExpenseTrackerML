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

export interface Post {
  id: string;
  title: string;
  body: string;
  userId: number;
  tags: Array<string>;
  reactions: number;
}

export interface PostStateInterface {
  posts: Array<Post>;
  error: any;
}
