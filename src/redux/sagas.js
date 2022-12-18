// @flow
import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import layoutSaga from './layout/saga';
import appMenuSaga from './appMenu/saga';
import loadingSaga from './loading/saga';
import productSaga from './product/saga';

export default function* rootSaga() {
    yield all([authSaga(), layoutSaga(), appMenuSaga(), loadingSaga, productSaga]);
}
