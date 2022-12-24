import {
    GET_MY_WAREHOUSE_LIST,
    GET_MY_WAREHOUSE_LIST_SUCCESS,
    CREATE_PRODUCT_FOR_WAREHOUSE,
    CREATE_PRODUCT_FOR_WAREHOUSE_SUCCESS,
    RESET_ACTION_SUCCESS,
    DELETE_PRODUCT_WAREHOUSE,
    DELETE_PRODUCT_WAREHOUSE_SUCCESS,
    GET_MY_WAREHOUSE_DETAIL,
    GET_MY_WAREHOUSE_DETAIL_SUCCESS,
    UPDATE_PRODUCT_WAREHOUSE,
    UPDATE_PRODUCT_WAREHOUSE_SUCCESS,
    RESET_MY_WAREHOUSE_DETAIL
} from './constants';

const getMyWarehouseList = () => {
    return { type: GET_MY_WAREHOUSE_LIST };
}

const getMyWarehouseListSuccess = (data) => {
    return { type: GET_MY_WAREHOUSE_LIST_SUCCESS, payload: data };
}

const getMyWarehouseDetail = (payload) => {
    return { type: GET_MY_WAREHOUSE_DETAIL, payload };
}

const getMyWarehouseDetailSuccess = (data) => {
    return { type: GET_MY_WAREHOUSE_DETAIL_SUCCESS, payload: data };
}

const createProductForWarehouse = (payload) => {
    return { type: CREATE_PRODUCT_FOR_WAREHOUSE, payload };
}

const createProductForWarehouseSuccess = (data) => {
    return { type: CREATE_PRODUCT_FOR_WAREHOUSE_SUCCESS, payload: data };
}

const deleteProductWarehouse = (payload) => {
    return { type: DELETE_PRODUCT_WAREHOUSE, payload };
}

const deleteProductWarehouseSuccess = (data) => {
    return { type: DELETE_PRODUCT_WAREHOUSE_SUCCESS, payload: data };
}

const updateProductWarehouse = (payload) => {
    return { type: UPDATE_PRODUCT_WAREHOUSE, payload };
}

const updateProductWarehouseSuccess = (data) => {
    return { type: UPDATE_PRODUCT_WAREHOUSE_SUCCESS, payload: data };
}

const resetActionSuccess = () => {
    return { type: RESET_ACTION_SUCCESS };
}

const resetMyWarehouseDetail = () => {
    return { type: RESET_MY_WAREHOUSE_DETAIL };
}

export {
    getMyWarehouseList,
    getMyWarehouseListSuccess,
    getMyWarehouseDetail,
    getMyWarehouseDetailSuccess,
    createProductForWarehouse,
    createProductForWarehouseSuccess,
    resetActionSuccess,
    deleteProductWarehouse,
    deleteProductWarehouseSuccess,
    updateProductWarehouse,
    updateProductWarehouseSuccess,
    resetMyWarehouseDetail
}