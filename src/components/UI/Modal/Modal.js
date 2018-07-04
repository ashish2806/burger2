
import React from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import AUX from '../../../hoc/Aux';


const modal = (props) =>{
    return(
        <AUX>
            <Backdrop show={props.show} cancel={props.cancel}/>
        <div className={classes.Modal}
        style ={{
            transform : props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity : props.show ? ' 1' : '0'
        }}
        >

            {props.children}
        </div>
        </AUX>
    );
}


export default modal;
