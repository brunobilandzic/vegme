import React from "react";
import { Link } from "react-router-dom";
import BrowseMeals from "../Components/Meals/Render/BrowseMeals";
import bowl from "./vegme-bowl.jpg";
import styles from "./demoLayout.module.css";

export default function DemoHome() {
  return (
    <>
      <section className={styles.hero} aria-labelledby="demo-title">
        <div className={styles.heroCopy}>
          <h1 id="demo-title">Weekly meals from independent cooks</h1>
          <p>
            Browse sample dishes, meet the cooks, and try placing an order
            without creating an account.
          </p>
          <a className={styles.primaryLink} href="#meal-catalog">Browse the menu</a>
        </div>
        <img
          src={bowl}
          alt="Grain bowl with roasted vegetables, chickpeas and avocado"
          width="1536"
          height="1024"
          className={styles.heroImage}
        />
      </section>

      <section className={styles.menu} aria-labelledby="meal-catalog">
        <div className={styles.sectionHeading}>
          <h2 id="meal-catalog">Meal catalog</h2>
          <Link to="/meals/special">See special meals <span aria-hidden="true">→</span></Link>
        </div>
        <BrowseMeals />
      </section>

      <section className={styles.about} aria-labelledby="about-demo">
        <div>
          <h2 id="about-demo">About this demo</h2>
          <p>
            The public demo uses sample dishes and cook profiles. You can try
            the cart and simulate checkout in your browser.
          </p>
        </div>
        <div>
          <h3>What the full app includes</h3>
          <dl className={styles.features}>
            <div>
              <dt>Meal publishing</dt>
              <dd>Cooks publish regular and special meals with ingredients and allergens.</dd>
            </div>
            <div>
              <dt>Order management</dt>
              <dd>Customers pick an available delivery day and can edit orders before the cook's deadline.</dd>
            </div>
            <div>
              <dt>Accounts and roles</dt>
              <dd>Password and Google sign-in with separate permissions for customers, cooks, operators, and administrators.</dd>
            </div>
            <div>
              <dt>Live notifications</dt>
              <dd>Socket.IO sends order updates to an inbox with an unread count.</dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}
