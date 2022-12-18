import React from "react";
import { useSelector } from 'react-redux';
import PreLoaderWidget from "./Loader";

const SpinnerComponent = () => {
    const { isLoading } = useSelector(state => state.loading);
    return (
        isLoading && (
            <PreLoaderWidget />
        )
    );
};

export default SpinnerComponent;
