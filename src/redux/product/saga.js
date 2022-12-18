import { put, all, takeLatest, call } from 'redux-saga/effects';
import {
    GET_PRODUCTS,
} from './constants';
import { getProductsSuccess } from './actions';
import { fetchJSON } from '../../helpers/api';

function* getProducts() {
    const response = yield call(fetchJSON, 'api/product');
    console.log(response)
    yield put(getProductsSuccess(response.data));
}

export default all([
    takeLatest(GET_PRODUCTS, getProducts),
]);
