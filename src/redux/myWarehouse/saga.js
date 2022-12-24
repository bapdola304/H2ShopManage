import { put, all, takeLatest, call } from 'redux-saga/effects';
import { toast } from "react-toastify";
import {
    CREATE_PRODUCT_FOR_WAREHOUSE,
    DELETE_PRODUCT_WAREHOUSE,
    GET_MY_WAREHOUSE_DETAIL,
    GET_MY_WAREHOUSE_LIST,
    UPDATE_PRODUCT_WAREHOUSE,
} from './constants';
import { createProductForWarehouseSuccess, deleteProductWarehouseSuccess, getMyWarehouseDetailSuccess, getMyWarehouseListSuccess, updateProductWarehouseSuccess } from './actions';
import { fetchJSON } from '../../helpers/api';
import { DELETE, POST, PUT } from '../../constants/common';
import { isEmpty } from '../../helpers/format';
import { goBack } from '../../helpers/navigation';


function* getMyWarehouseList() {
    const response = yield call(fetchJSON, 'api/myWarehouse');
    const { data = {} } = response;
    yield put(getMyWarehouseListSuccess(data));
}

function* getMyWarehouseDetail({ payload }) {
    const response = yield call(fetchJSON, `api/myWarehouse/${payload}`);
    const { data = {} } = response;
    yield put(getMyWarehouseDetailSuccess(data));
}

function* createProductForWarehouse({ payload }) {
    const response = yield call(fetchJSON, 'api/myWarehouse', POST, payload);
    const { data = {} } = response;
    if (!isEmpty(data)) {
        yield put(createProductForWarehouseSuccess(data));
        toast.success('Thêm vào kho thành công!');
        goBack()
    }
}

function* deleteWarehouse({ payload }) {
    const response = yield call(fetchJSON, `api/myWarehouse/${payload}`, DELETE, payload);
    const { data = {} } = response;
    if (!isEmpty(data)) {
        yield put(deleteProductWarehouseSuccess(data));
        toast.success('Xóa hàng thành công!');
    }
}

function* updateProductWarehouse({ payload }) {
    const { id, body } = payload;
    const response = yield call(fetchJSON, `api/myWarehouse/${id}`, PUT, body);
    const { data = {} } = response;
    if (!isEmpty(data)) {
        yield put(updateProductWarehouseSuccess(data));
        goBack();
        toast.success('Chỉnh sửa hàng thành công!');
    }
}

export default all([
    takeLatest(GET_MY_WAREHOUSE_LIST, getMyWarehouseList),
    takeLatest(GET_MY_WAREHOUSE_DETAIL, getMyWarehouseDetail),
    takeLatest(CREATE_PRODUCT_FOR_WAREHOUSE, createProductForWarehouse),
    takeLatest(DELETE_PRODUCT_WAREHOUSE, deleteWarehouse),
    takeLatest(UPDATE_PRODUCT_WAREHOUSE, updateProductWarehouse)
]);
