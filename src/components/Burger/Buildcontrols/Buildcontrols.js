import React from 'react';
import classes from './Buildcontrols.css';
import Buildcontrol from './Buildcontrol/Buildcontrol';

const controls = [
    {label:'Salad',type:'salad' },
    {label:'Meat',type:'meat' },
    {label:'Cheese',type:'cheese' },
    {label:'Bacon',type:'bacon' }
];
const Buildcontrols  = (props) => (
    <div className={classes.Buildcontrols}>
    <p><strong>Current price : {props.price}</strong> </p>
        {
       controls.map(ctrl=>(
             <Buildcontrol key={ctrl.label} label={ctrl.label} added={() =>props.ingredientadd(ctrl.type)} 
                           removed={() =>props.ingredientremove(ctrl.type)} 
                            disabled = {props.disabled[ctrl.type]}
                            />
       ))
        }
        <button className={classes.OrderButton} onClick={props.purchasing} disabled={! props.purchasable} >ORDER NOW</button>
        
    </div>
    
    );

export default Buildcontrols;