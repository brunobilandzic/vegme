import axios from "axios";
import { buildUrl, buildUrlWithPagination } from "../../util/helper";
const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_ROOT_URL + "/orders",
});

export const createOrder = async (order) => {
  const response = await axiosInstance.post("", order);
  return response.data;
};

export const fetchOrderFromServer = async (orderId) => {
  const response = await axiosInstance.get(`/single/${orderId}`);
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

export const loadAllPersonalOrders = async (cookId, mealIds) => {
  const url = new URL(process.env.REACT_APP_ROOT_URL + "/orders/personal");
  url.searchParams.append("cookId", cookId);
  url.searchParams.append("mealIds", mealIds);

  const response = await axios.get(url.href, { withCredentials: true });
  return response.data;
};

export const appendMealsToOrder = async (orderId, mealIds) => {
  await axiosInstance.post("/append", { orderId, mealIds });
};

export const removeMealFromOrder = async (orderId, mealId) => {
  await axios.delete(process.env.REACT_APP_ROOT_URL + "/orders/remove", {
    data: { orderId, mealId },
    withCredentials: true,
  });
};
