import {
    GET_PRODUCTS,
    GET_PRODUCTS_SUCCESS
} from './constants';

const getProducts = () => {
    return { type: GET_PRODUCTS };
}

const getProductsSuccess = (data) => {
    return { type: GET_PRODUCTS_SUCCESS, payload: data };
}

export {
    getProducts,
    getProductsSuccess
}