import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

/**
 * Renders the PageTitle
 */
const PageTitle = (props) => {
    const title = props.title || "";
    return (
        <React.Fragment>
            <h3 className="mb-1 mt-0">{title}</h3>
        </React.Fragment>
    )
}

export default PageTitle;