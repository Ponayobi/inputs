import { call, put, takeLatest, select, takeEvery } from 'redux-saga/effects';
import { selectItems, selectDirection } from './selectors';
import {CREATE_NEW_ITEM, ITEM_ADD, ITEM_CHANGE, ITEM_DELETE} from './constants';
import { itemAdd, shadowChange } from './actions';
import {DATA_FETCH_SUCCESS} from "../App/constants";

function getId(items) {
    let result = 0;
    items.forEach((item) => {
        if (item.get('id') >= result) result = item.get('id') + 1;
    });
    return result;
}

function* getNewItem() {
    const items = yield select(selectItems());
    const uid = yield call(getId, items);
    const item = {
        id: uid,
        name: `Item ${uid + 1}`,
        percent: 0,
    };
    yield put(itemAdd(item));
}

function* getTotalPercent() {
    const items = yield select(selectItems());
    let result = 0;

    items.forEach((item) => {
        result += parseFloat(item.get('percent'));
    });

    return result;
}

function round(value) {
    return Math.round(value * 100) / 100
}

function* equalizePercents(items, percent, direction = 0) {
    if (!items.size) return true;

    let itemToChange = items.get(0);
    let percentSum = parseFloat(itemToChange.get('percent'));

    for (let i = 1; i < items.size; i += 1) {
        const item = items.get(i);
        const currentPercent = parseFloat(item.get('percent'));
        const reservedPercent = parseFloat(itemToChange.get('percent'));
        percentSum += currentPercent;

        const canSave = direction >= 0 ? reservedPercent < currentPercent : reservedPercent > currentPercent;
        if (canSave) itemToChange = item;
    }

    let val = round(percent - percentSum + parseFloat(itemToChange.get('percent')));
    if (val < 0) val = 0;
    if (val > 100) val = 100;
    yield put(shadowChange(itemToChange.get('id'), val));

    yield call(
        equalizePercents,
        items.filter((item) => item.get('id') !== itemToChange.get('id')),
        round(percent - val),
        direction,
    );
}

function* recalculatePercentages({ payload: { id } }) {
    const items = yield select(selectItems());
    const direction = yield select(selectDirection());
    const selectedItem = items.find((item) => item.get('id') === id);
    const selectedPercent = selectedItem ? selectedItem.get('percent') : 0;
    const filteredItems = items.filter((item) => item.get('id') !== id);

    let totalPercent = 0;
    items.forEach((item) => {
        totalPercent += round(item.get('percent'));
    });
    const percent = round(100 - selectedPercent);

    if (totalPercent) {
        yield call(equalizePercents, filteredItems, percent, direction);
    } else {
        yield call(equalizePercents, items, 100);
    }
}

export function* saga() {
    yield takeLatest(CREATE_NEW_ITEM, getNewItem);
    yield takeLatest(DATA_FETCH_SUCCESS, recalculatePercentages, {payload: {id:0}});
    yield takeLatest(ITEM_ADD, recalculatePercentages);
    yield takeLatest(ITEM_CHANGE, recalculatePercentages);
    yield takeLatest(ITEM_DELETE, recalculatePercentages);
}
