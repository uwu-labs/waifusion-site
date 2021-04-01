import { combineReducers, createStore } from "redux";
import user from "./reducers/user";

const reducers = combineReducers({
  user,
});

export const store = createStore(
  reducers,
  process.env.NODE_ENV !== "production" &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
