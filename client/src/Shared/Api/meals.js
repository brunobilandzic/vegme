import axios from "axios";
import { buildUrlWithPagination } from "../../util/helper";

export const loadPaginatedMealsFromServer = async (
  pageNumber = 1,
  pageSize = 5
) => {
  const urlWithPagination = buildUrlWithPagination(process.env.REACT_APP_ROOT_URL + "meals", pageNumber, pageSize);
  const response = await axios.get(urlWithPagination.href, {
    withCredentials: true,
  });
  return response.data;
};
