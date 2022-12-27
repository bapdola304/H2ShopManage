import {
    RESET_ACTION_SUCCESS,
    CREATE_COST_INCURRED,
    CREATE_COST_INCURRED_SUCCESS,
    GET_COST_INCURRED,
    GET_COST_INCURRED_SUCCESS,
    DELETE_COST_INCURRED,
    DELETE_COST_INCURRED_SUCCESS,
    UPDATE_COST_INCURRED,
    UPDATE_COST_INCURRED_SUCCESS
} from './constants';

const getCostIncurred = () => {
    return { type: GET_COST_INCURRED };
}

const getCostIncurredSuccess = (data) => {
    return { type: GET_COST_INCURRED_SUCCESS, payload: data };
}

const createCostIncurred = (payload) => {
    return { type: CREATE_COST_INCURRED, payload };
}

const createCostIncurredSuccess = (data) => {
    return { type: CREATE_COST_INCURRED_SUCCESS, payload: data };
}

const deleteCostIncurred = (payload) => {
    return { type: DELETE_COST_INCURRED, payload };
}

const deleteCostIncurredSuccess = (data) => {
    return { type: DELETE_COST_INCURRED_SUCCESS, payload: data };
}

const updateCostIncurred = (payload) => {
    return { type: UPDATE_COST_INCURRED, payload };
}

const updateCostIncurredSuccess = (data) => {
    return { type: UPDATE_COST_INCURRED_SUCCESS, payload: data };
}

const resetActionSuccess = () => {
    return { type: RESET_ACTION_SUCCESS };
}

export {
    getCostIncurred,
    getCostIncurredSuccess,
    createCostIncurred,
    createCostIncurredSuccess,
    resetActionSuccess,
    deleteCostIncurred,
    deleteCostIncurredSuccess,
    updateCostIncurred,
    updateCostIncurredSuccess
}