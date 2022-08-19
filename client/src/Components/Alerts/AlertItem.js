import React from "react";
import alertStyles from "./alerts.module.css";

export default function AlertItem({ alert }) {
  return (
    <div className={alertStyles.alertBox}>
      <div>{alert.date}</div>
      <div>{alert.text}</div>
      <div>{JSON.stringify(alert.read)}</div>
    </div>
  );
}
