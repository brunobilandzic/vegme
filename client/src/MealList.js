import React from "react";
import MealItem from "./MealItem";

export default function MealList({ mealList }) {
  const getMealList = () => {
    return mealList.map((meal) => <MealItem meal={meal}></MealItem>);
  };
  return (
    <>
      <div className="meal-list-container">{getMealList()}</div>
    </>
  );
}
