import axios from "axios";
const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_ROOT_URL,
});


export const loadSingleCook = async (username) => {
  const response = await axiosInstance.get(`cooks/one/${username}`);
  return response.data;
};


export const loadAllCooksFromServer = async () => {
  const response = await axiosInstance.get("/cooks/roles");
  return response.data;
};

