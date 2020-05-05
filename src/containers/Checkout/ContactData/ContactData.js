import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import styles from "./ContactData.module.css";
import Axios from "../../../axios-order";
import Spinner from "../../../components/UI/Spinner/Spinner";
class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    loading: false,
  };
  orderHandler = (event) => {
    event.preventDefault();
    // console.log(this.props);
    this.setState({
      loading: true,
    });
    const { ingredients, totalPrice } = this.props;
    const order = {
      ingredients: ingredients,
      totalPrice: totalPrice,
      customer: {
        name: "Hoang Hieu",
        address: {
          street: "Test street 1",
          zipCode: "55331",
          country: "VietNam",
        },
        email: "test@gmail.com",
      },
      deliveryMethod: "fastest",
    };
    Axios.post("/orders.json", order)
      .then((response) => {
        this.setState({
          loading: false,
        });
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
        console.log(error);
      });
  };
  render() {
    let form = null;
    if (this.state.loading) {
      form = <Spinner />;
    } else {
      form = (
        <form>
          <input
            className={styles.Input}
            type="text"
            name="name"
            placeholder="Your Name"
          />
          <input
            className={styles.Input}
            type="email"
            name="email"
            placeholder="Your Email"
          />
          <input
            className={styles.Input}
            type="text"
            name="street"
            placeholder="Your Street"
          />
          <input
            className={styles.Input}
            type="text"
            name="postalCode"
            placeholder="Postal Code"
          />
          <Button btnType="Success" clicked={this.orderHandler}>
            ORDER
          </Button>
        </form>
      );
    }
    return (
      <div className={styles.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}
export default ContactData;
