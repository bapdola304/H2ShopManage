import {
    RESET_ACTION_SUCCESS,
    CREATE_COST_TYPE,
    CREATE_COST_TYPE_SUCCESS,
    GET_COST_TYPE,
    GET_COST_TYPE_SUCCESS,
    DELETE_COST_TYPE,
    DELETE_COST_TYPE_SUCCESS,
    UPDATE_COST_TYPE,
    UPDATE_COST_TYPE_SUCCESS
} from './constants';

const getCostsType = () => {
    return { type: GET_COST_TYPE };
}

const getCostsTypeSuccess = (data) => {
    return { type: GET_COST_TYPE_SUCCESS, payload: data };
}

const createCostType = (payload) => {
    return { type: CREATE_COST_TYPE, payload };
}

const createCostTypeSuccess = (data) => {
    return { type: CREATE_COST_TYPE_SUCCESS, payload: data };
}

const deleteCostType = (payload) => {
    return { type: DELETE_COST_TYPE, payload };
}

const deleteCostTypeSuccess = (data) => {
    return { type: DELETE_COST_TYPE_SUCCESS, payload: data };
}

const updateCostType = (payload) => {
    return { type: UPDATE_COST_TYPE, payload };
}

const updateCostTypeSuccess = (data) => {
    return { type: UPDATE_COST_TYPE_SUCCESS, payload: data };
}

const resetActionSuccess = () => {
    return { type: RESET_ACTION_SUCCESS };
}

export {
    getCostsType,
    getCostsTypeSuccess,
    createCostType,
    createCostTypeSuccess,
    resetActionSuccess,
    deleteCostType,
    deleteCostTypeSuccess,
    updateCostType,
    updateCostTypeSuccess
}