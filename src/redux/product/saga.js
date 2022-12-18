import { put, all, takeLatest, call } from 'redux-saga/effects';
import {
    CREATE_PRODUCT,
    DELETE_PRODUCT,
    GET_PRODUCTS,
} from './constants';
import { createProductSuccess, deleteProductSuccess, getProductsSuccess } from './actions';
import { fetchJSON } from '../../helpers/api';
import { DELETE, POST } from '../../constants/common';

function* getProducts() {
    const response = yield call(fetchJSON, 'api/product');
    yield put(getProductsSuccess(response.data));
}

function* createProduct({ payload }) {
    const response = yield call(fetchJSON, 'api/product', POST, payload);
    yield put(createProductSuccess(response));
}

function* deleteProduct({ payload }) {
    const response = yield call(fetchJSON, `api/product/${payload}`, DELETE, payload);
    yield put(deleteProductSuccess(response));
}

export default all([
    takeLatest(GET_PRODUCTS, getProducts),
    takeLatest(CREATE_PRODUCT, createProduct),
    takeLatest(DELETE_PRODUCT, deleteProduct)
]);
