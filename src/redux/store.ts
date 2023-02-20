import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { ExpenseSlice } from "./expenseSlice";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import createSagaMiddleware from "redux-saga";
import mySaga from "./sagas";
import { PostSlice } from "./postsSlice";

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    expenses: ExpenseSlice.reducer,
    posts: PostSlice.reducer,
  },
  middleware: [...getDefaultMiddleware(), sagaMiddleware],
});
sagaMiddleware.run(mySaga);

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
