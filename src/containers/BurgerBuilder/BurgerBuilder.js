import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import Buildcontrols from '../../components/Burger/Buildcontrols/Buildcontrols';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
const PRICES ={
    salad:1,
    meat:2,
    cheese:3,
    bacon:4
}
class BurgerBuilder extends Component{
   /* constructor(props){
        super(props);
        this.state={

        };

    }*/
    state={
        ingredient:{
        salad:0,
        meat:0,
        cheese:0,
        bacon:0
         },
         price :1,
         purchasable:false,
         purchasing:false
    }
     
    updatePurchasable = (ingredients) =>{
       

        const sum = Object.keys(ingredients).map(igKey =>{
                return ingredients[igKey];
        }).reduce((sum,el)=>{
                return sum+el;
        },0);
        this.setState({purchasable:sum>0});    
    }
    addIngredientsHandler= (type) => {
        const oldcount = this.state.ingredient[type];
        const newcount = oldcount+ 1;
        const updatedIngredients = {
                ...this.state.ingredient
        };
        updatedIngredients[type] = newcount;
        const oldprice = this.state.price;
        const priceaddition = PRICES[type];
        const newprice = oldprice + priceaddition;

        this.setState({
            price : newprice,
            ingredient :updatedIngredients  

        });
        this.updatePurchasable(updatedIngredients);
    }




    removeIngredientsHandler= (type) => {
        const oldcount = this.state.ingredient[type];
        if(oldcount <= 0 ){
            return;
        }
        const newcount = oldcount - 1;
        const updatedIngredients = {
                ...this.state.ingredient
        };
        updatedIngredients[type] = newcount;
        const oldprice = this.state.price;
        const pricedeletion = PRICES[type];
        const newprice = oldprice - pricedeletion;

        this.setState({
            price : newprice,
            ingredient :updatedIngredients  

        });
        this.updatePurchasable(updatedIngredients);

    }
    purchasingHandler = () =>{
            this.setState({purchasing : true});
    }
    cancelHandler = () =>{
        this.setState({purchasing : false});
    }
        render(){
            
            const disabledinfo = {
                ...this.state.ingredient
            };
         //  console.log(disabledinfo);

            for(let k in disabledinfo){
                disabledinfo[k] = disabledinfo[k] <= 0;
            }
         //   console.log(disabledinfo);
            return(
                <Aux>
                    
                    <Modal show={this.state.purchasing} cancel={this.cancelHandler}>
                        <OrderSummary ingredients={this.state.ingredient}/>
                    </Modal>
                    <Burger ingredient={this.state.ingredient}   />
                    <Buildcontrols ingredientadd={this.addIngredientsHandler}
                                   ingredientremove={this.removeIngredientsHandler} 
                                   disabled={disabledinfo}
                                   purchasable={this.state.purchasable}
                                   purchasing={this.purchasingHandler}
                                   price = {this.state.price}
                                   />
                </Aux>
            );
        }
}

export default BurgerBuilder;

