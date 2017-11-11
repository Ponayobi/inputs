import { call, put, takeLatest } from 'redux-saga/effects'
import { DATA_FETCH_REQUEST } from './constants';
import { dataFetchSuccess, dataFetchFail } from './actions';
import data from './data.json';

const fakeRequest = () => new Promise((resolve, reject) => {
    const maxTimeRequest = 1000;
    const minTimeRequest = 100;
    const fakeTime = Math.floor(Math.random() * (maxTimeRequest + 1 - minTimeRequest));

    setTimeout(() => {
        const success = Math.random() > 0.1;
        if (!success) {
            const error =  new Error('Fetch data: 500 (Internal Server Error)');
            reject(error);
        }
        resolve(data);
    }, fakeTime);
});

function* fetchData() {
    try {
        const { items } = yield call(fakeRequest);
        items.map((item, i) => {
            item.id = i;
            return item;
        });
        yield put(dataFetchSuccess(items));
    } catch (e) {
        yield put(dataFetchFail(e.message));
    }
}

export function* saga() {
    yield takeLatest(DATA_FETCH_REQUEST, fetchData);
}
