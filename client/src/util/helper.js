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
    const value = queryObject[key];
    url.searchParams.append(`filter.${key}`, queryObject[key]);
  });

  return url;
};

export const buildUrlWithPagination = (baseUrl, pageNumber, pageSize) => {
    const url = new URL(baseUrl)

    url.searchParams.append("pageNumber",  pageNumber)
    url.searchParams.append("pageSize", pageSize)

    return url
}
