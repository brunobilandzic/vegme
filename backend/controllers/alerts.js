const { extractFiltersFromQuery } = require("../helpers/extractFilters");
const { Alert } = require("../models/alert");
const url = require("url");
const { PaginatedList } = require("../helpers/pagination");

const getAllPaginatedAlerts = async (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  const alertsWithPaginaton = await PaginatedList.getPaginatedResult(
    Alert.find(extractFiltersFromQuery(queryObject, { user: req.user.id })),
    Number(queryObject.pageNumber),
    Number(queryObject.pageSize),
    { date: -1 }
  );
  res.json(alertsWithPaginaton);
};

const readAlerts = async (req, res) => {
  const result = await Alert.updateMany(
    {
      _id: {
        $in: req.body.alertIds,
      },
    },
    { read: false }
  );
  res.json({ modifiedCount: result.modifiedCount });
};

module.exports = {
  getAllPaginatedAlerts,
  readAlerts,
};
