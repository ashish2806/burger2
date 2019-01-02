
import React, { Component } from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import AUX from '../../../hoc/Aux/Aux';

class Model extends Component{
    shouldComponentUpdate(nextProps,nextState){
        console.log(nextProps.children +"---------"+ this.props.children);
       return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }
    render(){
        return(
            <AUX>   
            <Backdrop show={this.props.show} cancel={this.props.cancel}/>
        <div className={classes.Modal}
        style ={{
            transform : this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity : this.props.show ? ' 1' : '0'
        }}
        >

            {this.props.children}
        </div>
        </AUX>
        );
    }
}



export default Model;
