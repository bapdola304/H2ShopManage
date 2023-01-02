import { put, all, takeLatest, call } from 'redux-saga/effects';
import {
    CREATE_PRODUCT,
    DELETE_PRODUCT,
    GET_PRODUCTS,
    UPDATE_PRODUCT,
} from './constants';
import { createProductSuccess, deleteProductSuccess, getProductsSuccess, updateProductSuccess } from './actions';
import { fetchJSON, handleGetApiPath } from '../../helpers/api';
import { DELETE, POST, PUT } from '../../constants/common';
import { API } from '../../constants/apiPath';

function* getProducts({ payload }) {
    const path = handleGetApiPath(API.PRODUCT.GET, payload);
    const response = yield call(fetchJSON, path);
    const { data = {} } = response;
    yield put(getProductsSuccess(data));
}

function* createProduct({ payload }) {
    const path = handleGetApiPath(API.PRODUCT.GET);
    const response = yield call(fetchJSON, path, POST, payload);
    yield put(createProductSuccess(response));
}

function* deleteProduct({ payload }) {
    const path = handleGetApiPath(API.PRODUCT.GET_ID, { id: payload });
    const response = yield call(fetchJSON, path, DELETE, payload);
    yield put(deleteProductSuccess(response));
}

function* updateProduct({ payload }) {
    const { id, body } = payload;
    const path = handleGetApiPath(API.PRODUCT.GET_ID, { id });
    const response = yield call(fetchJSON, path, PUT, body);
    yield put(updateProductSuccess(response));
}

export default all([
    takeLatest(GET_PRODUCTS, getProducts),
    takeLatest(CREATE_PRODUCT, createProduct),
    takeLatest(DELETE_PRODUCT, deleteProduct),
    takeLatest(UPDATE_PRODUCT, updateProduct)
]);
