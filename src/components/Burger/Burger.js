import React from 'react';
import Burgeringredients from './Burgeringredients/Burgeringredients';
import classes from './Burger.css';

const Burger = (props) =>{


    //console.log(props.ingredient);
    /*const tri = Object.keys(props.ingredient).map(igkey =>{
        return [...Array(props.ingredient[igkey])].map((_,i) =>{ //
            return <Burgeringredients key={igkey+i} type={igkey}/>

        });
    });*/
    let tri = null;
    if(Object.keys(props.ingredient).length>0){
         tri = Object.keys(props.ingredient).map(igkey =>{
            return [...Array(props.ingredient[igkey])].map((_,i)=>{
                 return <Burgeringredients key={igkey+i} type={igkey}/>
            });
         }).reduce(getval);
     //.redude((arr,val)=>{ return arr.concat(val);}); //callback
      //can also be wrriten like this
          function getval(arr,val){
             return arr.concat(val);
         }
    
    
/*
  let a=[[],[],[],[]];
   
   console.log(a.reduce((acc,val)=>{
    return acc.concat(val);
   }));**/
    if(tri.length === 0)
    {
         tri= (<p>Please start adding ingredients</p>);
    }
}
    return(
        <div className={classes.Burger}>
            <Burgeringredients type="bread-BreadTop"/>
           {tri}
            <Burgeringredients type="bread-bottom"/>
        </div>
    );

}

export default Burger;