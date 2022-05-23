import React from "react";
import { v4 as uuid } from "uuid";
export default function IngredientList({ ingredients }) {
  const getIngredients = () => (
    <>
      Ingredients:{" "}
      {ingredients?.map((ingredient) => (
        <div key={uuid()}>{ingredient}</div>
      ))}
    </>
  );
  return (
    <div>{ingredients.length != 0 ? getIngredients() : <div>none</div>}</div>
  );
}
