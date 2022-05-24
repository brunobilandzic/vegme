import React from "react";
import MealItem from "./MealItem";

export default function MealList({ mealList, inCart }) {
  const getMealList = () => {
    return mealList.map((meal) => <MealItem inCart meal={meal}></MealItem>);
  };
  return (
    <>
      <div className="meal-list-container">{getMealList()}</div>
    </>
  );
}
