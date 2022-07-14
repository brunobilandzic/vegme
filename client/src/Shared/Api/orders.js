import axios from "axios";
import { buildUrl, buildUrlWithPagination } from "../../util/helper";
const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_ROOT_URL,
});

export const createOrder = async (order) => {
  const response = await axiosInstance.post("/orders", order);
  return response.data;
};

export const loadPaginatedOrdersForUserFromServer = async (
  pageNumber = 1,
  pageSize = 5
) => {
  const urlWithPagination = buildUrlWithPagination(
    process.env.REACT_APP_ROOT_URL + "/orders/my",
    pageNumber,
    pageSize
  );
  const response = await axios.get(urlWithPagination.href, {
    withCredentials: true,
  });
  return response.data;
};

export const loadAllPersonalrOrders = async () => {
  const response = await axiosInstance.get("/orders/personal");
  return response.data;
};
