import PropTypes, { string } from "prop-types";
import React, { useEffect } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import { connect } from "react-redux";
import PaginationCustom from "../../Shared/Components/PaginationCustom";
import { loadPaginatedMeals } from "../../Shared/Redux/meals/mealsActions";
import Loading from "../../Shared/UserInterface/Loading";
import MealList from "./MealList";
const BrowseMeals = ({ meals, loadPaginatedMeals, pageNumber, pageSize }) => {
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
      <PaginationCustom type="meals" loadItems={loadPaginatedMeals} />
    </>
  );
};

BrowseMeals.propTypes = {
  loadPaginatedMeals: PropTypes.func.isRequired,
  meals: PropTypes.object,
  pageNumber: PropTypes.number,
  pageSize: PropTypes.number,
};

const mapStateToProps = (state) => ({
  meals: state.meals.meals,
  pageNumber: state.pagination.meals.pageNumber,
  pageSize: state.pagination.meals.pageSize,
});

const mapDispatchToProps = {
  loadPaginatedMeals,
};

export default connect(mapStateToProps, mapDispatchToProps)(BrowseMeals);
