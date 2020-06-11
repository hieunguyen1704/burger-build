import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import styles from "./ContactData.module.css";
import Axios from "../../../axios-order";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import {connect} from 'react-redux';
class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation:{
          required:true,
        },
        valid:false,
        touched: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code",
        },
        value: "",
        validation:{
          required:true,
          minLength: 5,
          maxLength:5
        },
        valid:false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation:{
          required:true
        },
        valid:false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail",
        },
        value: "",
        validation:{
          required:true
        },
        valid:false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        validation:{},
        valid: true

      },
    },
    loading: false,
    formIsValid: false
  };
  orderHandler = (event) => {
    // event.preventDefault();
    // console.log(this.props);
    this.setState({
      loading: true,
    });

    const orderData = {};
    for(let elementIdentify in this.state.orderForm){
      orderData[elementIdentify] = this.state.orderForm[elementIdentify].value;
    }
    const order = {
      ingredients: this.props.ings,
      totalPrice: this.props.price,
      orderData:orderData
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
  
  checkValidity(value, rules){
    let isValid = true;
    if(!rules){
      return true;
    }
    if(rules.required){
      isValid = value.trim() !== '' && isValid;
    }
    if(rules.minLength){
      isValid = value.length >= rules.minLength && isValid;
    }
    if(rules.maxLength){
      isValid = value.length <= rules.minLength && isValid;
    }
    return isValid;
  }
  inputChangeHandler = (event, inputIdentify) =>{
    const updatedOrderForm = {...this.state.orderForm};
    const updatedFormElement = {...updatedOrderForm[inputIdentify]};
    updatedFormElement.value =  event.target.value;
    updatedFormElement.valid = this.checkValidity( updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentify] = updatedFormElement;
    let formIsValid = true;
    for (let inputIdentify in updatedOrderForm){
      formIsValid = updatedOrderForm[inputIdentify].valid && formIsValid
    }
    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid
    });
  }
  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = null;
    if (this.state.loading) {
      form = <Spinner />;
    } else {
      form = (
        <form onSubmit={this.orderHandler}>
          {formElementsArray.map((formElement) => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid = {!formElement.config.valid}
              shouldValidate = {formElement.config.validation}
              touched = {formElement.config.touched}
              changed={(event)=>this.inputChangeHandler(event,formElement.id)}
            />
          ))}
          <Button btnType="Success" type="submit" disabled={!this.state.formIsValid}>
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
const mapStateToProps = state =>{
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}
export default connect(mapStateToProps)(ContactData);
