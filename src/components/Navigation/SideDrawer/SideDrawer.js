import React from 'react';
import NavaigationItems from '../NavigationItems/Navigationitems';
import BurgerLogo from '../../Logo/Logo';
import classes from './SideDrawer.css';
import Aux from '../../../hoc/_Aux/_Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';
const SideDrawer = ( props ) =>{
    let  attachedClass = [classes.SideDrawer , classes.Close];
    if(props.show){
        attachedClass = [classes.SideDrawer , classes.Open];
    }

    return(
        <Aux>
            <Backdrop show={props.show} cancel={props.closed} />
                <div className={attachedClass.join(' ')}>
                    <div className={classes.Logo}><BurgerLogo /></div>
                    <nav>
                        <NavaigationItems authenticate={props.auth}/>
                    </nav>
                </div>
        </Aux>
    );
}


export default SideDrawer;  