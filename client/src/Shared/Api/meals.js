import axios from "axios";
import { buildUrlWithPagination } from "../../util/helper";

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_ROOT_URL + "/meals",
});

export const loadPaginatedMealsFromServer = async (
  pageNumber = 1,
  pageSize = 5
) => {
  const urlWithPagination = buildUrlWithPagination(
    process.env.REACT_APP_ROOT_URL + "/meals",
    pageNumber,
    pageSize
  );
  const response = await axios.get(urlWithPagination.href, {
    withCredentials: true,
  });
  return response.data;
};

export const createMeal = async (meal) => {
  const response = await axiosInstance.post("/", meal);
  return response.data;
};

export const loadMealsWithOrders = async (pageNumber = 1, pageSize = 5) => {
  const urlWithPagination = buildUrlWithPagination(
    process.env.REACT_APP_ROOT_URL + "/cooks/meals",
    pageNumber,
    pageSize
  );
  const response = await axios.get(urlWithPagination.href, {
    withCredentials: true,
  });
  return response.data;
};

export const loadPaginatedSpecialMealsFromServer = async (
  pageNumber = 1,
  pageSize = 5
) => {
  const urlWithPagination = buildUrlWithPagination(
    process.env.REACT_APP_ROOT_URL + "/meals/special",
    pageNumber,
    pageSize
  );
  const response = await axios.get(urlWithPagination.href, {
    withCredentials: true,
  });
  return response.data;
};

export const getMealById = async (mealId) => {
  const response = await axiosInstance.get(`/single/${mealId}`);
  return response.data;
};
