import { put, all, takeLatest, call } from 'redux-saga/effects';
import {
    GET_REVENUE,
} from './constants';
import {  getRevenueSuccess } from './actions';
import { fetchJSON, handleGetApiPath } from '../../helpers/api';
import { API } from '../../constants/apiPath';

function* getRevenue({ payload }) {
    const path = handleGetApiPath(API.REVENUE.GET, payload);
    const response = yield call(fetchJSON, path);
    const { data = {} } = response;
    yield put(getRevenueSuccess(data));
}

export default all([
    takeLatest(GET_REVENUE, getRevenue),
]);
