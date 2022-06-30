import React, { useEffect } from "react";
import classnames from "classnames";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { CgDanger } from "react-icons/cg";
import ingredientsStyles from "./ingredients.module.css";
import "./ingredients.css";
export default function IngredientPreview({ ingredient, removeIngredient }) {
  return (
    <>
      <div className={ingredientsStyles.listItem}>
        <div
          className={classnames({
            name: true,
            is_allergen: ingredient.allergen,
          })}
        >
          {ingredient?.name}
        </div>
        <div className={ingredientsStyles.item_preview_right}>
          {ingredient.allergen && (
            <div className={ingredientsStyles.preview_icon}>
              <CgDanger />
            </div>
          )}
          <div
            className="action"
            onClick={() => removeIngredient(ingredient.id)}
          >
            <RiDeleteBin7Fill />
          </div>
        </div>
      </div>
    </>
  );
}
