import React from 'react';
import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];
const BuildControls = (props) =>{
    return (
        <div className = {styles.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(control => {
                return <BuildControl 
                label ={control.label} 
                key={control.label}
                added = {() => props.ingredientsAdded(control.type)}
                removed = {()=>props.ingredientsRemoved(control.type)}
                disabled = {props.disabled[control.type]}
                />
            })}
            <button 
            className={styles.OrderButton}
            disabled = {!props.purchasable}
            onClick={props.ordered}
            >ORDER NOW</button>
        </div>
    );
}
export default BuildControls;