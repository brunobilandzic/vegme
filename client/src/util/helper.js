import { REGULAR } from "../Shared/Constants/Roles";

export const isArrayNullOrEmpty = (array) => {
  if (!array) return true;
  if (array.length === 0) return true;
  return false;
};

export const getRegularId = (getState) => {
  const regularId = getState().auth.user?.roles.find(
    (role) => role.name === REGULAR
  )?.id;
  return regularId;
};

export const buildUrl = (baseUrl, queryObject) => {
  const url = new URL(baseUrl);
  Object.keys(queryObject).forEach((key) => {
    url.searchParams.append(`filter.${key}`, queryObject[key]);
  });

  return url;
};

export const buildUrlWithPagination = (baseUrl, pageNumber, pageSize) => {
  const url = new URL(baseUrl);

  url.searchParams.append("pageNumber", pageNumber);
  url.searchParams.append("pageSize", pageSize);

  return url;
};

export const capitalizeString = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const dayOfWeek = {
  1: "monday",
  2: "tuesday",
  3: "wendesday",
  4: "thursday",
  5: "friday",
  6: "saturday",
  7: "sunday",
};
