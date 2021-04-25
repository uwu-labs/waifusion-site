import {
  applyMiddleware,
  combineReducers,
  createStore,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import rootSaga from "./sagas";
import userReducer from "./reducers/user";
import waifusReducer from "./reducers/waifus";
import globalsReducer from "./reducers/globals";

const sagaMiddleware = createSagaMiddleware();

export const reducers = combineReducers({
  user: userReducer,
  waifus: waifusReducer,
  globals: globalsReducer,
});

export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
