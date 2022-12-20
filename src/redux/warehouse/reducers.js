import produce from 'immer';
import {
    GET_WAREHOUSE_LIST_SUCCESS,
    CREATE_WAREHOUSE_SUCCESS,
    RESET_ACTION_SUCCESS,
    DELETE_WAREHOUSE_SUCCESS,
    UPDATE_WAREHOUSE_SUCCESS
} from './constants';

const INITIAL_STATE = {
    warehouseList: [],
    isSuccess: false
};

const warehouse = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_WAREHOUSE_LIST_SUCCESS:
            return produce(state, draft => {
                draft.warehouseList = action.payload.items
            });
        case CREATE_WAREHOUSE_SUCCESS:
            return produce(state, draft => {
                draft.isSuccess = true
            });
        case DELETE_WAREHOUSE_SUCCESS:
            return produce(state, draft => {
                draft.isSuccess = true
            });
        case UPDATE_WAREHOUSE_SUCCESS:
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

export default warehouse;
