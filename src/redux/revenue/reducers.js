import produce from 'immer';
import {
    GET_REVENUE_SUCCESS,
} from './constants';

const INITIAL_STATE = {
    revenueData: {},
};

const revenue = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_REVENUE_SUCCESS:
            return produce(state, draft => {
                draft.revenueData = action.payload.data
            });

        default:
            return state;
    }
}

export default revenue;
