import axios from "axios";
import { handleLoading } from "../redux/actions";
import store from '../redux/store';
// import cookie from "react-cookies";

export async function fetchJSON(endpoint, method = "GET", body) {
const API_URL = "http://localhost:8080";
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
  }
}