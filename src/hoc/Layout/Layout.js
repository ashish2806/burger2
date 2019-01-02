import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../_Aux/_Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';



class Layout extends Component{
    state={
        showSideDrawer:false
    }

    SideDrawerClosedHandler = () =>{
        this.setState({
            showSideDrawer:!this.state.showSideDrawer

        });
    }

    
    render(){
        return(
            <Aux>
            <Toolbar auth={this.props.isAuth} getclicked={this.SideDrawerClosedHandler} />
            <SideDrawer auth={this.props.isAuth} show={this.state.showSideDrawer} closed={this.SideDrawerClosedHandler} />
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>  
        );
    }
}

const mapStatetoProps = state =>{
    return{
        isAuth : state.auth.token !== null
    }
}
export default connect(mapStatetoProps)(Layout);