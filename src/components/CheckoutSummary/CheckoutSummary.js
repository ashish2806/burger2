import React from 'react';
import Burger from '../Burger/Burger';
import Button from '../Button/Button';
import classes from './CheckoutSummary.css';
const CheckoutSummary = ( props ) =>{
    return(
            <div>   
                <div className={classes.CheckoutSummary}>
                        <h1>Your Order</h1>
                        <div style={{ width:'100%',margin:'auto'}}>
                        <Burger ingredient={props.ingredient}/>
                        </div>
                
                        <Button btnType="Success" clicked={props.Checkoutcancel}>CANCEL</Button>
                        <Button btnType="Danger" clicked={props.Checkoutcontinue}>CONTINUE</Button>
                </div>

            </div>      
    );
}


export default CheckoutSummary;