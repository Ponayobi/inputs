import { fromJS } from 'immutable';
import { DATA_FETCH_SUCCESS } from '../App/constants';
import {ITEM_ADD, ITEM_CHANGE, ITEM_DELETE, ITEM_SHADOW_CHANGE} from './constants';

const initialState = fromJS({
    items: [],
    direction: 0,
});

export function itemsReducer(state = initialState, action) {
    switch (action.type) {
        case DATA_FETCH_SUCCESS:
            return state.set('items', fromJS(action.payload.data));
        case ITEM_DELETE:
            return state.set('items', state.get('items').filter((item) => item.get('id') !== action.payload.id ));
        case ITEM_ADD:
            return state.set('items', state.get('items').push(fromJS(action.payload.item)));
        case ITEM_CHANGE: {
            const index = state.get('items').findIndex((item) => item.get('id') === action.payload.id);
            const direction = action.payload.val - state.getIn(['items', index, 'percent']);
            return state.setIn(['items', index, 'percent'], action.payload.val)
                .set('direction', direction);
        }
        case ITEM_SHADOW_CHANGE: {
            const index = state.get('items').findIndex((item) => item.get('id') === action.payload.id);
            return state.setIn(['items', index, 'percent'], action.payload.val);
        }
        default:
            return state;
    }
}
