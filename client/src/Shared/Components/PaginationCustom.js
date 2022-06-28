import React, { useEffect, useState } from "react";
import { PageItem, Pagination } from "react-bootstrap";
import propTypes from "prop-types";
import { connect } from "react-redux";

import {
  updatePageNumber,
  updatePageSize,
  updateTotalItems,
  updateTotalPages,
} from "../Redux/pagination/paginationActions.js";

function PaginationCustom(props) {
  const {
    meals,
    orders,
    loadItems,
    updatePageNumber,
    updateTotalItems,
    updateTotalPages,
    updatePageSize,
    type
  } = props;

  const {
    pageNumber,
    pageSize,
    totalPages,
    totalItems
  } = type == "meals" ? meals : type == "orders" ? orders : {
    pageNumber: 1,
    pageSize: 5,
    totalPages: null,
    totalItems: null
  } 



  const getPageNumbers = () => {
    let pageItems = [];
    for (let i = 0; i < totalPages; i++) {
      pageItems.push(
        <PageItem
          onClick={() => {
            updatePageNumber(type, i+1)
            loadItems(i + 1, pageSize)
            }}
          active={i === pageNumber - 1}
          key={i}
        >
          {i + 1}
        </PageItem>
      );
    }
    return pageItems;
  };
  const handleFirst = () => {
    updatePageNumber(type, 1);
    loadItems(1, pageSize)
  };
  const handlePrevious = () => {
    updatePageNumber(type, pageNumber - 1);
    loadItems(pageNumber -1, pageSize)
  };

  const handleNext = () => {
    updatePageNumber(type, pageNumber + 1);
    loadItems(pageNumber + 1, pageSize)
  };
  const handleLast = () => {
    updatePageNumber(type, totalPages);
    loadItems(totalPages, pageSize)
  };
  return (
    <div>
      <Pagination>
        <PageItem disabled={pageNumber === 1} onClick={handleFirst}>
          {"<<"}
        </PageItem>
        <PageItem disabled={pageNumber === 1} onClick={handlePrevious}>
          {"<"}
        </PageItem>
        {getPageNumbers()}
        <PageItem disabled={pageNumber === totalPages} onClick={handleNext}>
          {">"}
        </PageItem>
        <PageItem disabled={pageNumber === totalPages} onClick={handleLast}>
          {">>"}
        </PageItem>
      </Pagination>
    </div>
  );
}

PaginationCustom.propTypes = {
  orders: propTypes.object,
  meals: propTypes.object
};

const mapStateToProps = (state) => ({
  orders: state.pagination.orders,
  meals: state.pagination.meals
});

export default connect(mapStateToProps, {
  updatePageNumber,
  updatePageSize,
  updateTotalItems,
  updateTotalPages,
})(PaginationCustom);
