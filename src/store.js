import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import createSagaMiddleware from 'redux-saga';
import { appReducer } from './containers/App/reducer';
import { dataFetchRequest } from './containers/App/actions';
import { saga as appSaga } from './containers/App/saga';
import { saga as listSaga } from './containers/ItemList/saga';
import { itemsReducer } from './containers/ItemList/reducer';
import {combineReducers} from "redux-immutable";
const sagaMiddleware = createSagaMiddleware();

const initialState = fromJS({});

export const store = createStore(
    combineReducers({
        app: appReducer,
        data: itemsReducer,
    }),
    initialState,
    compose(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(appSaga);
sagaMiddleware.run(listSaga);
store.dispatch(dataFetchRequest());
