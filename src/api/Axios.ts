import Cookies from "universal-cookie";
import { HOST } from "./api";
import axios from "axios";
export const Axios = axios.create({
  baseURL: HOST,
  withCredentials: true,
});
