import { fromJS } from 'immutable';
import { DATA_FETCH_REQUEST, DATA_FETCH_SUCCESS, DATA_FETCH_FAIL } from './constants';

const initialState = fromJS({
    loading: false,
    errors: [],
});

export function appReducer(state = initialState, action) {
    switch (action.type) {
        case DATA_FETCH_REQUEST:
            return state.set('loading', true).set('errors', fromJS([]));
        case DATA_FETCH_SUCCESS:
            return state.set('loading', false).set('errors', fromJS([]));
        case DATA_FETCH_FAIL:
            return state.set('loading', false).set('errors', fromJS([action.payload.msg]));
        default:
            return state;
    }
}
