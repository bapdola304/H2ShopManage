import { put, all, takeLatest, call } from 'redux-saga/effects';
import { toast } from "react-toastify";
import {
    CREATE_WAREHOUSE,
    DELETE_WAREHOUSE,
    GET_WAREHOUSE_LIST,
    UPDATE_WAREHOUSE,
} from './constants';
import { createWarehouseSuccess, deleteWarehouseSuccess, getWarehouseListSuccess, updateWarehouseSuccess } from './actions';
import { fetchJSON } from '../../helpers/api';
import { DELETE, POST, PUT, STORAGE_KEY_DATA } from '../../constants/common';
import { isEmpty } from '../../helpers/format';
import { getObjectFromStorage, removeObjectFromStorage, setObjectToStorage } from '../../helpers/storage';

function* getWarehouseList() {
    const warehouseListStorageData = getObjectFromStorage(STORAGE_KEY_DATA.WAREHOUSE_LIST);
    if (!isEmpty(warehouseListStorageData)) {
        return yield put(getWarehouseListSuccess(warehouseListStorageData));
    }
    const response = yield call(fetchJSON, 'api/warehouse');
    const { data = {} } = response;
    if (!isEmpty(data)) {
        setObjectToStorage(STORAGE_KEY_DATA.WAREHOUSE_LIST, data);
        yield put(getWarehouseListSuccess(data));
    }
}

function* createWarehouse({ payload }) {
    const response = yield call(fetchJSON, 'api/warehouse', POST, payload);
    const { data = {} } = response;
    if (!isEmpty(data)) {
        removeObjectFromStorage(STORAGE_KEY_DATA.WAREHOUSE_LIST);
        yield put(createWarehouseSuccess(response));
        toast.success('Tạo kho hàng thành công!');
    }
}

function* deleteWarehouse({ payload }) {
    const response = yield call(fetchJSON, `api/warehouse/${payload}`, DELETE, payload);
    const { data = {} } = response;
    if (!isEmpty(data)) {
        removeObjectFromStorage(STORAGE_KEY_DATA.WAREHOUSE_LIST);
        yield put(deleteWarehouseSuccess(data));
        toast.success('Xóa kho hàng thành công!');
    }
}

function* updateWarehouse({ payload }) {
    const { id, body } = payload;
    const response = yield call(fetchJSON, `api/warehouse/${id}`, PUT, body);
    const { data = {} } = response;
    if (!isEmpty(data)) {
        removeObjectFromStorage(STORAGE_KEY_DATA.WAREHOUSE_LIST);
        yield put(updateWarehouseSuccess(data));
        toast.success('Chỉnh sửa kho hàng thành công!');
    }
}

export default all([
    takeLatest(GET_WAREHOUSE_LIST, getWarehouseList),
    takeLatest(CREATE_WAREHOUSE, createWarehouse),
    takeLatest(DELETE_WAREHOUSE, deleteWarehouse),
    takeLatest(UPDATE_WAREHOUSE, updateWarehouse)
]);
