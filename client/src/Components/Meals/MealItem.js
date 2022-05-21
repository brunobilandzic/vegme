import React from "react";
import { isArrayNullOrEmpty } from "../../util/helper";

export default function MealItem({ meal }) {
  return (
    <>
      <h6>{meal.name}</h6>
      {!isArrayNullOrEmpty(meal.ingredients) && <>Ingredients: {JSON.stringify(meal.ingredients)}</>}
    </>
  );
}
