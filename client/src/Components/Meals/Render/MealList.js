import React from "react";
import MealItem from "./MealItem";
import { v4 as uuid} from "uuid"
import mealStyles from "../meal.module.css";
export default function MealList({ meals, showAdd }) {
  const getMealList = () => {
    return meals?.map((meal) => <MealItem key={uuid()} showAdd meal={meal}></MealItem>);
  };
  return (
    <>
      <div className="meal-list-container">{getMealList()}</div>
    </>
  );
}
