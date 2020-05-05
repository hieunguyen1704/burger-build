import React from "react";
import styles from "./Order.module.css";
const Order = (props) => {
  const ingredientArr = [];
    console.log(props.ingredients)
  for (let ingredientName in props.ingredients) {
    ingredientArr.push({
      name: ingredientName,
      num: props.ingredients[ingredientName],
    });
  }
  const ingredientOutput = ingredientArr.map((ig) => (
    <span
      key={ig.name}
      style={{
        textTransform: "capitalize",
        margin: "0 8px",
        border: "1px solid #ccc",
        padding: "5px",
      }}
    >
      {ig.name} ({ig.num})
    </span>
  ));
  return (
    <div className={styles.Order}>
      {ingredientOutput}
      <p>
        Price: <strong>USD {props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};
export default Order;
