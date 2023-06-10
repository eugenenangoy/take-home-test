import {all} from 'redux-saga/effects'
import { watchListGet } from './itemsSaga'


export default function* rootSaga(){
    yield all([
        watchListGet()
    ])
}