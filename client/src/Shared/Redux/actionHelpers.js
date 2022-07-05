import { needAnotherPage } from "../Api/general";
import { UPDATE_TOTAL_PAGES } from "./types";

export const needNewPageMeal = async (pageSize) => {
  return await needAnotherPage(
    process.env.REACT_APP_ROOT_URL + `meals/neednew/${pageSize}`
  );
};

export const needNewPageOrder = async (pageSize) => {
  return await needAnotherPage(
    process.env.REACT_APP_ROOT_URL + `orders/neednew/${pageSize}`
  );
};
