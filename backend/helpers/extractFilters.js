const extractFiltersFromQuery = (queryObject, aditionalObject) => {
  const filtersObject = {};
  for (let key in queryObject) {
    if (!key.startsWith("filter")) continue;
    const filterKey = key.substring(7);
    filtersObject[filterKey] = queryObject[key];
  }

  return {...filtersObject, ...aditionalObject};
};

module.exports = { extractFiltersFromQuery };
