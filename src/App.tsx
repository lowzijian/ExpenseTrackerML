import { useState } from "react";
import { Button, ExpenseDialog, ExpensesLogs, Quotes } from "./components";
import { Expense } from "./interfaces";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [editedExpense, setEditedExpense] = useState<Expense | null>(null);

  const handleAddExpense = () => {
    setEditedExpense(null);
    setIsOpen(true);
  };

  const handleEditExpense = (log: Expense) => {
    setEditedExpense(log);
    setIsOpen(true);
  };

  return (
    <main className="h-full min-h-screen w-full bg-[#111827]">
      <div className="container mx-auto flex flex-col">
        <section className="flex flex-col items-center justify-center py-4 px-6 text-center">
          <div className="mb-2 flex flex-row items-center gap-2">
            <svg viewBox="0 0 24 24" className="h-12 w-12 text-green-500">
              <path
                fill="currentColor"
                d="M15 10c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1M8 9h5V7H8v2m14-1.5v6.97l-2.82.94L17.5 21H12v-2h-2v2H4.5S2 12.54 2 9.5 4.46 4 7.5 4h5c.91-1.21 2.36-2 4-2a1.498 1.498 0 011.38 2.08c-.14.34-.26.73-.32 1.15l2.27 2.27H22m-2 2h-1L15.5 6c0-.65.09-1.29.26-1.91-.97.25-1.76.97-2.09 1.91H7.5C5.57 6 4 7.57 4 9.5c0 1.88 1.22 6.65 2 9.5h2v-2h6v2h2l1.56-5.15 2.44-.82V9.5z"
              />
            </svg>
            <h5 className="inline-block bg-gradient-to-r from-green-500 to-blue-500  bg-clip-text text-3xl font-bold text-transparent hover:bg-opacity-25">
              ExpenseTracking.io
            </h5>
          </div>
          <Button variant="contained" onClick={handleAddExpense}>
            Add Expense
          </Button>
        </section>
        <section className="flex flex-col  py-4 px-6 ">
          <Quotes />
        </section>
        <section className="flex flex-col  py-4 px-6 ">
          <ExpensesLogs onEditExpense={handleEditExpense} />
        </section>
      </div>

      <ExpenseDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedExpense={editedExpense}
      />
    </main>
  );
}

export default App;
