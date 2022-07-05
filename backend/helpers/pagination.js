const mongoose = require("mongoose");
const HttpError = require("../errors/http-error");

class PaginatedList {
  constructor(_items, _pageNumber, _pageSize, _count) {
    this.items = _items;
    this.pageNumber = _pageNumber;
    this.pageSize = _pageSize;
    this.totalPages = Math.ceil(_count / _pageSize);
    this.totalItems = _count;
  }

  static getPaginatedResult = async (
    query,
    pageNumber = 1,
    pageSize = 5,
    sort = {}
  ) => {
    if (isNaN(pageNumber)) pageNumber = 1;
    if (isNaN(pageSize)) pageSize = 5;

    const quryCloned = query.clone();
    query = query.sort(sort);
    query = query.skip((pageNumber - 1) * pageSize);

    query = query.limit(pageSize);
    let count, items;
    try {
      count = await quryCloned.count();
      items = await query.exec();
    } catch (error) {
      throw new HttpError("Cannot find items");
    }

    return new PaginatedList(items, pageNumber, pageSize, count);
  };
}

const needNewPage = async (query, pageSize) => {
  const length = await query.count();
  return length % pageSize == 1 ? true : false;
};

module.exports = { PaginatedList, needNewPage };
