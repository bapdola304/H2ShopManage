import { put, all, takeLatest, call } from 'redux-saga/effects';
import { toast } from "react-toastify";
import {
    CREATE_COST_TYPE,
    DELETE_COST_TYPE,
    GET_COST_TYPE,
    UPDATE_COST_TYPE,
} from './constants';
import { createCostTypeSuccess, deleteCostTypeSuccess, getCostsTypeSuccess, updateCostTypeSuccess } from './actions';
import { fetchJSON } from '../../helpers/api';
import { DELETE, POST, PUT } from '../../constants/common';
import { isEmpty } from '../../helpers/format';

function* getCostsType() {
    const response = yield call(fetchJSON, 'api/costType');
    const { data = {} } = response;
    yield put(getCostsTypeSuccess(data));
}

function* createCostType({ payload }) {
    const response = yield call(fetchJSON, 'api/costType', POST, payload);
    const { data = {} } = response;
    if (!isEmpty(data)) {
        yield put(createCostTypeSuccess(response));
        toast.success('Thêm loại chi phí thành công!');
    }
}

function* deleteCostType({ payload }) {
    const response = yield call(fetchJSON, `api/costType/${payload}`, DELETE, payload);
    const { data = {} } = response;
    if (!isEmpty(data)) {
        yield put(deleteCostTypeSuccess(response));
        toast.success('Xóa loại chi phí thành công!');
    }
}

function* updateCostType({ payload }) {
    const { id, body } = payload;
    const response = yield call(fetchJSON, `api/costType/${id}`, PUT, body);
    const { data = {} } = response;
    if (!isEmpty(data)) {
        yield put(updateCostTypeSuccess(response));
        toast.success('Cập nhật loại chi phí thành công!');
    }
}

export default all([
    takeLatest(GET_COST_TYPE, getCostsType),
    takeLatest(CREATE_COST_TYPE, createCostType),
    takeLatest(DELETE_COST_TYPE, deleteCostType),
    takeLatest(UPDATE_COST_TYPE, updateCostType)
]);
