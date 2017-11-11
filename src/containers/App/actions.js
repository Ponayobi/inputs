import { DATA_FETCH_FAIL, DATA_FETCH_REQUEST, DATA_FETCH_SUCCESS } from './constants';

export function dataFetchFail(msg) {
    return {
        type: DATA_FETCH_FAIL,
        payload: {
            msg,
        }
    }
}

export function dataFetchRequest() {
    return {
        type: DATA_FETCH_REQUEST,
        payload: {}
    }
}

export function dataFetchSuccess(data) {
    return {
        type: DATA_FETCH_SUCCESS,
        payload: {
            data,
        }
    }
}
