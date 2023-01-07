import {
    GET_REVENUE,
    GET_REVENUE_SUCCESS,
} from './constants';

const getRevenue = (payload) => {
    return { type: GET_REVENUE, payload };
}

const getRevenueSuccess = (data) => {
    return { type: GET_REVENUE_SUCCESS, payload: data };
}

export {
    getRevenue,
    getRevenueSuccess,
}