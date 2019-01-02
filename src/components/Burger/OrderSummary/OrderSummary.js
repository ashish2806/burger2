import React, { Component } from 'react';
import Aux from '../../../hoc/_Aux/_Aux';
import Button from '../../Button/Button';3


class OrderSummary extends Component{

    componentWillUpdate(){
        console.log("component [order summary]");
    }
    render(){
        const list = Object.keys(this.props.ingredients).map(
            igKey=>{
                  return (<li key={igKey}><span style={{textTransform: 'capitalize'  }}>{igKey}</span>:{this.props.ingredients[igKey]}</li>);
            });
        return(
            <Aux>
            <p>Your order</p>
            <ul>
                    {list}
            </ul>
            <Button btnType='Success' clicked={this.props.continue}>Continue</Button>
            <Button btnType='Danger' clicked={this.props.cancel}>Cancel</Button>
        </Aux>
        )
    }
}



export default OrderSummary;