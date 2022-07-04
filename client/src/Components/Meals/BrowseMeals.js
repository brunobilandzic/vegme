import PropTypes, { string } from "prop-types";
import React, { useEffect } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import { connect } from "react-redux";
import PaginationCustom from "../../Shared/Components/PaginationCustom";
import { loadPaginatedMeals } from "../../Shared/Redux/meals/mealsActions";
import Loading from "../../Shared/UserInterface/Loading";
import MealList from "./MealList";
const BrowseMeals = ({
  meals,
  loadPaginatedMeals,
  pageNumber,
  pageSize,
  isLoading,
}) => {
  useEffect(() => {
    loadPaginatedMeals();
  }, []);
  return (
    <>
        <Loading />
        <MealList
          meals={meals?.items[pageNumber + "-" + pageSize]}
          showAdd
        ></MealList>
      {meals?.pagination && (
        <PaginationCustom type="meals" loadItems={loadPaginatedMeals} />
      )}
    </>
  );
};

BrowseMeals.propTypes = {
  isLoading: propTypes.bool,
  loadPaginatedMeals: PropTypes.func.isRequired,
  meals: PropTypes.object,
  pageNumber: PropTypes.number,
  pageSize: PropTypes.number,
};

const mapStateToProps = (state) => ({
  meals: state.meals.browsing,
  pageNumber: state.pagination.meals.pageNumber,
  pageSize: state.pagination.meals.pageSize,
  isLoading: state.api.isLoading,
});

const mapDispatchToProps = {
  loadPaginatedMeals,
};

export default connect(mapStateToProps, mapDispatchToProps)(BrowseMeals);
