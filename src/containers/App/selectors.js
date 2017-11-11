import { createSelector } from 'reselect';

const selectApp = () => (state) => state.get('app');

const selectLoadingFlag = () => createSelector(
    selectApp(),
    (app) => app.get('loading')
);

const selectErrors = () => createSelector(
    selectApp(),
    (app) => app.get('errors')
);

export {
    selectLoadingFlag,
    selectErrors,
};
