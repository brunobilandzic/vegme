import React from "react";
import { Link } from "react-router-dom";
import cookStyles from "./cook.module.css";

export default function CookListItem({ cook }) {
  return (
    <Link to={`/cooks/${cook?.user.username}`} className={cookStyles.listLink}>
      <div className={cookStyles.name}>{cook?.user.name}</div>
      <div className={cookStyles.username}>{cook?.user.username}</div>
      <div className={cookStyles.meals}>{cook?.cooks.length} meals cooked</div>
    </Link>
  );
}
