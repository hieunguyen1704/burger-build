import React,{Component} from 'react';
import Aux from '../../hoc/Auxs';
import Burger from '../../components/Burger/Burger'
// import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary' ;
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';
import axios from '../../axios-order';
class BurgerBuilder extends Component{
    state = {
        purchasing: false,
    }
    componentDidMount(){
        this.props.onInitIngredients();
    }
    updatePurchasable= (ingredients) =>{
        const sum = Object.keys(ingredients).reduce((sum, el) => sum + ingredients[el],0);
        return sum > 0;
    };
    purchaseHandler = () =>{
        this.setState({
            purchasing: true
        });
    }
    purchaseCancelHandler = () =>{
        this.setState({
            purchasing: false
        });
    }
    purchaseContinueHandler = () =>{
        this.props.history.push('/checkout');
    }
    render(){
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let burger =this.props.error ? <p>Something went wrongs</p> : <Spinner />;
        let orderSummary = null;
        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients = {this.props.ings}/>
                    <BuildControls 
                    ingredientsAdded = {this.props.onIngredientAdded}
                    ingredientsRemoved = {this.props.onIngredientRemoved}
                    disabled = {disabledInfo}
                    price = {this.props.price}
                    purchasable = {this.updatePurchasable(this.props.ings)}
                    ordered = {this.purchaseHandler}
                    />
                </Aux>
            );
            orderSummary = (
                <OrderSummary 
                ingredients = {this.props.ings}
                price = {this.props.price}
                purchaseCanceled = {this.purchaseCancelHandler}
                purchaseContinued = {this.purchaseContinueHandler}
            />
            );
        }
        // if(this.state.loading){
        //     orderSummary = <Spinner />
        // }
        return (
            <Aux>
                <Modal 
                show={this.state.purchasing} 
                modelClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    };
}
const mapStateToProps = state =>{
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        error: state.error
    }
}
const mapDispatchToProps = dispatch=>{
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));