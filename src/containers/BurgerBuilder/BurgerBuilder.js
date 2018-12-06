import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import Buildcontrols from '../../components/Burger/Buildcontrols/Buildcontrols';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import { connect } from 'react-redux' 
import * as actionType from '../../store/action';
import axios from '../../../src/Axios-orders';


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
            return sum>0;
    }
    /*addIngredientsHandler= (type) => {
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

    }*/
    purchasingHandler = () =>{
            this.setState({purchasing : true});
            
    }
    cancelHandler = () =>{
        this.setState({purchasing : false});
    }
    continueHandler = () =>{
        //alert("Contonue with backend");.
        const order = {
            ingredients:this.props.ings
        }
        axios.post('/orders.json',order)
        .then(response => console.log(response))
        .catch(error  => console.log(error));

        /*const passint =[];
        for(let i in this.state.ingredient){
            passint.push(encodeURIComponent(i) +"="+encodeURIComponent(this.state.ingredient[i ]));
        }
        const queryString = passint.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search:  queryString
        });*/
    }
        render(){
            
            const disabledinfo = {
                ...this.props.ings
            };
         //  console.log(disabledinfo);

            for(let k in disabledinfo){
                disabledinfo[k] = disabledinfo[k] <= 0;
            }
         //   console.log(disabledinfo);
            return(
                <Aux>
                    
                    <Modal show={this.state.purchasing} cancel={this.cancelHandler}>
                        <OrderSummary
                        ingredients={this.props.ings}
                        cancel = {this.cancelHandler}
                        continue={this.continueHandler}
                        />
                    </Modal>
                    <Burger ingredient={this.props.ings}   />
                    <Buildcontrols ingredientadd={this.props.onIngredientAdded}
                                   ingredientremove={this.props.onIngredientRemoved} 
                                   
                                   disabled={disabledinfo}
                                   purchasable={this.updatePurchasable(this.props.ings)}
                                   purchasing={this.purchasingHandler}
                                   price = {this.props.price}
                                   />
                </Aux>
            );
        }
}

const mapStatetoProps = state =>{
    return {
        ings : state.ingredient,
        price : state.totalPrice
    };
}
const mapDispatchtoProps = dispatch =>{
    return {
        onIngredientAdded : (ingName) =>dispatch({ type: actionType.ADD_INGREDIENT ,ingredientName :ingName}),
        onIngredientRemoved : (ingName) =>dispatch({ type: actionType.REMOVE_INGREDIENT ,ingredientName :ingName})
    };
}

export default connect(mapStatetoProps,mapDispatchtoProps)(BurgerBuilder);

