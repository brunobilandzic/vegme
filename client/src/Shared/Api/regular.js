import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_ROOT_URL + "/regulars",
});

export const getFavourites = async (username) => {
  const response = await axiosInstance.get(`/favourites/${username}`);
  return response.data;
};
