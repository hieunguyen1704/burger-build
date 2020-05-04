import React,{Component} from 'react';
import Aux from '../../hoc/Auxs';
import Burger from '../../components/Burger/Burger'
// import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary' ;
import Axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
const INGREDIENTS_PRICE={
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon: 0.7
}
class BurgerBuilder extends Component{
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }
    componentDidMount(){
        Axios.get("/ingredients.json")
        .then(response =>{
            this.setState({
                ingredients: response.data
            });
        })
        .catch(error=>{
            this.setState({
                error: true
            });
        });
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
        this.setState({
            loading:true
        });
        const {ingredients,totalPrice} =this.state;
        const order = {
            ingredients: ingredients,
            totalPrice: totalPrice.toFixed(2),
            customer:{
                name: 'Hoang Hieu',
                address: {
                    street: 'Test street 1',
                    zipCode: '55331',
                    country: 'VietNam'
                },
                email: 'test@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        Axios.post("/orders.json",order).then(response=>{
            this.setState({
                loading: false,
                purchasing: false
            });
        })
        .catch(error=>{
            this.setState({
                loading: false,
                purchasing: false
            });
            console.log(error);
        });
    }
    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let burger =this.state.error ? <p>Something went wrongs</p> : <Spinner />;
        let orderSummary = null;
        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients = {this.state.ingredients}/>
                    <BuildControls 
                    ingredientsAdded = {this.addIngredientHandler}
                    ingredientsRemoved = {this.removeIngredientHandler}
                    disabled = {disabledInfo}
                    price = {this.state.totalPrice}
                    purchasable = {this.state.purchasable}
                    ordered = {this.purchaseHandler}
                    />
                </Aux>
            );
            orderSummary = (
                <OrderSummary 
                ingredients = {this.state.ingredients}
                price = {this.state.totalPrice}
                purchaseCanceled = {this.purchaseCancelHandler}
                purchaseContinued = {this.purchaseContinueHandler}
            />
            );
        }
        if(this.state.loading){
            orderSummary = <Spinner />
        }
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
export default withErrorHandler(BurgerBuilder, Axios);