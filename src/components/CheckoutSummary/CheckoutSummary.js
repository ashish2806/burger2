import React from 'react';
import Burger from '../Burger/Burger';
import Button from '../Button/Button';
import classes from './CheckoutSummary.css';
const CheckoutSummary = ( props ) =>{
    return(
            <div>   
                    <div className={classes.CheckoutSummary}>
                    <h1>Your Order</h1>
                    <Burger ingredient={props.ingredient}/>
                    </div>
                    <div style={{ width:'300px',margin:'auto'}}>
                    <Button  clicked={props.Checkoutcancel}>CANCEL</Button>
                    <Button clicked={props.Checkoutcontinue}>CONTINUE</Button>
                    </div>

            </div>      
    );
}


export default CheckoutSummary;