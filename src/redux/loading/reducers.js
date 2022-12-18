import produce from 'immer';
import {
    LOADING_SUCCESS
} from './constants';

const INITIAL_STATE = {
    isLoading: false,
};

const loading = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOADING_SUCCESS:
            return produce(state, draft => {
                draft.isLoading = action.payload.isLoading
            });

        default:
            return state;
    }
}

export default loading;
