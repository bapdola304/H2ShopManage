import produce from 'immer';
import {
    RESET_ACTION_SUCCESS,
    GET_PRODUCT_SOLD_LIST_SUCCESS,
    RESET_PRODUCT_SOLD_DETAIL,
    CREATE_PRODUCT_SOLD_SUCCESS,
    GET_PRODUCT_SOLD_DETAIL_SUCCESS,
    UPDATE_PRODUCT_SOLD_SUCCESS,
    DELETE_PRODUCT_SOLD_SUCCESS
} from './constants';

const INITIAL_STATE = {
    productSoldList: [],
    productSold: {},
    isSuccess: false
};

const warehouse = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_PRODUCT_SOLD_LIST_SUCCESS:
            return produce(state, draft => {
                draft.productSoldList = action.payload.items
            });
        case GET_PRODUCT_SOLD_DETAIL_SUCCESS:
            return produce(state, draft => {
                draft.productSold = action.payload.data
            });
        case CREATE_PRODUCT_SOLD_SUCCESS:
            return produce(state, draft => {
                draft.isSuccess = true
            });
        case DELETE_PRODUCT_SOLD_SUCCESS:
            return produce(state, draft => {
                draft.isSuccess = true
            });
        case UPDATE_PRODUCT_SOLD_SUCCESS:
            return produce(state, draft => {
                draft.isSuccess = true
            });
        case RESET_ACTION_SUCCESS:
            return produce(state, draft => {
                draft.isSuccess = false
            });
        case RESET_PRODUCT_SOLD_DETAIL:
            return produce(state, draft => {
                draft.productSold = {}
            });


        default:
            return state;
    }
}

export default warehouse;
