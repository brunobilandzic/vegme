const extractFiltersFromQuery = (queryObject) => {
    const filtersObject = {}
    for(let key in queryObject) {
        if(!key.startsWith("filter")) continue
        const filterKey = key.substring(7)
        filtersObject[filterKey] = queryObject[key] 
    }

    return filtersObject
}

module.exports = {extractFiltersFromQuery}