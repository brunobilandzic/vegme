import axios from "axios";
const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_ROOT_URL + "/cooks",
});

export const loadSingleCookByUsername = async (username) => {
  const response = await axiosInstance.get(`/one/${username}`);
  return response.data;
};

export const loadSingleCookById = async (cookId) => {
  const response = await axiosInstance.get(`single/${cookId}`);
  return response.data;
};

export const loadAllCooksFromServer = async () => {
  const response = await axiosInstance.get("/roles");
  return response.data;
};
