import React from "react";
import { Spinner } from 'reactstrap';

const SpinnerComponent = () => {
    return (
        <div className="preloader">
            <div className="status">
                <Spinner className="m-2" color="primary" />
            </div>
        </div>
    );
};

export default SpinnerComponent;
