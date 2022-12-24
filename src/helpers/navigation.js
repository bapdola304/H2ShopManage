import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const redirectTo = (targetRoute) => {
    history.replace(targetRoute);
}

const goBack = () => {
    history.back()
}

export {
    history,
    redirectTo,
    goBack
}