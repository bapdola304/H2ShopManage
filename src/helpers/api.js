import axios from "axios";
// import cookie from "react-cookies";

export async function fetchJSON(endpoint, method = "GET", body) {
const API_URL = "http://localhost:8080";
  try {
    // const loginData = cookie.load("ADMIN_DATA") || {};
    // const token = loginData.Token;
    let res = await axios({
      method: method,
      url: `${API_URL}/${endpoint}`,
      data: body,
    //   headers: { Authorization: `Bearer ${token}` },
    });
    return res;
  } catch (err) {
    console.error(err);
  }
}