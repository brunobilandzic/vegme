import axios from "axios";

export const createOrder = async (order) => {
  const response = await axios.post(
    process.env.REACT_APP_ROOT_URL + "orders",
    order,
    { withCredentials: true }
  );
  return response.data;
};
