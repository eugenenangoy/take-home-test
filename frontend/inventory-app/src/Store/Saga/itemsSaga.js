import axios from "axios";
import {API} from '../config/http-common'
import ActionTypes from "../Constant/ActionTypes";
import { put,all, takeEvery } from "redux-saga/effects";

function* handleGetBarang (){
    try {
        const res = yield axios (API('get', '/barang'))
        yield put ({type : ActionTypes.GET_BARANG_SUCCEED, payload : res.data})
    }catch(err){
        yield put ({type : ActionTypes.GET_BARANG_FAILED})
    }
}


export function* watchListGet(){
    yield all([
        yield takeEvery(ActionTypes.GET_BARANG, handleGetBarang)
    ])
}