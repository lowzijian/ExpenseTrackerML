import { useAppDispatch, useAppSelector } from "../redux/store";
import { Expense } from "../interfaces";
import { Disclosure } from "@headlessui/react";
import { getCategoryIcon } from "../helper";
import { DateTime } from "luxon";
import Button from "./Button";
import { deleteExpense } from "../redux/expenseSlice";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
});
const dt = DateTime.now().toFormat("d MMM");

interface ExpenseLogProps {
  log: Expense;
  onEdit: (log: Expense) => void;
}

const ExpenseLog = ({ log, onEdit }: ExpenseLogProps) => {
  const dispatch = useAppDispatch();

  const onRemove = () => {
    dispatch(deleteExpense(log.id));
  };
  const handleEdit = () => {
    onEdit(log);
  };

  return (
    <div className="flex flex-row items-center justify-between gap-4 py-2 px-4">
      <div className="flex flex-row items-center gap-2">
        <p className="mr-2 text-slate-600">{dt}</p>
        <p className="font-medium text-white">
          MYR{currencyFormatter.format(log.amount)}
        </p>
        {log.remark && <p className="text-slate-400">{log.remark}</p>}
      </div>
      <div className="flex flex-row items-center  gap-2">
        <Button onClick={handleEdit} size="small">
          Edit
        </Button>
        <span className="text-gray-500">|</span>
        <Button onClick={onRemove} size="small">
          Remove
        </Button>
      </div>
    </div>
  );
};

const ExpensesLogs = ({
  onEditExpense,
}: {
  onEditExpense: (log: Expense) => void;
}) => {
  const expenseState = useAppSelector((state) => state.expenses);

  const groupExpensesByCategory = expenseState.expenses.reduce(
    (
      acc: {
        [key: string]: Expense[];
      },
      log
    ) => {
      const key = log.category;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(log);
      return acc;
    },
    {}
  );
  const totalExpense = expenseState.expenses.reduce(
    (acc, log) => (acc += log.amount),
    0
  );

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="mb-2 flex flex-col items-start rounded-md border border-gray-500 bg-gray-800 p-4">
        <p className="text-slate-300">
          <span className="mr-2">Your total expenses:</span>
          <strong>MYR{currencyFormatter.format(totalExpense)}</strong>
        </p>
      </div>
      {Object.keys(groupExpensesByCategory).map((category) => {
        const values = groupExpensesByCategory[category];
        const totalAmount = values.reduce((acc, cur) => (acc += cur.amount), 0);
        return (
          <Disclosure key={category}>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex flex-row items-center justify-between gap-4 rounded-lg border border-gray-700 bg-gray-800 p-4 text-white hover:bg-gray-700">
                  <div className="flex flex-row items-center gap-2">
                    <div>{getCategoryIcon(category, "h-6 w-6")}</div>
                    <h5 className="mr-2 text-base font-semibold">{category}</h5>
                    <div className="flex flex-col items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-blue-500 px-2 py-0.5  text-sm font-semibold">
                      {values.length}
                    </div>
                  </div>

                  <p className="text-lg font-medium">
                    MYR{currencyFormatter.format(totalAmount)}
                  </p>
                </Disclosure.Button>
                <Disclosure.Panel className="bg-gray-800/50">
                  {values.map((log) => (
                    <ExpenseLog key={log.id} log={log} onEdit={onEditExpense} />
                  ))}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        );
      })}
    </div>
  );
};

export default ExpensesLogs;
