import {
    CREATE_PRODUCT_SUCCESS,
    GET_PRODUCTS,
    GET_PRODUCTS_SUCCESS,
    CREATE_PRODUCT,
    RESET_ACTION_SUCCESS,
    DELETE_PRODUCT,
    DELETE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT,
    UPDATE_PRODUCT_SUCCESS
} from './constants';

const getProducts = () => {
    return { type: GET_PRODUCTS };
}

const getProductsSuccess = (data) => {
    return { type: GET_PRODUCTS_SUCCESS, payload: data };
}

const createProduct = (payload) => {
    return { type: CREATE_PRODUCT, payload };
}

const createProductSuccess = (data) => {
    return { type: CREATE_PRODUCT_SUCCESS, payload: data };
}

const deleteProduct = (payload) => {
    return { type: DELETE_PRODUCT, payload };
}

const deleteProductSuccess = (data) => {
    return { type: DELETE_PRODUCT_SUCCESS, payload: data };
}

const updateProduct = (payload) => {
    return { type: UPDATE_PRODUCT, payload };
}

const updateProductSuccess = (data) => {
    return { type: UPDATE_PRODUCT_SUCCESS, payload: data };
}

const resetActionSuccess = () => {
    return { type: RESET_ACTION_SUCCESS };
}

export {
    getProducts,
    getProductsSuccess,
    createProduct,
    createProductSuccess,
    resetActionSuccess,
    deleteProduct,
    deleteProductSuccess,
    updateProduct,
    updateProductSuccess
}