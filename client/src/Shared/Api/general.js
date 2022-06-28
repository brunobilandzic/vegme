import axios from "axios";

export const needAnotherPage = async (url) => {
  const response = await axios.get(url, {withCredentials :true});
  return response.data;
};
