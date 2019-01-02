import React from 'react';
import classes from './Input.css';

const input = ( props ) =>{
   let inputElements = null;
   const inputElement = [classes.inputElement];
   if(props.invalid && props.shouldValidate && props.touched){
       inputElement.push(classes.Invalid);
   }
   switch(props.elementType){
        case('input'):
            inputElements = 
                    <input  onChange={props.clicked} className={inputElement.join(' ')}  {...props.elementConfig} value={props.value}  />;    
            break;
        case('textarea'):
            inputElements = <textarea onChange={props.clicked} className={inputElement.join(' ')}  {...props.elementConfig} value={props.value}  />;  
            break; 
        case('select'):
            inputElements = <select
                                     onChange={props.clicked} className={inputElement.join(' ')}  
                                      value={props.value}>
                                      {props.elementConfig.options.map(option =>{
                                         return(<option  key={option.value} value={option.value} >{option.displayvalue}</option>);
                                      }
                                      )}
                                 </select>;  
            break;        
        default:
            inputElements = <input onChange={props.clicked} className={inputElement.join(' ')}  {...props.elementConfig} value={props.value}  />;     
    }
    return(
        <div className={classes.input}>
            <label className={classes.Label} >{props.label}</label>
            {inputElements}
        </div>
    );
};

export default input;