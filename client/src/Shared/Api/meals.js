import axios from "axios";

export const loadPaginatedMealsFromServer = async (
  pageNumber = 1,
  pageSize = 5
) => {
  const response = await axios.get(process.env.REACT_APP_ROOT_URL + "meals", {
    withCredentials: true,
  });
  return response.data;
};
