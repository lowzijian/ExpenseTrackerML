import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { DateTime } from "luxon";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  HookTextField,
  HookCurrencyField,
  HookRadioGroup,
} from "../components";
import { RadioGroupOption } from "./ReactHookForm/HookRadioGroup";
import { useAppDispatch } from "../redux/store";
import { Expense, ExpenseBase } from "../interfaces";
import { addExpense, updateExpense } from "../redux/expenseSlice";
import { getCategoryIcon } from "../helper";

interface ExpenseDialogProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  selectedExpense: Expense | null;
}

const initialValues = {
  amount: 0,
  remark: "",
  category: "",
};

const validationSchema = yup.object({
  amount: yup.number().min(0.01).required("Amount is required"),
  remark: yup.string(),
  category: yup.string().required("Category is required"),
});

const categoryOptions: RadioGroupOption[] = [
  "Bills",
  "Car",
  "Clothes",
  "Communications",
  "Entertainment",
  "Food",
  "Gifts",
  "Health",
  "House",
  "Pets",
  "Sports",
  "Transport",
].map((val) => {
  return {
    label: val,
    value: val,
    icon: getCategoryIcon(val, "w-6 h-6"),
  };
});
type ValidationSchemaType = yup.InferType<typeof validationSchema>;

const ExpenseDialog = ({
  isOpen,
  setIsOpen,
  selectedExpense,
}: ExpenseDialogProps) => {
  const onClose = () => {
    setIsOpen(false);
    formMethods.reset(initialValues);
  };
  const dt = DateTime.now().toFormat("cccc, d MMMM y");
  const dispatch = useAppDispatch();

  const formMethods = useForm<ValidationSchemaType>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (values: ExpenseBase) => {
    if (selectedExpense) {
      dispatch(updateExpense({ ...values, id: selectedExpense.id }));
    } else {
      dispatch(addExpense(values));
    }
    onClose();
  };

  const initForm = (expense: Expense) => {
    formMethods.reset({
      ...expense,
    });
  };

  useEffect(() => {
    if (selectedExpense) {
      initForm(selectedExpense);
    }
  }, [selectedExpense]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        onClose={onClose}
        as="div"
        className="relative z-10"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="flex w-full flex-col items-start rounded-lg bg-[#374151] text-left drop-shadow-2xl sm:w-3/4 lg:w-2/4">
                <div className="w-full py-4 px-6">
                  <Dialog.Title className="mb-1 text-xl font-medium text-white">
                    Create Expense
                  </Dialog.Title>
                  <Dialog.Description className="text-white/75">
                    {dt}
                  </Dialog.Description>
                </div>
                <FormProvider {...formMethods}>
                  <form className=" flex w-full flex-col gap-2 border-y-2 border-slate-600/50 py-4 px-6">
                    <HookCurrencyField label="Amount" name="amount" />
                    <HookTextField
                      label="Remark"
                      name="remark"
                      placeholder="Enter your remark here ..."
                    />
                    <HookRadioGroup
                      label="Category"
                      name="category"
                      options={categoryOptions}
                    />
                  </form>
                </FormProvider>
                <div className="flex w-full flex-row justify-end gap-2 py-4 px-6">
                  <Button onClick={onClose}>Discard</Button>
                  <Button
                    variant="contained"
                    onClick={formMethods.handleSubmit(onSubmit)}
                  >
                    Submit
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ExpenseDialog;
