import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import PaginationCustom from "../../Shared/Components/PaginationCustom";

import { loadPaginatedMeals } from "../../Shared/Redux/meals/mealsActions";
import MealList from "./MealList";
const BrowseMeals = ({ meals, loadPaginatedMeals, pageNumber, pageSize }) => {
  useEffect(() => {
    loadPaginatedMeals();
  }, []);
  return (
    <>
    <MealList meals={meals?.items[pageNumber + "-" + pageSize]} showAdd></MealList>
      {meals?.pagination && <PaginationCustom loadItems={loadPaginatedMeals} />}
    </>
  );
};

BrowseMeals.propTypes = {
  loadPaginatedMeals: PropTypes.func.isRequired,
  meals: PropTypes.object,
  pageNumber: PropTypes.number,
  pageSize: PropTypes.number
};

const mapStateToProps = (state) => ({
  meals: state.meals,
  pageNumber: state.pagination.pageNumber,
  pageSize: state.pagination.pageSize
});

const mapDispatchToProps = {
  loadPaginatedMeals,
};

export default connect(mapStateToProps, mapDispatchToProps)(BrowseMeals);
