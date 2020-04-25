import React,{Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger'
// import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary' 
const INGREDIENTS_PRICE={
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon: 0.7
}
class BurgerBuilder extends Component{
    state = {
        ingredients:{
            salad: 0,
            bacon:0,
            cheese:0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false
    }
    updatePurchasable= (ingredients) =>{
        const sum = Object.keys(ingredients).reduce((sum, el) => sum + ingredients[el],0);
        this.setState({
            purchasable: sum > 0
        });
    };
    addIngredientHandler =(type) =>{
        let {ingredients,totalPrice} = this.state;
        const updatedCount = ingredients[type] + 1;
        const undatedIngredient = {
            ...ingredients
        };
        undatedIngredient[type] = updatedCount;
        totalPrice = totalPrice + INGREDIENTS_PRICE[type]; // calculate new price
        this.setState({
            ingredients: undatedIngredient,
            totalPrice: totalPrice
        });
        this.updatePurchasable(undatedIngredient);

    }
    removeIngredientHandler =(type)=>{
        let {ingredients,totalPrice} = this.state;
        if(ingredients[type] <= 0){
            return;
        }
        const updatedCount = ingredients[type] - 1;
        const undatedIngredient = {
            ...ingredients
        };
        undatedIngredient[type] = updatedCount;
        totalPrice = totalPrice - INGREDIENTS_PRICE[type]; // calculate new price
        this.setState({
            ingredients: undatedIngredient,
            totalPrice: totalPrice
        }); 
        this.updatePurchasable(undatedIngredient);   
    }
    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                <Modal>
                    <OrderSummary ingredients = {this.state.ingredients}/>
                </Modal>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls 
                ingredientsAdded = {this.addIngredientHandler}
                ingredientsRemoved = {this.removeIngredientHandler}
                disabled = {disabledInfo}
                price = {this.state.totalPrice}
                purchasable = {this.state.purchasable}
                />
            </Aux>
        );
    };
}
export default BurgerBuilder;