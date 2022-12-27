import { put, all, takeLatest, call } from 'redux-saga/effects';
import { toast } from "react-toastify";
import {
    CREATE_COST_INCURRED,
    DELETE_COST_INCURRED,
    GET_COST_INCURRED,
    UPDATE_COST_INCURRED,
} from './constants';
import { createCostIncurredSuccess, deleteCostIncurredSuccess, getCostIncurredSuccess, updateCostIncurredSuccess, } from './actions';
import { fetchJSON } from '../../helpers/api';
import { DELETE, POST, PUT } from '../../constants/common';
import { isEmpty } from '../../helpers/format';

function* getCostIncurred() {
    const response = yield call(fetchJSON, 'api/costIncurred');
    const { data = {} } = response;
    yield put(getCostIncurredSuccess(data));
}

function* createCostIncurred({ payload }) {
    const response = yield call(fetchJSON, 'api/costIncurred', POST, payload);
    const { data = {} } = response;
    if (!isEmpty(data)) {
        yield put(createCostIncurredSuccess(response));
        toast.success('Thêm chi phí thành công!');
    }
}

function* deleteCostIncurred({ payload }) {
    const response = yield call(fetchJSON, `api/costIncurred/${payload}`, DELETE, payload);
    const { data = {} } = response;
    if (!isEmpty(data)) {
        yield put(deleteCostIncurredSuccess(response));
        toast.success('Xóa chi phí thành công!');
    }
}

function* updateCostIncurred({ payload }) {
    const { id, body } = payload;
    const response = yield call(fetchJSON, `api/costIncurred/${id}`, PUT, body);
    const { data = {} } = response;
    if (!isEmpty(data)) {
        yield put(updateCostIncurredSuccess(response));
        toast.success('Cập nhật chi phí thành công!');
    }
}

export default all([
    takeLatest(GET_COST_INCURRED, getCostIncurred),
    takeLatest(CREATE_COST_INCURRED, createCostIncurred),
    takeLatest(DELETE_COST_INCURRED, deleteCostIncurred),
    takeLatest(UPDATE_COST_INCURRED, updateCostIncurred)
]);
