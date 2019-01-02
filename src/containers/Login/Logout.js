import React, { Component } from 'react';
import './Login.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import * as actionType from '../../store/actions/actionType';
import { connect } from 'react-redux';
class Logout extends Component
{
   

    
    componentDidMount()
    {
        this.props.onLoggedout();
        console.log(this.props.loggedin);
        
    }
    render()
    {
        return (<Redirect to='/' />)
    }
}
const MapStateToProps = state => {
    return{
            loggedin : state.loggedin 
    };
};

const MapDispatchToProps = dispatch =>{
        return{
            onLoggedout : () => dispatch({ type : actionType.ONLOGGEDOUT})

        };
};

export default connect(MapStateToProps,MapDispatchToProps)(Logout);