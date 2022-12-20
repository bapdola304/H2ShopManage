import { put, all, takeLatest, call } from 'redux-saga/effects';
import {
    CREATE_PRODUCT,
    DELETE_PRODUCT,
    GET_PRODUCTS,
    UPDATE_PRODUCT,
} from './constants';
import { createProductSuccess, deleteProductSuccess, getProductsSuccess, updateProductSuccess } from './actions';
import { fetchJSON } from '../../helpers/api';
import { DELETE, POST, PUT } from '../../constants/common';

function* getProducts() {
    const response = yield call(fetchJSON, 'api/product');
    const { data = {} } = response;
    yield put(getProductsSuccess(data));
}

function* createProduct({ payload }) {
    const response = yield call(fetchJSON, 'api/product', POST, payload);
    yield put(createProductSuccess(response));
}

function* deleteProduct({ payload }) {
    const response = yield call(fetchJSON, `api/product/${payload}`, DELETE, payload);
    yield put(deleteProductSuccess(response));
}

function* updateProduct({ payload }) {
    const { id, body } = payload;
    const response = yield call(fetchJSON, `api/product/${id}`, PUT, body);
    yield put(updateProductSuccess(response));
}

export default all([
    takeLatest(GET_PRODUCTS, getProducts),
    takeLatest(CREATE_PRODUCT, createProduct),
    takeLatest(DELETE_PRODUCT, deleteProduct),
    takeLatest(UPDATE_PRODUCT, updateProduct)
]);
