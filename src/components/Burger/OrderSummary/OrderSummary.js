import React from 'react';
import Aux from '../../../hoc/Aux';

const OrderSummary = (props) =>{ 
    const list = Object.keys(props.ingredients).map(
        igKey=>{
              return (<li key={igKey}><span style={{textTransform: 'capitalize'  }}>{igKey}</span>:{props.ingredients[igKey]}</li>);
        });
    return(
        <Aux>
            <p>Your order</p>
            <ul>
                    {list}
            </ul>
        </Aux>
    );
}


export default OrderSummary;