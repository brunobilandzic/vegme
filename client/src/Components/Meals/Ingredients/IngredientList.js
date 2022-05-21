import React from "react";

export default function IngredientList({ ingredients }) {
  const getIngredients = () => (
    <>
      Ingredients:{" "}
      {ingredients?.map((ingredient) => (
        <>{ingredient}</>
      ))}
    </>
  );
  return <div>{ingredients && getIngredients()}</div>;
}
