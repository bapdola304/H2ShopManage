import {
    GET_WAREHOUSE_LIST,
    GET_WAREHOUSE_LIST_SUCCESS,
    CREATE_WAREHOUSE,
    CREATE_WAREHOUSE_SUCCESS,
    RESET_ACTION_SUCCESS,
    DELETE_WAREHOUSE,
    DELETE_WAREHOUSE_SUCCESS,
    UPDATE_WAREHOUSE,
    UPDATE_WAREHOUSE_SUCCESS
} from './constants';

const getWarehouseList = () => {
    return { type: GET_WAREHOUSE_LIST };
}

const getWarehouseListSuccess = (data) => {
    return { type: GET_WAREHOUSE_LIST_SUCCESS, payload: data };
}

const createWarehouse = (payload) => {
    return { type: CREATE_WAREHOUSE, payload };
}

const createWarehouseSuccess = (data) => {
    return { type: CREATE_WAREHOUSE_SUCCESS, payload: data };
}

const deleteWarehouse = (payload) => {
    return { type: DELETE_WAREHOUSE, payload };
}

const deleteWarehouseSuccess = (data) => {
    return { type: DELETE_WAREHOUSE_SUCCESS, payload: data };
}

const updateWarehouse = (payload) => {
    return { type: UPDATE_WAREHOUSE, payload };
}

const updateWarehouseSuccess = (data) => {
    return { type: UPDATE_WAREHOUSE_SUCCESS, payload: data };
}

const resetActionSuccess = () => {
    return { type: RESET_ACTION_SUCCESS };
}

export {
    getWarehouseList,
    getWarehouseListSuccess,
    createWarehouse,
    createWarehouseSuccess,
    resetActionSuccess,
    deleteWarehouse,
    deleteWarehouseSuccess,
    updateWarehouse,
    updateWarehouseSuccess
}