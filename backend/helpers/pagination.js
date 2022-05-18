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

  static getPaginatedResult = async (query, pageNumber = 1, pageSize = 5) => {
    if (isNaN(pageNumber)) pageNumber=1

    if (isNaN(pageSize)) pageSize = 5;
    query = query.skip((pageNumber - 1) * pageSize);
    console.log(pageNumber, pageSize);
    const quryCloned = query.clone();
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

module.exports = { PaginatedList };
