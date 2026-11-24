import React from "react";
import BrowseMeals from "../Components/Meals/Render/BrowseMeals";

export default function DemoHome() {
  return (
    <>
      <section className="py-4 mb-4 border-bottom" aria-labelledby="about-demo">
        <div className="col-lg-9">
          <h1 id="about-demo" className="h3">About this demo</h1>
          <p>
            VegMe connects people who want weekly meals with cooks who prepare
            them. In this public demo, you can browse sample dishes and cook
            profiles, add meals to your cart, and place a simulated order
            without signing in.
          </p>
          <h2 className="h5">What the full app includes</h2>
          <ul className="mb-0">
            <li>
              <strong>Meal publishing.</strong> Cooks can publish regular and
              special meals with ingredients and allergen labels.
            </li>
            <li>
              <strong>Order management.</strong> Customers can choose from a
              cook's available delivery days, view their orders, and make
              changes before the editing deadline.
            </li>
            <li>
              <strong>Accounts and roles.</strong> The full app supports
              password and Google sign-in, with role-specific access for
              customers, cooks, operators, and administrators.
            </li>
            <li>
              <strong>Live notifications.</strong> Socket.IO delivers order
              updates, with an in-app inbox and unread count.
            </li>
          </ul>
        </div>
      </section>
      <h2 className="h5">Meal catalog</h2>
      <BrowseMeals />
    </>
  );
}
