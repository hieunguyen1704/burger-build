import React,{Component} from 'react';
import Aux from '../../hoc/Auxs';
import styles from './Layout.module.css';
import ToolBar from '../Navigation/Toolbar/Toolbar'
import SideDraw from '../Navigation/SideDraw/SideDraw'
class Layout extends Component{
    state={
        showSideDraw: false
    }
    sideDrawClosedHandler = () =>{
        this.setState({
            showSideDraw: false
        });
    }
    drawToggleHandler = () =>{
        this.setState((prevState)=>({ showSideDraw: !prevState.showSideDraw})); 
    }
    render(){
        return(
            <Aux>
                <ToolBar drawToggleClicked= {this.drawToggleHandler}/>
                <SideDraw closed={this.sideDrawClosedHandler} open={this.state.showSideDraw}/>
                <main className ={styles.Content}>
                    {this.props.children} 
                </main>
            </Aux>
        );
    }
}
export default Layout;
