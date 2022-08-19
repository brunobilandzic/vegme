import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_ROOT_URL + "/alerts",
});

export const loadAllAlertsFromServer = async () => {
  const response = await axiosInstance.get("");
  return response.data;
};
