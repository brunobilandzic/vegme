import React from "react";
import MealItem from "./MealItem";
import { isStaticDemo } from "../../../Demo/catalog";
import styles from "../../../Demo/demoMeals.module.css";

export default function MealList({ meals, showAdd, cookUsername }) {
  return (
    <div className={isStaticDemo ? styles.grid : "meal-list-container"}>
      {meals?.map((meal) => (
        <MealItem key={meal._id} showAdd={showAdd} meal={meal} cookUsername={cookUsername} />
      ))}
    </div>
  );
}
