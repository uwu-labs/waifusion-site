import { combineReducers, createStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user";

export const reducers = combineReducers({
  user: userReducer,
});

export const store = createStore(
  reducers,
  process.env.NODE_ENV !== "production" &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export type RootState = ReturnType<typeof store.getState>;
