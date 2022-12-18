import produce from 'immer';
import {
    GET_PRODUCTS_SUCCESS
} from './constants';

const INITIAL_STATE = {
    items: [],
};

const product = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_PRODUCTS_SUCCESS:
            return produce(state, draft => {
                draft.items = action.payload.items
            });

        default:
            return state;
    }
}

export default product;
