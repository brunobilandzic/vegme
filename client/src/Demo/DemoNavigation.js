import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import styles from "./demoLayout.module.css";

export default function DemoNavigation() {
  const cartSize = useSelector((state) => state.meals.mealsToOrder.length);

  return (
    <header className={styles.header}>
      <div className={styles.navbar}>
        <Link to="/" className={styles.brand}>VegMe</Link>
        <nav aria-label="Main navigation" className={styles.navLinks}>
          <NavLink to="/meals/browse">Meals</NavLink>
          <NavLink to="/cooks">Cooks</NavLink>
          <NavLink to="/cart" className={styles.cartLink}>
            Cart {cartSize > 0 && <span aria-label={`${cartSize} items`}>{cartSize}</span>}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
