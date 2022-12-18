import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// layout HOC
import withLayout from '../components/Layout';
import { allFlattenRoutes as routes } from './index';
const Error404 = React.lazy(() => import('../pages/other/Error404'));


const Routes = () => (
    // rendering the router with layout
    <Suspense fallback={<div></div>}>
        <BrowserRouter>
            <Switch>
                {routes.map((route, index) => {
                    return (
                        !route.children && (
                            <route.route
                                key={index}
                                path={route.path}
                                roles={route.roles}
                                exact={route.exact}
                                component={withLayout(props => {
                                    return <route.component {...props} />;
                                })}></route.route>
                        )
                    );
                })}
                <Route path='*'>
                    <Error404 />
                </Route>
            </Switch>
        </BrowserRouter>
    </Suspense>
);

export default Routes;
