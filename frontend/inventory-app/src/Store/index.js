import { createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import barangReducers from './Reducers/barangReducers'

const saga = createSagaMiddleware()
const store = createStore(
    barangReducers
)