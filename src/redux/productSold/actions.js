import {
    CREATE_PRODUCT_SOLD,
    CREATE_PRODUCT_SOLD_SUCCESS,
    RESET_ACTION_SUCCESS,
    RESET_PRODUCT_SOLD_DETAIL,
    GET_PRODUCT_SOLD_LIST,
    GET_PRODUCT_SOLD_LIST_SUCCESS,
    GET_PRODUCT_SOLD_DETAIL,
    GET_PRODUCT_SOLD_DETAIL_SUCCESS,
    UPDATE_PRODUCT_SOLD,
    UPDATE_PRODUCT_SOLD_SUCCESS,
    DELETE_PRODUCT_SOLD,
    DELETE_PRODUCT_SOLD_SUCCESS
} from './constants';

const getProductSoldList = () => {
    return { type: GET_PRODUCT_SOLD_LIST };
}

const getProductSoldListSuccess = (data) => {
    return { type: GET_PRODUCT_SOLD_LIST_SUCCESS, payload: data };
}

const getProductSoldDetail = (payload) => {
    return { type: GET_PRODUCT_SOLD_DETAIL, payload };
}

const getProductSoldDetailSuccess = (data) => {
    return { type: GET_PRODUCT_SOLD_DETAIL_SUCCESS, payload: data };
}

const createProductSold = (payload) => {
    return { type: CREATE_PRODUCT_SOLD, payload };
}

const createProductSoldSuccess = (data) => {
    return { type: CREATE_PRODUCT_SOLD_SUCCESS, payload: data };
}

const deleteProductSold = (payload) => {
    return { type: DELETE_PRODUCT_SOLD, payload };
}

const deleteProductSoldSuccess = (data) => {
    return { type: DELETE_PRODUCT_SOLD_SUCCESS, payload: data };
}

const updateProductSold = (payload) => {
    return { type: UPDATE_PRODUCT_SOLD, payload };
}

const updateProductSoldSuccess = (data) => {
    return { type: UPDATE_PRODUCT_SOLD_SUCCESS, payload: data };
}

const resetActionSuccess = () => {
    return { type: RESET_ACTION_SUCCESS };
}

const resetProductSoldDetail= () => {
    return { type: RESET_PRODUCT_SOLD_DETAIL };
}

export {
    getProductSoldList,
    getProductSoldListSuccess,
    getProductSoldDetail,
    getProductSoldDetailSuccess,
    createProductSold,
    createProductSoldSuccess,
    resetActionSuccess,
    deleteProductSold,
    deleteProductSoldSuccess,
    updateProductSold,
    updateProductSoldSuccess,
    resetProductSoldDetail
}