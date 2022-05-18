import React, { useEffect, useState } from "react";
import { PageItem, Pagination } from "react-bootstrap";
import propTypes from "prop-types";
import { connect } from "react-redux";

import {
  updatePageNumber,
  updatePageSize,
  updateTotalItems,
  updateTotalPages,
} from "./Shared/Redux/actions/pagination.js";

function PaginationCustom(props) {
  const {
    pageNumber,
    pageSize,
    totalItems,
    totalPages,
    updatePageNumber,
    updatePageSize,
    updateTotalItems,
    updateTotalPages,
  } = props;



  const getPageNumbers = () => {
    let pageItems = [];
    for (let i = 0; i < totalPages; i++) {
      pageItems.push(
        <PageItem
          onClick={() => updatePageNumber(i + 1)}
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
    updatePageNumber(1);
  };
  const handlePrevious = () => {
    updatePageNumber(pageNumber - 1);
  };

  const handleNext = () => {
    updatePageNumber(pageNumber + 1);
  };
  const handleLast = () => {
    updatePageNumber(totalPages);
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
  currentPageNumber: propTypes.number,
  pageNumber: propTypes.number,
  totalItems: propTypes.number,
  pageSize: propTypes.number,
  totalPages: propTypes.number,
};

const mapStateToProps = (state) => ({
  pageNumber: state.pagination.pageNumber,
  pageNumber: state.pagination.pageNumber,
  totalItems: state.pagination.totalItems,
  pageSize: state.pagination.pageSize,
  totalPages: state.pagination.totalPages,
});

export default connect(mapStateToProps, {
  updatePageNumber,
  updatePageSize,
  updateTotalItems,
  updateTotalPages,
})(PaginationCustom);
