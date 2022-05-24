import React from "react";
import MealItem from "./MealItem";
import mealStyles from "./meal.module.css";
export default function MealList({ mealList, showAdd }) {
  const getMealList = () => {
    return mealList.map((meal) => <MealItem showAdd meal={meal}></MealItem>);
  };
  return (
    <>
      <div className="meal-list-container">{getMealList()}</div>
    </>
  );
}
