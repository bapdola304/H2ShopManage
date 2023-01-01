import produce from 'immer';
import {
    GET_PRODUCTS_TYPE_SUCCESS,
    CREATE_PRODUCT_TYPE_SUCCESS,
    RESET_ACTION_SUCCESS,
    DELETE_PRODUCT_TYPE_SUCCESS,
    UPDATE_PRODUCT_TYPE_SUCCESS
} from './constants';

const INITIAL_STATE = {
    items: [],
    isSuccess: false
};

const product = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_PRODUCTS_TYPE_SUCCESS:
            return produce(state, draft => {
                draft.items = action.payload.items
            });
        case CREATE_PRODUCT_TYPE_SUCCESS:
            return produce(state, draft => {
                draft.isSuccess = true
            });
        case DELETE_PRODUCT_TYPE_SUCCESS:
            return produce(state, draft => {
                draft.isSuccess = true
            });
        case UPDATE_PRODUCT_TYPE_SUCCESS:
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
