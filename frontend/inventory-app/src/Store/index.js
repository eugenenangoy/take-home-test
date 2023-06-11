import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import {composeWithDevTools} from 'redux-devtools-extension'
import rootSaga from './Saga'
import rootReducers from './Reducers'

const saga = createSagaMiddleware()
const store = createStore(
    rootReducers,
    composeWithDevTools(applyMiddleware(saga))
)
saga.run(rootSaga)
export default store