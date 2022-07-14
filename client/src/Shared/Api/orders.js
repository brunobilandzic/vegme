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

export const loadAllPersonalOrders = async (cookId) => {
  const url = new URL(process.env.REACT_APP_ROOT_URL + "/orders/personal");
  url.searchParams.append("cookId", cookId);
  const response = await axios.get(url.href, { withCredentials: true });
  return response.data;
};
