import { put, all, takeLatest, call } from 'redux-saga/effects';
import {
    CREATE_PRODUCT_TYPE,
    DELETE_PRODUCT_TYPE,
    GET_PRODUCTS_TYPE,
    UPDATE_PRODUCT_TYPE,
} from './constants';
import { createProductTypeSuccess, deleteProductTypeSuccess, getProductsTypeSuccess, updateProductTypeSuccess } from './actions';
import { fetchJSON, handleGetApiPath } from '../../helpers/api';
import { DELETE, POST, PUT } from '../../constants/common';
import { API } from '../../constants/apiPath';

function* getProductsType() {
    const path = handleGetApiPath(API.PRODUCT_TYPE.GET);
    const response = yield call(fetchJSON, path);
    const { data = {} } = response;
    yield put(getProductsTypeSuccess(data));
}

function* createProductType({ payload }) {
    const path = handleGetApiPath(API.PRODUCT_TYPE.GET);
    const response = yield call(fetchJSON, path, POST, payload);
    yield put(createProductTypeSuccess(response));
}

function* deleteProductType({ payload }) {
    const path = handleGetApiPath(API.PRODUCT_TYPE.GET_ID, { id: payload });
    const response = yield call(fetchJSON, path, DELETE, payload);
    yield put(deleteProductTypeSuccess(response));
}

function* updateProductType({ payload }) {
    const { id, body } = payload;
    const path = handleGetApiPath(API.PRODUCT_TYPE.GET_ID, { id });
    const response = yield call(fetchJSON, path, PUT, body);
    yield put(updateProductTypeSuccess(response));
}

export default all([
    takeLatest(GET_PRODUCTS_TYPE, getProductsType),
    takeLatest(CREATE_PRODUCT_TYPE, createProductType),
    takeLatest(DELETE_PRODUCT_TYPE, deleteProductType),
    takeLatest(UPDATE_PRODUCT_TYPE, updateProductType)
]);
