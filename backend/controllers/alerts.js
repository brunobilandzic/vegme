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
      $and: [
        {
          _id: {
            $in: req.body.alertIds,
          },
        },
        { user: req.user.id },
      ],
    },
    { read: true }
  );
  res.json( result.modifiedCount );
};

const getUnreadAlertsCount = async (req, res) => {
  const unreadAlertsCount = await Alert.where({
    $and: [{ read: false }, { user: req.user.id }],
  }).count();
  res.json(unreadAlertsCount);
};

module.exports = {
  getAllPaginatedAlerts,
  readAlerts,
  getUnreadAlertsCount,
};
