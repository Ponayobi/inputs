import { createSelector } from 'reselect';

const selectData = () => (state) => state.get('data');

const selectItems = () => createSelector(
    selectData(),
    (app) => app.get('items')
);

const selectDirection = () => createSelector(
    selectData(),
    (app) => app.get('direction')
);

export {
    selectItems,
    selectDirection,
};
