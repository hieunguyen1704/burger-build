import React, { Component } from "react";
import CheckOutSummary from "../../components/Order/CheckOutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import {connect} from 'react-redux';
class CheckOut extends Component {


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
          ingredients={this.props.ings}
          CheckoutCanceled={this.CheckoutCanceledHandler}
          CheckoutContinued={this.CheckoutContinuedHandler}
        />
        <Route
          path={this.props.match.url + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
}
const mapStateToProps = state =>{
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}
export default connect(mapStateToProps)(CheckOut);
