import React from 'react';
import classes from './Toolbar.css';
import BurgerLogo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/Navigationitems'
const Toolbar = (props) =>(
    <header className={classes.Toolbar}>
        <div className={classes.DrawerToggle} onClick={props.getclicked} >
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div className={classes.Logo}><BurgerLogo /></div>
        <nav className={classes.DesktopOnly}><NavigationItems /></nav>
        
    </header>
);

export default Toolbar;