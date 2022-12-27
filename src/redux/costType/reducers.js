import produce from 'immer';
import {
    RESET_ACTION_SUCCESS,
    CREATE_COST_TYPE_SUCCESS,
    GET_COST_TYPE_SUCCESS,
    DELETE_COST_TYPE_SUCCESS,
    UPDATE_COST_TYPE_SUCCESS
} from './constants';

const INITIAL_STATE = {
    costTypeList: [],
    isSuccess: false
};

const product = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_COST_TYPE_SUCCESS:
            return produce(state, draft => {
                draft.costTypeList = action.payload.items
            });
        case CREATE_COST_TYPE_SUCCESS:
            return produce(state, draft => {
                draft.isSuccess = true
            });
        case DELETE_COST_TYPE_SUCCESS:
            return produce(state, draft => {
                draft.isSuccess = true
            });
        case UPDATE_COST_TYPE_SUCCESS:
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
