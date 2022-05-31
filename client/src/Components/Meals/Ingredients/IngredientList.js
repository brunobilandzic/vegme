import React from "react";
import { v4 as uuid } from "uuid";
import mealStyles from "../Meals/meal.module.css";
export default function IngredientList({ ingredients }) {
  const getIngredients = () => (
    <div className={mealStyles.ingredientsContainer}>
      Ingredients:{" "}
      <table className={mealStyles.ingredientsTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Is allergen</th>
          </tr>
        </thead>
        <tbody>
        {ingredients?.map((ingredient) => (
          <tr className={mealStyles.ingredientsTableRow} key={uuid()}>
            <td className={mealStyles.ingredientsTableItem}>
              {ingredient.name}
            </td>
            <td className={mealStyles.ingredientsTableItem}>
              {ingredient.allergen ? "da" : "ne"}
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
  return (
    <div>{ingredients.length != 0 ? getIngredients() : <div>none</div>}</div>
  );
}
