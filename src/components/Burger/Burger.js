import React from 'react'
import styles from './Burger.module.css'
import BurgerIngredient from './BurgerIngredients/BurgerIngredient'
const Burger = (props) =>{
    let transformIngredients = Object.keys(props.ingredients).map(igKey=>{
        return [...Array(props.ingredients[igKey])].map((_,index)=>{
            console.log([...Array(props.ingredients[igKey])]);
            return <BurgerIngredient type={igKey} key = {igKey + index}/>
        })// create array of array
    }).reduce((arr,el) => {
        return arr.concat(el);
    },[]); 
    //we need to create of one array so we use reduce
    if(transformIngredients.length === 0){
        transformIngredients = <p>Please add ingredients</p>;
    }
    console.log(transformIngredients);
    return(
        <div className={styles.Burger}>
            <BurgerIngredient type="break-top"/>
            {transformIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}
export default Burger;