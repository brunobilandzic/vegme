import React from "react";
import { Link } from "react-router-dom";
import { SPECIAL } from "../Shared/Constants/MealTypes";
import styles from "./demoMeals.module.css";

export default function DemoMealCard({
  meal,
  showAdd,
  isInCart,
  canAdd,
  onCartClick,
  cookUsername,
}) {
  const cook = meal.cook.user;
  const isSpecial = meal.type === SPECIAL;
  const ingredients = meal.ingredients ?? [];
  const allergens = ingredients.filter((ingredient) => ingredient.allergen);

  return (
    <article className={styles.card}>
      <div className={styles.heading}>
        <h3>
          <Link to={`/meals/${meal._id}`}>{meal.name}</Link>
        </h3>
        <span className={isSpecial ? styles.special : styles.regular}>
          {isSpecial ? "Special" : "Regular"}
        </span>
      </div>
      <p className={styles.cook}>
        Cooked by{" "}
        {cookUsername ? cook.name : <Link to={`/cooks/${cook.username}`}>{cook.name}</Link>}
      </p>
      <dl className={styles.ingredients}>
        <dt>Ingredients</dt>
        <dd>{ingredients.map((ingredient) => ingredient.name).join(", ")}</dd>
        {allergens.length > 0 && (
          <>
            <dt>Allergens</dt>
            <dd>{allergens.map((ingredient) => ingredient.name).join(", ")}</dd>
          </>
        )}
      </dl>
      {showAdd && (
        <div className={styles.actions}>
          <button
            type="button"
            className="btn btn-sm btn-outline-dark"
            disabled={!canAdd}
            onClick={onCartClick}
          >
            {isInCart ? "Remove from cart" : "Add to cart"}
          </button>
          {!canAdd && <small>Choose meals from one cook per order.</small>}
        </div>
      )}
    </article>
  );
}
