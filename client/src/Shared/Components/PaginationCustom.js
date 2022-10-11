import React, { useEffect } from "react";
import { PageItem, Pagination } from "react-bootstrap";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { updatePageNumber } from "../../Redux/pagination/paginationActions.js";
import paginationStyles from "./pagination.module.css";
import { v4 as uuid } from "uuid";

function PaginationCustom({
  meals,
  orders,
  cookMeals,
  specialMeals,
  favouriteMeals,
  loadItems,
  updatePageNumber,
  type,
  alerts,
}) {
  const { pageNumber, pageSize, totalPages } =
    type == "meals"
      ? meals
      : type == "orders"
      ? orders
      : type == "cookMeals"
      ? cookMeals
      : type == "specialMeals"
      ? specialMeals
      : type == "alerts"
      ? alerts
      : type == "favouriteMeals"
      ? favouriteMeals
      : {
          pageNumber: 1,
          pageSize: 5,
          totalPages: null,
        };
  const getPageNumbers = () => {
    let pageItems = [];
    const needDots = totalPages > 5 ? true : false;
    if (needDots) {
      if (pageNumber > 3)
        pageItems.push(
          <PageItem key={uuid()} disabled>
            {"..."}
          </PageItem>
        );
      for (
        let i = pageNumber - 2;
        i <= pageNumber + 2 && i <= totalPages;
        i++
      ) {
        if (i <= 0) continue;
        pageItems.push(
          <PageItem
            onClick={() => {
              updatePageNumber(type, i);
              loadItems(i, pageSize);
            }}
            active={i === pageNumber}
            key={uuid()}
          >
            {i}
          </PageItem>
        );
      }
      if (pageNumber < totalPages - 2)
        pageItems.push(
          <PageItem key={uuid()} disabled>
            {"..."}
          </PageItem>
        );
    } else {
      for (let i = 1; i <= totalPages; i++) {
        pageItems.push(
          <PageItem
            onClick={() => {
              updatePageNumber(type, i);
              loadItems(i, pageSize);
            }}
            active={i === pageNumber}
            key={uuid()}
          >
            {i}
          </PageItem>
        );
      }
    }
    return pageItems;
  };
  const handleFirst = () => {
    updatePageNumber(type, 1);
    loadItems(1, pageSize);
  };
  const handlePrevious = () => {
    updatePageNumber(type, pageNumber - 1);
    loadItems(pageNumber - 1, pageSize);
  };

  const handleNext = () => {
    updatePageNumber(type, pageNumber + 1);
    loadItems(pageNumber + 1, pageSize);
  };
  const handleLast = () => {
    updatePageNumber(type, totalPages);
    loadItems(totalPages, pageSize);
  };
  return (
    <div>
      <Pagination className={paginationStyles.container}>
        <div className={paginationStyles.items_on_beginning}>
          <PageItem
            disabled={pageNumber === 1}
            key={uuid()}
            onClick={handleFirst}
          >
            {"<<"}
          </PageItem>
          <PageItem
            disabled={pageNumber === 1}
            key={uuid()}
            onClick={handlePrevious}
          >
            {"<"}
          </PageItem>
        </div>
        {getPageNumbers()}
        <div className={paginationStyles.items_on_end}>
          <PageItem
            disabled={pageNumber === totalPages}
            key={uuid()}
            onClick={handleNext}
          >
            {">"}
          </PageItem>
          <PageItem
            disabled={pageNumber === totalPages}
            key={uuid()}
            onClick={handleLast}
          >
            {">>"}
          </PageItem>
        </div>
      </Pagination>
    </div>
  );
}

PaginationCustom.propTypes = {
  orders: propTypes.object,
  meals: propTypes.object,
  cookMeals: propTypes.object,
  specialMeals: propTypes.object,
  alerts: propTypes.object,
  favouriteMeals: propTypes.object,
};

const mapStateToProps = (state) => ({
  orders: state.pagination.orders,
  meals: state.pagination.meals,
  cookMeals: state.pagination.cookMeals,
  specialMeals: state.pagination.specialMeals,
  alerts: state.pagination.alerts,
  favouriteMeals: state.pagination.favouriteMeals,
});

export default connect(mapStateToProps, {
  updatePageNumber,
})(PaginationCustom);
