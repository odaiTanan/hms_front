import Cookies from "universal-cookie";
import { HOST } from "./api";
import axios from "axios";
const cookie = new Cookies();
const token = cookie.get("bearer");
export const Axios = axios.create({
  baseURL: HOST,
  headers: {
    Authorization: `${token}`,
  },
  withCredentials: true,
});
