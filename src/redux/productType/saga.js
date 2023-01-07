import { put, all, takeLatest, call } from 'redux-saga/effects';
import {
    CREATE_PRODUCT_TYPE,
    DELETE_PRODUCT_TYPE,
    GET_PRODUCTS_TYPE,
    UPDATE_PRODUCT_TYPE,
} from './constants';
import { createProductTypeSuccess, deleteProductTypeSuccess, getProductsTypeSuccess, updateProductTypeSuccess } from './actions';
import { fetchJSON, handleGetApiPath } from '../../helpers/api';
import { DELETE, POST, PUT, STORAGE_KEY_DATA } from '../../constants/common';
import { API } from '../../constants/apiPath';
import { getObjectFromStorage, setObjectToStorage, removeObjectFromStorage } from '../../helpers/storage';
import { isEmpty } from '../../helpers/format';
import { toast } from 'react-toastify';

function* getProductsType() {
    const productTypeListStorageData = getObjectFromStorage(STORAGE_KEY_DATA.PRODUCT_TYPE);
    if (!isEmpty(productTypeListStorageData)) {
        return yield put(getProductsTypeSuccess(productTypeListStorageData));
    }
    const path = handleGetApiPath(API.PRODUCT_TYPE.GET);
    const response = yield call(fetchJSON, path);
    const { data = {} } = response;
    if (!isEmpty(data)) {
        setObjectToStorage(STORAGE_KEY_DATA.PRODUCT_TYPE, data);
        yield put(getProductsTypeSuccess(data));
    }
}

function* createProductType({ payload }) {
    const path = handleGetApiPath(API.PRODUCT_TYPE.GET);
    const response = yield call(fetchJSON, path, POST, payload);
    const { data } = response;
    if (!isEmpty(data)) {
        removeObjectFromStorage(STORAGE_KEY_DATA.PRODUCT_TYPE);
        yield put(createProductTypeSuccess(response));
        toast.success('Tạo loại mặt hàng thành công!');
    }
}

function* deleteProductType({ payload }) {
    const path = handleGetApiPath(API.PRODUCT_TYPE.GET_ID, { id: payload });
    const response = yield call(fetchJSON, path, DELETE, payload);
    const { data } = response;
    if (!isEmpty(data)) {
        removeObjectFromStorage(STORAGE_KEY_DATA.PRODUCT_TYPE);
        yield put(deleteProductTypeSuccess(response));
        toast.success('Xóa loại mặt hàng thành công!');
    }
}

function* updateProductType({ payload }) {
    const { id, body } = payload;
    const path = handleGetApiPath(API.PRODUCT_TYPE.GET_ID, { id });
    const response = yield call(fetchJSON, path, PUT, body);
    const { data } = response;
    if (!isEmpty(data)) {
        removeObjectFromStorage(STORAGE_KEY_DATA.PRODUCT_TYPE);
        yield put(updateProductTypeSuccess(response));
        toast.success('Chỉnh sửa loại mặt hàng thành công!');
    }
}

export default all([
    takeLatest(GET_PRODUCTS_TYPE, getProductsType),
    takeLatest(CREATE_PRODUCT_TYPE, createProductType),
    takeLatest(DELETE_PRODUCT_TYPE, deleteProductType),
    takeLatest(UPDATE_PRODUCT_TYPE, updateProductType)
]);
