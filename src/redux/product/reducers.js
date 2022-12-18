import produce from 'immer';
import {
    GET_PRODUCTS_SUCCESS,
    CREATE_PRODUCT_SUCCESS,
    RESET_ACTION_SUCCESS,
    DELETE_PRODUCT_SUCCESS
} from './constants';

const INITIAL_STATE = {
    items: [],
    isSuccess: false
};

const product = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_PRODUCTS_SUCCESS:
            return produce(state, draft => {
                draft.items = action.payload.items
            });
        case CREATE_PRODUCT_SUCCESS:
            return produce(state, draft => {
                draft.isSuccess = true
            });
        case DELETE_PRODUCT_SUCCESS:
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
