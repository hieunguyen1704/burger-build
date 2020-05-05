import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import styles from './CheckoutSummary.module.css';
const CheckOutSummary = (props) => {
  return (
    <div className={styles.CheckOutSummary}>
      <h1>We hope it tastes well</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.CheckoutCanceled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked ={props.CheckoutContinued}>
        CONTINUE
      </Button>
    </div>
  );
};
export default CheckOutSummary;
