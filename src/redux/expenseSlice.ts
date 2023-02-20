import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Expense, ExpenseBase, ExpenseStateInterface } from "../interfaces";

const initialState: ExpenseStateInterface = {
  expenses: [],
};

export const ExpenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    addExpense: (
      state: ExpenseStateInterface,
      action: PayloadAction<ExpenseBase>
    ) => {
      const id = new Date().toISOString();
      state.expenses = [...state.expenses, { id, ...action.payload }];
    },
    deleteExpense: (
      state: ExpenseStateInterface,
      action: PayloadAction<string>
    ) => {
      const id = action.payload;
      state.expenses = [...state.expenses].filter((val) => val.id !== id);
    },
    updateExpense: (
      state: ExpenseStateInterface,
      action: PayloadAction<Expense>
    ) => {
      const { id: updatedExpenseId } = action.payload;
      const updatedExpenses = [...state.expenses];
      const objIndex = updatedExpenses.findIndex(
        (obj) => obj.id === updatedExpenseId
      );
      updatedExpenses[objIndex] = action.payload;
      state.expenses = updatedExpenses;
    },
  },
});

export default ExpenseSlice.reducer;
export const { addExpense, deleteExpense, updateExpense } =
  ExpenseSlice.actions;
