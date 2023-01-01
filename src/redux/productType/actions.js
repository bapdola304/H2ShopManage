import {
    CREATE_PRODUCT_TYPE_SUCCESS,
    GET_PRODUCTS_TYPE,
    GET_PRODUCTS_TYPE_SUCCESS,
    CREATE_PRODUCT_TYPE,
    RESET_ACTION_SUCCESS,
    DELETE_PRODUCT_TYPE,
    DELETE_PRODUCT_TYPE_SUCCESS,
    UPDATE_PRODUCT_TYPE,
    UPDATE_PRODUCT_TYPE_SUCCESS
} from './constants';

const getProductsType = () => {
    return { type: GET_PRODUCTS_TYPE };
}

const getProductsTypeSuccess = (data) => {
    return { type: GET_PRODUCTS_TYPE_SUCCESS, payload: data };
}

const createProductType = (payload) => {
    return { type: CREATE_PRODUCT_TYPE, payload };
}

const createProductTypeSuccess = (data) => {
    return { type: CREATE_PRODUCT_TYPE_SUCCESS, payload: data };
}

const deleteProductType = (payload) => {
    return { type: DELETE_PRODUCT_TYPE, payload };
}

const deleteProductTypeSuccess = (data) => {
    return { type: DELETE_PRODUCT_TYPE_SUCCESS, payload: data };
}

const updateProductType = (payload) => {
    return { type: UPDATE_PRODUCT_TYPE, payload };
}

const updateProductTypeSuccess = (data) => {
    return { type: UPDATE_PRODUCT_TYPE_SUCCESS, payload: data };
}

const resetActionSuccess = () => {
    return { type: RESET_ACTION_SUCCESS };
}

export {
    getProductsType,
    getProductsTypeSuccess,
    createProductType,
    createProductTypeSuccess,
    resetActionSuccess,
    deleteProductType,
    deleteProductTypeSuccess,
    updateProductType,
    updateProductTypeSuccess
}