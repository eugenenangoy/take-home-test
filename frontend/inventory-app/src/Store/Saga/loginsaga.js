import { all, call, put, takeEvery } from "redux-saga/effects";
import ActionTypes from "../Constant/ActionTypes";
import { API } from "../config/http-common";
import axios from "axios";

function* handleRegisterUser(action) {
  try {
    const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));
    const res = yield axios(API("Post", "register", action.payload));
    yield put({ type: ActionTypes.REGISTER_USER_SUCCEED, payload: res.data });
    yield call(delay, 4000);
    yield put({ type: ActionTypes.REGISTER_USER_SUCCEED, payload: null });
  } catch (error) {
    const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));
    yield put({
      type: ActionTypes.REGISTER_USER_FAILED,
      payload: error.response.data.message,
    });
    yield call(delay, 4000);
    yield put({ type: ActionTypes.REGISTER_USER_FAILED, payload: null });
  }
}
function* HandleLoginUser(action) {
  try {
    const result = yield axios(API("post", "login", action.payload));
    localStorage.setItem("token", result.data.token);
    //cek hasil jwt verify
    yield put({ type: ActionTypes.LOGIN_USER_SUCCEED, payload: result.data });
  } catch (e) {
    const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));
    yield put({
      type: ActionTypes.LOGIN_USER_FAILED,
      payload: e.response.data.message,
    });
    yield call(delay, 4000);
    yield put({ type: ActionTypes.LOGIN_USER_FAILED, payload: null });
  }
}

export function* watchLoginSaga() {
  yield all([
    yield takeEvery(ActionTypes.LOGIN_USER, HandleLoginUser),
    yield takeEvery(ActionTypes.REGISTER_USER, handleRegisterUser),
  ]);
}
