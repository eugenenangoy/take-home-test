import axios from "axios";
import {API, FILE_API} from '../config/http-common'
import ActionTypes from "../Constant/ActionTypes";
import { put,all, takeEvery } from "redux-saga/effects";

function* handleGetBarang (){
    try {
        const res = yield axios (API('get', 'barang'))
        yield put ({type : ActionTypes.GET_BARANG_SUCCEED, payload : res.data})
    }catch(err){
        yield put ({type : ActionTypes.GET_BARANG_FAILED})
    }
}

function* handleAddBarang (action){
    try {
        yield axios (FILE_API('post', 'barang', action.payload))
        const data = yield axios (API('get', 'barang'))
        yield put ({type : ActionTypes.ADD_BARANG_SUCCEED, payload : data.data})
    } catch (error) {
        yield put({type : ActionTypes.ADD_BARANG_FAILED, payload :error.message})
    }
}

function* handleUpdateBarang (action){
    try {
        yield axios (FILE_API('put', `barang/${action.payload.id}`, action.payload.body))
        const data = yield axios(API('get', 'barang'))
        yield put ({type: ActionTypes.EDIT_BARANG_SUCCEED, payload : data.data})
    } catch (error) {
        yield put({type : ActionTypes.EDIT_BARANG_FAILED, payload : error.message})   
    }
}

function* handleDeleteBarang (action){
    try {
        yield axios (API('delete', `barang/${action.payload}`))
        const data = yield axios (API('get', 'barang'))
        yield put ({type : ActionTypes.DELETE_BARANG_SUCCEED, payload : data.data})
    } catch (error) {
        yield put({type : ActionTypes.DELETE_BARANG_FAILED, payload: error.message})
    }
}

export function* watchListGet(){
    yield all([
        yield takeEvery(ActionTypes.GET_BARANG, handleGetBarang),
        yield takeEvery(ActionTypes.ADD_BARANG, handleAddBarang),
        yield takeEvery(ActionTypes.EDIT_BARANG, handleUpdateBarang),
        yield takeEvery(ActionTypes.DELETE_BARANG, handleDeleteBarang)
    ])
}