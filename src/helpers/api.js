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