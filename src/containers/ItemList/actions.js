import {CREATE_NEW_ITEM, ITEM_ADD, ITEM_CHANGE, ITEM_DELETE, ITEM_SHADOW_CHANGE} from './constants';

export function itemDelete(id) {
    return {
        type: ITEM_DELETE,
        payload: {
            id,
        }
    }
}

export function itemChange(id, val) {
    return {
        type: ITEM_CHANGE,
        payload: {
            id,
            val,
        }
    }
}

export function createNewItem(name = null) {
    return {
        type: CREATE_NEW_ITEM,
        payload: {
            name,
        }
    }
}

export function itemAdd(item) {
    return {
        type: ITEM_ADD,
        payload: {
            id: 0,
            item
        }
    }
}

export function shadowChange(id, val) {
    return {
        type: ITEM_SHADOW_CHANGE,
        payload: {
            id,
            val,
        }
    }
}
