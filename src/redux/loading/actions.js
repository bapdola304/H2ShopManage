import {
    LOADING,
    LOADING_SUCCESS
} from './constants';

const handleLoading = (isLoading) => {
    return { type: LOADING, isLoading };
}

const handleLoadingSuccess = (isLoading) => {
    return { type: LOADING_SUCCESS, payload: isLoading };
}

export {
    handleLoading,
    handleLoadingSuccess
}