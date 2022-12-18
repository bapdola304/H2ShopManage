import { put, all, takeLatest } from 'redux-saga/effects';
import {
    LOADING,
    LOADING_SUCCESS
} from './constants';
import { handleLoadingSuccess } from './actions';

function* handleLoading(isLoading) {
    yield put(handleLoadingSuccess(isLoading));
}

export default all([
    takeLatest(LOADING, handleLoading),
]);
