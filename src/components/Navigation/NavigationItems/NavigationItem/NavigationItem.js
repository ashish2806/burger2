import React from 'react';
import classes from './NavigationItem.css';
import { NavLink } from  'react-router-dom';
const Navigationitem = (props) =>(

    <li className={classes.NavigationItem}>
        <NavLink 
            to={props.link} 
            exact ={props.exact}
            className={props.active ? classes.active:null}>
            {props.children}
        </NavLink>
    </li>
);


export default  Navigationitem; 