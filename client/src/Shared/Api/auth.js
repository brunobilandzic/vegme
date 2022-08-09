import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_ROOT_URL + "/auth",
});


export const loadUserFromServer = async () => {
  let response = await axiosInstance.get("/getuser");

  return response?.data;
};


export const logoutUserFromServer = async () => {
  const response = await axiosInstance.get("/logout");
};
