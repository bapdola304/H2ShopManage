import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import * as FeatherIcon from 'react-feather';

import { isUserAuthenticated, getLoggedInUser } from '../helpers/authUtils';

// auth
const Login = React.lazy(() => import('../pages/auth/Login'));
// dashboard
const Dashboard = React.lazy(() => import('../pages/dashboard'));

// Items
const Items = React.lazy(() => import('../pages/product/Products'));

// Costs
const CostsIncurred = React.lazy(() => import('../pages/costsIncurred/CostsIncurred'));
const CostsType = React.lazy(() => import('../pages/costsType/CostsType'));

// Warehouse
const Warehouse = React.lazy(() => import('../pages/warehouse/Warehouse'));
const AddGoods = React.lazy(() => import('../pages/warehouse/AddGoods'));

// Sold Items
const SoldItems = React.lazy(() => import('../pages/soldItems/SoldItems'));
const AddSoldItem = React.lazy(() => import('../pages/soldItems/AddSoldItem'));

// Warehouse Manage
const WarehouseManage = React.lazy(() => import('../pages/warehouseManage/WarehouseManage'));



// handle auth and authorization
const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            if (!isUserAuthenticated()) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/account/login', state: { from: props.location } }} />;
            }

            const loggedInUser = getLoggedInUser();
            // check if route is restricted by role
            if (roles && loggedInUser && roles.indexOf(loggedInUser.role) === -1) {
                // role not authorised so redirect to home page
                return <Redirect to={{ pathname: '/' }} />;
            }

            // authorised so return component
            return <Component {...props} />;
        }}
    />
);

// root routes
const rootRoute = {
    path: '/',
    exact: true,
    component: () => <Redirect to="/dashboard" />,
    route: PrivateRoute,
};

// types
const warehouseManageAppRoutes = {
    path: '/apps/manage/warehouse',
    name: 'Danh sách kho hàng',
    icon: FeatherIcon.Home,
    header: "Phân loại",
    component: WarehouseManage,
    route: PrivateRoute,
    roles: ['Admin'],
};

const typeOfItemAppRoutes = {
    path: '/apps/items',
    name: 'Các loại mặt hàng',
    icon: FeatherIcon.Package,
    component: Items,
    route: PrivateRoute,
    roles: ['Admin'],
};

const costsTypeAppRoutes = {
    path: '/apps/costsType',
    name: 'Các loại chi phí',
    icon: FeatherIcon.DollarSign,
    component: CostsType,
    route: PrivateRoute,
    roles: ['Admin'],
};

// management
const dashboardRoutes = {
    path: '/dashboard',
    name: 'Doanh thu',
    icon: FeatherIcon.DollarSign,
    header: 'Quản lý',
    component: Dashboard,
    roles: ['Admin'],
    route: PrivateRoute
};

const costsIncurredAppRoutes = {
    path: '/apps/costsIncurred',
    name: 'Chi phí phát sinh',
    icon: FeatherIcon.Activity,
    component: CostsIncurred,
    route: PrivateRoute,
    roles: ['Admin'],
};

const warehouseAppRoutes = {
    path: '/apps/warehouse',
    name: 'Kho hàng của tôi',
    icon: FeatherIcon.Truck,
    component: Warehouse,
    route: PrivateRoute,
    roles: ['Admin'],
};

const addGoodsAppRoutes = {
    path: '/apps/warehouseAdd',
    name: 'Kho hàng',
    icon: FeatherIcon.Truck,
    component: AddGoods,
    route: PrivateRoute,
    roles: ['Admin'],
};

const editProductOfWarehouseAppRoutes = {
    path: '/apps/warehouseEdit/:id',
    name: 'Cập nhật hàng',
    icon: FeatherIcon.Truck,
    component: AddGoods,
    route: PrivateRoute,
    roles: ['Admin'],
};

const soldItemsAppRoutes = {
    path: '/apps/soldItem',
    name: 'Đã bán',
    icon: FeatherIcon.Users,
    component: SoldItems,
    route: PrivateRoute,
    roles: ['Admin'],
};

const addSoldItemAppRoutes = {
    path: '/apps/soldItemAdd',
    name: 'Đã bán',
    icon: FeatherIcon.Truck,
    component: AddSoldItem,
    route: PrivateRoute,
    roles: ['Admin'],
};

const insuranceAppRoutes = {
    path: '/apps/insurance',
    name: 'Bảo hành',
    icon: FeatherIcon.Layers,
    component: AddSoldItem,
    route: PrivateRoute,
    roles: ['Admin'],
};


// auth
const authRoutes = {
    path: '/account',
    name: 'Auth',
    children: [
        {
            path: '/account/login',
            name: 'Login',
            component: Login,
            route: Route,
        }
    ],
};

// flatten the list of all nested routes
const flattenRoutes = routes => {
    let flatRoutes = [];

    routes = routes || [];
    routes.forEach(item => {
        flatRoutes.push(item);

        if (typeof item.children !== 'undefined') {
            flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
        }
    });
    return flatRoutes;
};

// All routes
const allRoutes = [
    rootRoute,
    // management
    dashboardRoutes,
    warehouseAppRoutes,
    soldItemsAppRoutes,
    costsIncurredAppRoutes,
    insuranceAppRoutes,
    // types
    warehouseManageAppRoutes,
    typeOfItemAppRoutes,
    costsTypeAppRoutes,
    authRoutes,
    addGoodsAppRoutes,
    addSoldItemAppRoutes,
    editProductOfWarehouseAppRoutes,
];

const authProtectedRoutes = [
    // management
    dashboardRoutes,
    warehouseAppRoutes,
    soldItemsAppRoutes,
    costsIncurredAppRoutes,
    insuranceAppRoutes,
    // types
    warehouseManageAppRoutes,
    typeOfItemAppRoutes,
    costsTypeAppRoutes,
];
const allFlattenRoutes = flattenRoutes(allRoutes);
export { allRoutes, authProtectedRoutes, allFlattenRoutes };
