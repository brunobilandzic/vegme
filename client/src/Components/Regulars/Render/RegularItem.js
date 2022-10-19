import React from "react";
import { Link } from "react-router-dom";
import regularsStyles from "../regulars.module.css";
export default function RegularItem({ regular }) {
  return (
    <div className={`item-box hover`}>
      <Link to={`/regulars/${regular.user.username}`} className={`anchor`}>
        <div>
          <div>{regular.user.username}</div>
        </div>
        <div>{regular.orders.length} orders</div>
      </Link>
    </div>
  );
}
