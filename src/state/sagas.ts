import { put, takeEvery, all, select } from "redux-saga/effects";
import { ContractHelper } from "../services/contract";
import { Waifu } from "../types/waifusion";
import {
  completeLoadWaifus,
  loadWaifus,
  setWaifuIndexes,
} from "./reducers/user";
import { selectWaifus, setWaifus } from "./reducers/waifus";

/* WATCHERS */
function* watchLoadWaifus() {
  yield takeEvery(loadWaifus, loadWaifusAction);
}

/* ACTIONS */
function* loadWaifusAction() {
  const waifus: Waifu[] = yield select(selectWaifus);
  const waifusCopy = [...waifus];
  const contractHelper = new ContractHelper();
  yield contractHelper.init();
  const _ownedWaifus: Waifu[] = yield contractHelper.getWaifus();
  yield put(setWaifuIndexes(_ownedWaifus.map((waifu: Waifu) => waifu.id)));
  for (let i = 0; i < _ownedWaifus.length; i++) {
    const waifuIds = waifus.map((waifu: Waifu) => waifu.id);
    if (waifuIds.indexOf(_ownedWaifus[i].id) === -1)
      waifusCopy.push(_ownedWaifus[i]);
    else waifusCopy[i] = _ownedWaifus[i];
  }
  waifusCopy.reverse();
  yield put(setWaifus(waifusCopy));
  yield put(completeLoadWaifus());
}

export default function* rootSaga(): any {
  yield all([watchLoadWaifus()]);
}
