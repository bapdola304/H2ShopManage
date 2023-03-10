// @flow
import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import layoutSaga from './layout/saga';
import appMenuSaga from './appMenu/saga';
import loadingSaga from './loading/saga';
import productTypeSaga from './productType/saga';
import productSaga from './product/saga';
import warehouseSaga from './warehouse/saga';
import myWarehouseSaga from './myWarehouse/saga';
import productSoldSaga from './productSold/saga';
import costTypeSaga from './costType/saga';
import costIncurredSaga from './costIncurred/saga';
import revenueSaga from './revenue/saga';

export default function* rootSaga() {
    yield all([
        authSaga(),
        layoutSaga(),
        appMenuSaga(),
        loadingSaga,
        productSaga,
        warehouseSaga,
        myWarehouseSaga,
        productSoldSaga,
        costTypeSaga,
        costIncurredSaga,
        revenueSaga,
        productTypeSaga
    ]);
}
