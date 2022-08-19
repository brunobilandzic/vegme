import axios from "axios";
import { buildUrlWithPagination } from "../../util/helper";

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_ROOT_URL + "/alerts",
});

export const loadAllPaginatedAlerts = async (pageNumber, pageSize) => {
  const urlWithPagination = buildUrlWithPagination(
    process.env.REACT_APP_ROOT_URL + "/alerts/paginated",
    pageNumber,
    pageSize
  );
  const response = await axios.get(urlWithPagination.href, {
    withCredentials: true,
  });
  return response.data;
};
