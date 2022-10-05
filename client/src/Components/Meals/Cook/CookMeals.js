import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import mealStyles from "../meal.module.css";

import { loadPaginatedMealsWithOrders } from "../../../Redux/meals/mealsActions";
import PaginationCustom from "../../../Shared/Components/PaginationCustom";
import MealOrdersItem from "../Render/MealOrdersItem";
const CookMeals = ({
  loadPaginatedMealsWithOrders,
  meals,
  pageNumber,
  pageSize,
}) => {
  useEffect(() => {
    loadPaginatedMealsWithOrders();
  }, []);

  const getMealsOrders = () => {
    return meals?.items[pageNumber + "-" + pageSize]?.map((mealOrder) => (
      <MealOrdersItem
        meal={mealOrder.meal}
        orders={mealOrder.orders}
      ></MealOrdersItem>
    ));
  };
  return (
    <>
      <div>{getMealsOrders()}</div>
      <PaginationCustom
        type="cookMeals"
        loadItems={loadPaginatedMealsWithOrders}
      />
    </>
  );
};

CookMeals.propTypes = {
  loadPaginatedMealsWithOrders: PropTypes.func.isRequired,
  meals: PropTypes.object,
  pageNumber: PropTypes.number,
};

const mapStateToProps = (state) => ({
  meals: state.meals.cookMeals,
  pageNumber: state.pagination.cookMeals.pageNumber,
  pageSize: state.pagination.cookMeals.pageSize,
});

const mapDispatchToProps = { loadPaginatedMealsWithOrders };

export default connect(mapStateToProps, mapDispatchToProps)(CookMeals);
