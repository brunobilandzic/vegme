import React from "react";
import regularsStyles from "../regulars.module.css";
export default function RegularItem({ regular }) {
  return (
    <div className={`item-box hover`}>
      <div>
        <div>{regular.user.username}</div>
      </div>
      <div>
        {regular.orders.length} orders
      </div>
    </div>
  );
}
