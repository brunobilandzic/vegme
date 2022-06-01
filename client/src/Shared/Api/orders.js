import axios from "axios";
import { buildUrl, buildUrlWithPagination } from "../../util/helper";

export const createOrder = async (order) => {
  const response = await axios.post(
    process.env.REACT_APP_ROOT_URL + "orders",
    order,
    { withCredentials: true }
  );
  return response.data;
};

export const loadPaginatedOrdersForUserFromServer = async (
  pageNumber = 1,
  pageSize = 5
) => {
  const urlWithPagination = buildUrlWithPagination(process.env.REACT_APP_ROOT_URL + "orders/my", pageNumber, pageSize);
  const response = await axios.get(urlWithPagination.href, {
    withCredentials: true,
  });
  return response.data;
};
