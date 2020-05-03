import React from 'react';
import styles from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawToggle from '../SideDraw/DrawToggle/DrawToggle';
const ToolBar = (props) =>(
    <header className={styles.Toolbar}>
        <DrawToggle clicked ={props.drawToggleClicked}/>
        <Logo height = "100%"/>
        <nav className={styles.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);
export default ToolBar;