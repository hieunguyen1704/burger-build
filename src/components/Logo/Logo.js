import React from 'react';
import burgerLogo from '../../assets/burger-logo.png';
import styles from './Logo.module.css'
const Logo  = (props) => (
    <div className={styles.Logo} style={{height: props.height}}>
        <img  src={burgerLogo} alt="logo"/>
    </div>

);
export default Logo;