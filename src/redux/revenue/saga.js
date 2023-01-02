import { put, all, takeLatest, call } from 'redux-saga/effects';
import {
    GET_REVENUE,
} from './constants';
import {  getRevenueSuccess } from './actions';
import { fetchJSON } from '../../helpers/api';

function* getRevenue() {
    const response = yield call(fetchJSON, 'api/revenue');
    const { data = {} } = response;
    yield put(getRevenueSuccess(data));
}

export default all([
    takeLatest(GET_REVENUE, getRevenue),
]);
