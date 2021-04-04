import { put, takeEvery, all, select } from "redux-saga/effects";
import { ContractHelper } from "../services/contract";
import { Waifu } from "../types/waifusion";
import { loadWaifus, setWaifuIndexes } from "./reducers/user";
import { addWaifu, selectWaifus } from "./reducers/waifus";

/* WATCHERS */
function* watchLoadWaifus() {
  yield takeEvery(loadWaifus, loadWaifusAction);
}

/* ACTIONS */
function* loadWaifusAction() {
  const waifus: Waifu[] = yield select(selectWaifus);
  const contractHelper = new ContractHelper();
  yield contractHelper.init();
  const _ownedWaifus: Waifu[] = yield contractHelper.getWaifus();
  yield put(setWaifuIndexes(_ownedWaifus.map((waifu: Waifu) => waifu.id)));
  for (let i = 0; i < _ownedWaifus.length; i++) {
    const waifuIds = waifus.map((waifu: Waifu) => waifu.id);
    if (waifuIds.indexOf(_ownedWaifus[i].id) === -1)
      yield put(addWaifu(_ownedWaifus[i]));
  }
}

export default function* rootSaga(): any {
  yield all([watchLoadWaifus()]);
}
