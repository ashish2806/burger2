import React, {Component } from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import  classes from './NavigationItems.css';
import { connect } from 'react-redux';
import Aux from '../../../hoc/_Aux/_Aux';

class NavaigationItems extends Component{
    

    render(){
        let Nav=null;   
             
                 Nav = <Aux>
                 <NavigationItem link="/">Burger Builder</NavigationItem>
                 {this.props.authenticate ? <NavigationItem exact link="/orders">ORDERS</NavigationItem> : null }
                {this.props.authenticate ? <NavigationItem link="/checkout">Checkout</NavigationItem> : null }
               {!this.props.authenticate ? <NavigationItem link="/auth">Auth</NavigationItem>
                : <NavigationItem link="/logout">LOGOUT</NavigationItem>}
                </Aux>;
             
        return(
            <ul className={classes.NavaigationItems}>
                {Nav}
           </ul>
        )
    }
}

const MapStateToProps = state => {
    return{
            loggedin : state.loggedin 
    };
};
export default connect(MapStateToProps)(NavaigationItems);

