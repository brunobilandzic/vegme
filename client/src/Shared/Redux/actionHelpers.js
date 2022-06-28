import { needAnotherPage } from "../Api/general";
import { ADD_ON_END_MEAL, ADD_ON_END_ORDER, MAKE_NEW_PAGE_MEAL, MAKE_NEW_PAGE_ORDER, UPDATE_TOTAL_PAGES } from "./types";

export const needNewPageMeal = async (items, pageSize) => {
  if(typeof(items) == "undefined") {
    if (await needAnotherPage(process.env.REACT_APP_ROOT_URL + `meals/neednew/${pageSize}`))
      return  UPDATE_TOTAL_PAGES
    return
  }
  const mealsCount = items.length;
  if (mealsCount % pageSize === 0) return  MAKE_NEW_PAGE_MEAL;
  else return ADD_ON_END_MEAL;
};

export const needNewPageOrder =async (items, pageSize) => {
  if(typeof(items) == "undefined") {
    if (await needAnotherPage(process.env.REACT_APP_ROOT_URL + `orders/neednew/${pageSize}`))
      return  UPDATE_TOTAL_PAGES
    return
  }
    const ordersCount = items.length;
    if (ordersCount % pageSize === 0) return  MAKE_NEW_PAGE_ORDER;
    else return ADD_ON_END_ORDER;
  };
