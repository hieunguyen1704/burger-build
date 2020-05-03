import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SideDraw.module.css';
import BackDrop from '../../UI/BackDrop/BackDrop';
import Aux from '../../../hoc/Auxs';
const SideDraw = (props) =>{
    let attachedClass = [styles.SideDraw, styles.Close];
    if(props.open){
        attachedClass = [styles.SideDraw, styles.Open];
    } 
    return (
        <Aux>
            <BackDrop show={props.open} clicked = {props.closed}/>
            <div className={attachedClass.join(" ")}>
                <Logo height ="11%" style={{marginBottom: "32px"}}/>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>

    );
}
export default SideDraw;