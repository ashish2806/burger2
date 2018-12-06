import React, { Component } from 'react';
import classes from './Burgeringredients.css';
import propTypes from 'prop-types';
class Burgeringredients extends Component{
  render(){
    let ingredients = null;
    
    switch(this.props.type){

        case ('bread-bottom'):
        ingredients = <div className={classes.BreadBottom}></div>;
        break;

        case ('bread-BreadTop'):
        ingredients = (<div className={classes.BreadTop}>
                                <div className={classes.Seeds1}></div>
                                <div className={classes.Seeds2}></div>
                        </div>);
        break;
        case ('cheese'):
        ingredients = (<div className={classes.Cheese}> </div>); 
        break;
        case ('salad'):
        ingredients = (<div className={classes.Salad}> </div>);
        break;
        case ('meat'):
        ingredients = (<div className={classes.Meat}> </div>);
        break;
        case ('bacon'):
        ingredients = (<div className={classes.Bacon}> </div>);
        break;
         default:
         ingredients = null;
         break;
    }
    return (ingredients);

  }
}

  Burgeringredients.propTypes={
    type : propTypes.string.isRequired
  }
  export default Burgeringredients;









 

