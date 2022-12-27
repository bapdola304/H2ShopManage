// @flow

import { combineReducers } from 'redux';
import Layout from './layout/reducers';
import Auth from './auth/reducers';
import AppMenu from './appMenu/reducers';
import loading from './loading/reducers';
import product from './product/reducers';
import warehouse from './warehouse/reducers';
import myWarehouse from './myWarehouse/reducers';
import productSold from './productSold/reducers';
import costType from './costType/reducers';
import costIncurred from './costIncurred/reducers';

export default combineReducers({
    Auth,
    AppMenu,
    Layout,
    loading,
    product,
    warehouse,
    myWarehouse,
    productSold,
    costType,
    costIncurred
});
