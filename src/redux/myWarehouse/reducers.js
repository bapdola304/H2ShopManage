import produce from 'immer';
import {
    CREATE_PRODUCT_FOR_WAREHOUSE_SUCCESS,
    RESET_ACTION_SUCCESS,
    GET_MY_WAREHOUSE_LIST_SUCCESS,
    GET_MY_WAREHOUSE_DETAIL_SUCCESS,
    DELETE_PRODUCT_WAREHOUSE_SUCCESS,
    UPDATE_PRODUCT_WAREHOUSE_SUCCESS,
    RESET_MY_WAREHOUSE_DETAIL
} from './constants';

const INITIAL_STATE = {
    myWarehouseList: [],
    productOfWarehouse: {},
    isSuccess: false
};

const warehouse = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_MY_WAREHOUSE_LIST_SUCCESS:
            return produce(state, draft => {
                draft.myWarehouseList = action.payload.items
            });
        case GET_MY_WAREHOUSE_DETAIL_SUCCESS:
            return produce(state, draft => {
                draft.productOfWarehouse = action.payload.data
            });
        case CREATE_PRODUCT_FOR_WAREHOUSE_SUCCESS:
            return produce(state, draft => {
                draft.isSuccess = true
            });
        case DELETE_PRODUCT_WAREHOUSE_SUCCESS:
            return produce(state, draft => {
                draft.isSuccess = true
            });
        case UPDATE_PRODUCT_WAREHOUSE_SUCCESS:
            return produce(state, draft => {
                draft.isSuccess = true
            });
        case RESET_ACTION_SUCCESS:
            return produce(state, draft => {
                draft.isSuccess = false
            });
        case RESET_MY_WAREHOUSE_DETAIL:
            return produce(state, draft => {
                draft.productOfWarehouse = {}
            });


        default:
            return state;
    }
}

export default warehouse;
