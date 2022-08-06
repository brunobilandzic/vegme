import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import PaginationCustom from "../../Shared/Components/PaginationCustom";
import { loadPaginatedSpecialMeals } from "../../Redux/meals/mealsActions";
import MealList from "./MealList";

export const BrowseSpecialMeals = ({ loadPaginatedSpecialMeals, pageNumber, pageSize, meals }) => {
  useEffect(() => {
    loadPaginatedSpecialMeals();
  });
  return (
    <div>
      <MealList
        meals={meals?.items[pageNumber + "-" + pageSize]}
        showAdd
      ></MealList>
      <PaginationCustom
        type="specialMeals"
        loadItems={loadPaginatedSpecialMeals}
      />
    </div>
  );
};

BrowseSpecialMeals.propTypes = {
  loadPaginatedSpecialMeals: PropTypes.func.isRequired,
  meals: PropTypes.object,
  pageNumber: PropTypes.number,
  pageSize: PropTypes.number,
};

const mapStateToProps = (state) => ({
    meals: state.meals.specialMeals,
    pageNumber: state.pagination.specialMeals.pageNumber,
  pageSize: state.pagination.specialMeals.pageSize,
});

const mapDispatchToProps = { loadPaginatedSpecialMeals };

export default connect(mapStateToProps, mapDispatchToProps)(BrowseSpecialMeals);
