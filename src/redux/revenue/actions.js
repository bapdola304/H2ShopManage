import {
    GET_REVENUE,
    GET_REVENUE_SUCCESS,
} from './constants';

const getRevenue = () => {
    return { type: GET_REVENUE };
}

const getRevenueSuccess = (data) => {
    return { type: GET_REVENUE_SUCCESS, payload: data };
}

export {
    getRevenue,
    getRevenueSuccess,
}