import React, { Component } from "react";
import CheckOutSummary from "../../components/Order/CheckOutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
class CheckOut extends Component {
  state = {
    ingredients: {
      salad: 0,
      cheese: 0,
      bacon: 0,
      meat: 0,
    },
    price: 0,
  };
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      //each param: ['salad' ,'1']
      if (param[0] === "price") {
        price = +param[1];
      }else{
        ingredients[param[0]] = +param[1];
      }
     
    }
    this.setState({
      ingredients: ingredients,
      price: price,
    });
  }
  CheckoutCanceledHandler = () => {
    this.props.history.goBack();
  };
  CheckoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    return (
      <div>
        <CheckOutSummary
          ingredients={this.state.ingredients}
          CheckoutCanceled={this.CheckoutCanceledHandler}
          CheckoutContinued={this.CheckoutContinuedHandler}
        />
        <Route
          path={this.props.match.url + "/contact-data"}
          render={() => (
            <ContactData
              totalPrice={this.state.price}
              ingredients={this.state.ingredients}
              {...this.props}
            />
          )}
        />
      </div>
    );
  }
}
export default CheckOut;
