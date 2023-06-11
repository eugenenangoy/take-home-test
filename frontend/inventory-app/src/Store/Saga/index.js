import {all} from 'redux-saga/effects'
import { watchListGet } from './itemsSaga'
import { watchLoginSaga } from './loginsaga'


export default function* rootSaga(){
    yield all([
        watchListGet(),
        watchLoginSaga()
    ])
}