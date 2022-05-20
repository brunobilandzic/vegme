import React, { useEffect } from "react";
import { connect } from "react-redux";

import propTypes from "prop-types";

import { loadAllRestaurantsWithPagination } from "./Shared/Redux/actions/restaurants.js";
import PaginationCustom from "./PaginationCustom.js";
import RestaurantItem from "./RestaurantItem.js";
function RestaurantList(props) {
  const {
    pageNumber,
    pageSize,
    totalItems,
    pagination,
    restaurants,
    totalPages,
    loadAllRestaurantsWithPagination,
  } = props;
  useEffect(() => {
    props.loadAllRestaurantsWithPagination(pageNumber, pageSize);
    console.log(pageNumber, pageSize, totalItems, pagination, totalPages);
  }, []);

  const loadItems = (_pageNumber) => {
    loadAllRestaurantsWithPagination(_pageNumber, pageSize);
  };

  const getPaginationKey = () => pageNumber + "-" + pageSize;

  const getRestaurants = () => {
    return(
      restaurants[getPaginationKey()]?.map((restaurant) => (
        <RestaurantItem restaurant={restaurant}></RestaurantItem>
      ))
    );
  };

  return (
    <>
      {getRestaurants()}
      {pagination && (
        <PaginationCustom
          totalItems={totalItems}
          pageSize={pageSize}
          loadItems={loadItems}
        ></PaginationCustom>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  restaurants: state.restaurants.restaurants,
  pagination: state.restaurants.pagination,
  restaurants: state.restaurants.restaurants,
  pagination: state.restaurants.pagination,

  pageNumber: state.pagination.pageNumber,
  totalItems: state.pagination.totalItems,
  pageSize: state.pagination.pageSize,
  totalPages: state.pagination.totalPages,
});

RestaurantList.propTypes = {
  loadAllRestaurantsWithPagination: propTypes.func.isRequired,
  pageNumber: propTypes.number,
  restaurants: propTypes.object,
  pagination: propTypes.bool,
  totalItems: propTypes.number,
  pageSize: propTypes.number,
  totalPages: propTypes.number,
};

export default connect(mapStateToProps, { loadAllRestaurantsWithPagination })(
  RestaurantList
);
