import produce from 'immer';
import {
    GET_PRODUCTS_SUCCESS,
    CREATE_PRODUCT_SUCCESS,
    RESET_ACTION_SUCCESS,
    DELETE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_SUCCESS,
    RESET_PRODUCT_CREATED_DATA
} from './constants';

const INITIAL_STATE = {
    products: [],
    isSuccess: false,
    productCreated: {}
};

const product = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_PRODUCTS_SUCCESS:
            return produce(state, draft => {
                draft.products = action.payload.items
            });
        case CREATE_PRODUCT_SUCCESS:
            return produce(state, draft => {
                draft.isSuccess = true
                draft.productCreated = action.payload.data
            });
        case RESET_PRODUCT_CREATED_DATA:
            return produce(state, draft => {
                draft.productCreated = {}
            });
        case DELETE_PRODUCT_SUCCESS:
            return produce(state, draft => {
                draft.isSuccess = true
            });
        case UPDATE_PRODUCT_SUCCESS:
            return produce(state, draft => {
                draft.isSuccess = true
            });
        case RESET_ACTION_SUCCESS:
            return produce(state, draft => {
                draft.isSuccess = false
            });

        default:
            return state;
    }
}

export default product;
