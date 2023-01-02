import axios from "axios";
import { handleLoading } from "../redux/actions";
import store from '../redux/store';
import { toast } from "react-toastify";
// import cookie from "react-cookies";

export async function fetchJSON(endpoint, method = "GET", body) {
const API_URL = "https://h2shop.onrender.com";
  try {
    // const loginData = cookie.load("ADMIN_DATA") || {};
    // const token = loginData.Token;
    store.dispatch(handleLoading(true));
    const res = await axios({
      method: method,
      url: `${API_URL}/${endpoint}`,
      data: body,
    //   headers: { Authorization: `Bearer ${token}` },
    });
    store.dispatch(handleLoading(false));
    return res;
  } catch (err) {
    store.dispatch(handleLoading(false));
    console.error(err);
    toast.error('Xảy ra lỗi hệ thống: ' + err);
    return {}
  }
}

const handleGetApiPath = (route, params) => {
  return handleGetPath(route, params, {});
}

/**
* pathsCollection: URL or API. See core/common/app.routes.js for details
*/
const getPathTemplate = (route, pathsCollection) => {
  if (route.parent) {
      let path = getPathTemplate(pathsCollection[route.parent], pathsCollection) + '/' + route.path;
      return path;
  }
  return route.path;
}

const handleGetPath = (route, params, pathsCollection) => {
  let path = getPathTemplate(route, pathsCollection);
  let queryArray = [];
  let routeParams = [];

  const rParams = path.match(/:\w+/g);
  if (rParams) {
      rParams.forEach(function (param) {
          routeParams.push(param.substring(1));
      });
  }

  if (params) {
      Object.keys(params).forEach(function (key) {
          if (routeParams.indexOf(key) > -1) {
              path = path.replace(':' + key, params[key]);
          } else if (params[key] !== null && params[key] !== undefined) {
              queryArray.push(key + '=' + params[key]);
          }
      });
      path += (queryArray.length ? '?' + queryArray.join('&') : '');
  }
  return path;
}

export {
  handleGetApiPath
}