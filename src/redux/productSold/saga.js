import { put, all, takeLatest, call } from 'redux-saga/effects';
import { toast } from "react-toastify";
import {
    CREATE_PRODUCT_SOLD,
    DELETE_PRODUCT_SOLD,
    GET_PRODUCT_SOLD_DETAIL,
    GET_PRODUCT_SOLD_LIST,
    UPDATE_PRODUCT_SOLD,
} from './constants';
import { createProductSoldSuccess, deleteProductSoldSuccess, getProductSoldDetailSuccess, getProductSoldListSuccess, updateProductSoldSuccess } from './actions';
import { fetchJSON, handleGetApiPath } from '../../helpers/api';
import { DELETE, POST, PUT } from '../../constants/common';
import { isEmpty } from '../../helpers/format';
import { goBack } from '../../helpers/navigation';
import { API } from '../../constants/apiPath';


function* getProductSoldList({ payload }) {
    const path = handleGetApiPath(API.PRODUCT_SOLD.GET, payload);
    const response = yield call(fetchJSON, path);
    const { data = {} } = response;
    yield put(getProductSoldListSuccess(data));
}

function* getProductSoldDetail({ payload }) {
    const response = yield call(fetchJSON, `api/productSold/${payload}`);
    const { data = {} } = response;
    yield put(getProductSoldDetailSuccess(data));
}

function* createProductSold({ payload }) {
    const response = yield call(fetchJSON, 'api/productSold', POST, payload);
    const { data = {} } = response;
    if (!isEmpty(data)) {
        yield put(createProductSoldSuccess(data));
        toast.success('Thêm hàng đã bán thành công!');
        // goBack()
    }
}

function* deleteProductSold({ payload }) {
    const response = yield call(fetchJSON, `api/productSold/${payload}`, DELETE, payload);
    const { data = {} } = response;
    if (!isEmpty(data)) {
        yield put(deleteProductSoldSuccess(data));
        toast.success('Xóa hàng thành công!');
    }
}

function* updateProductSold({ payload }) {
    const { id, body } = payload;
    const response = yield call(fetchJSON, `api/productSold/${id}`, PUT, body);
    const { data = {} } = response;
    if (!isEmpty(data)) {
        yield put(updateProductSoldSuccess(data));
        goBack();
        toast.success('Cập nhật hàng thành công!');
    }
}

export default all([
    takeLatest(GET_PRODUCT_SOLD_LIST, getProductSoldList),
    takeLatest(GET_PRODUCT_SOLD_DETAIL, getProductSoldDetail),
    takeLatest(CREATE_PRODUCT_SOLD, createProductSold),
    takeLatest(DELETE_PRODUCT_SOLD, deleteProductSold),
    takeLatest(UPDATE_PRODUCT_SOLD, updateProductSold)
]);
