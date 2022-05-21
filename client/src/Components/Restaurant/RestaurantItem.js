import React from "react";
import { Link } from "react-router-dom";
import MealList from "../Meals/MealList";
import { isArrayNullOrEmpty } from "../../util/helper";

export default function RestaurantItem({ restaurant }) {
  return (
    <>
      <Link className="link" to={`/restaurant/${restaurant._id}`}>
        <h3>{restaurant.name}</h3>
      </Link>
      {restaurant.location && <h6>Location: {restaurant.location}</h6>}
    </>
  );
}
