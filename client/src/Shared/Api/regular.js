import axios from "axios";
import { buildUrlWithPagination } from "../../util/helper";

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_ROOT_URL + "/regulars",
});

export const getFavourites = async (username, pageNumber = 1, pageSize = 5) => {
  const urlWithPagination = buildUrlWithPagination(
    `${process.env.REACT_APP_ROOT_URL}/regulars/favourites/${username}`,
    pageNumber,
    pageSize
  );
  const response = await axios.get(urlWithPagination.href, {
    withCredentials: true,
  });
  return response.data;
};
