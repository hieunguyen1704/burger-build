import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-order";
class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };
  componentDidMount() {
    axios
      .get("/orders.json")
      .then((res) => {
        const fetchedOrder = [];
        for (let key in res.data) {
          fetchedOrder.push({
            id: key,
            ...res.data[key],
          });
        }
        this.setState({
          loading: false,
          orders: fetchedOrder,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false,
        });
      });
  }
  render() {
    const orders = this.state.orders.map((order) => (
      <Order key={order.id} ingredients={order.ingredients} price={+order.totalPrice}/>
    ));
    return <div>{orders}</div>;
  }
}
export default Orders;
