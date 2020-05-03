import React from 'react';
import styles from './DrawToggle.module.css'
const DrawToggle = (props) =>(
    <div onClick={props.clicked} className={styles.DrawerToggle}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);
    
export default DrawToggle;