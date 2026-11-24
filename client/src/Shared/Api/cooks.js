import axios from "axios";
import { getDemoCooks, isStaticDemo } from "../../Demo/catalog";
const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_ROOT_URL + "/cooks",
});

export const loadSingleCookByUsername = async (username) => {
  if (isStaticDemo) return getDemoCooks().find((cook) => cook.user.username === username) ?? null;

  const response = await axiosInstance.get(`/one/${username}`);
  return response.data;
};

export const loadSingleCookById = async (cookId) => {
  if (isStaticDemo) return getDemoCooks().find((cook) => cook._id === cookId) ?? null;

  const response = await axiosInstance.get(`single/${cookId}`);
  return response.data;
};

export const loadAllCooksFromServer = async () => {
  if (isStaticDemo) return getDemoCooks();

  const response = await axiosInstance.get("/roles");
  return response.data;
};
