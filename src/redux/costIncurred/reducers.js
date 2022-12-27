import produce from 'immer';
import {
    RESET_ACTION_SUCCESS,
    CREATE_COST_INCURRED_SUCCESS,
    GET_COST_INCURRED_SUCCESS,
    DELETE_COST_INCURRED_SUCCESS,
    UPDATE_COST_INCURRED_SUCCESS
} from './constants';

const INITIAL_STATE = {
    costIncurredList: [],
    isSuccess: false
};

const costIncurred = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_COST_INCURRED_SUCCESS:
            return produce(state, draft => {
                draft.costIncurredList = action.payload.items
            });
        case CREATE_COST_INCURRED_SUCCESS:
            return produce(state, draft => {
                draft.isSuccess = true
            });
        case DELETE_COST_INCURRED_SUCCESS:
            return produce(state, draft => {
                draft.isSuccess = true
            });
        case UPDATE_COST_INCURRED_SUCCESS:
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

export default costIncurred;
