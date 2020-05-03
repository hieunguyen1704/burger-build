import React from 'react';
import Aux from '../../hoc/Auxs';
import styles from './Layout.module.css'
const Layout = (props) =>{
    return(
        <Aux>
            <div>Toolbar, SideDrawer, BackDrop</div>
            <main className ={styles.Content}>
                {props.children} 
            </main>
        </Aux>
    );
}
export default Layout;
