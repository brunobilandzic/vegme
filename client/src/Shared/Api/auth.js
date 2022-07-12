import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_ROOT_URL,
});


export const loadUserFromServer = async () => {
  let response = await axiosInstance.get("/auth/getuser");

  return response?.data;
};


export const logoutUserFromServer = async () => {
  const response = await axiosInstance.get("/auth/logout");
};
