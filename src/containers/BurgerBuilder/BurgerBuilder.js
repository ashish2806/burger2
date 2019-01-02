import React, { Component } from 'react';
import Aux from '../../hoc/_Aux/_Aux';
import Burger from '../../components/Burger/Burger';
import Buildcontrols from '../../components/Burger/Buildcontrols/Buildcontrols';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import { connect } from 'react-redux' 
import * as actions from '../../store/actions/index';
import axios from '../../../src/Axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErroHandler from '../../hoc/WithErrorHandler/WitherroHandler';
class BurgerBuilder extends Component{
   /* constructor(props){
        super(props);
        this.state={

        };

    }*/
    state={
       
       
         purchasable:false,
         purchasing:false,
         loading:false
    }   
     

    componentDidMount(){
        this.props.onsetingredients();
       /* axios.get('https://react-my-burger-ba850.firebaseio.com/ingredients.json')
        .then(response=>{
            this.setState( { ingredients: response.data } );
        })
        .catch(error=>{
            console.log(error);
        })*/
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
        this.props.onpurchasedinit();
        //alert("Contonue with backend");.
        
       /*this.setState({loading:true});
        const order = {
            ingredients:this.props.ings
        }
        axios.post('/orders.json',order)
        .then(response => this.setState({loading:false,purchasing:false}))
        .catch(error  => this.setState({loading:false,purchasing:false}));
        */
        /*const passint =[];
        for(let i in this.state.ingredient){
            passint.push(encodeURIComponent(i) +"="+encodeURIComponent(this.state.ingredient[i ]));
        }
        const queryString = passint.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search:  queryString
        });*/

       /* let queryParams = [];
        for(let i in this.props.ings){
            queryParams.push(encodeURIComponent(i) +"="+encodeURIComponent(this.props.ings[i]));
        }
        queryParams.push('price='+this.props.price);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname : '/checkout',
            search:'?' + queryString
        });*/
        this.props.history.push({
            pathname:'/checkout'
        });
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
         let orderSummary='';
         if(this.props.ings){
          orderSummary = <OrderSummary
         ingredients={this.props.ings}
         cancel = {this.cancelHandler}
         continue={this.continueHandler}
         />;
         }
        /* if(this.state.loading){
            orderSummary = <Spinner />;
         }*/
         console.log(this.props.ings);
         let burger= this.props.error ? <p>Failed</p> : <Spinner />;
         if(this.props.ings){
             burger = (<Aux>
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
            return(
                <Aux>
                    
                    <Modal show={this.state.purchasing} cancel={this.cancelHandler}>
                        {orderSummary}                        
                    </Modal>
                    {burger}
                </Aux>
            );
        }
}

const mapStatetoProps = state =>{
    return {
        ings : state.burgerBuilder.ingredient,
        price : state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.  error
    };
}
const mapDispatchtoProps = dispatch =>{
    return {
        onIngredientAdded : (ingName) =>dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved : (ingName) =>dispatch(actions.removeIngredient(ingName)),
        onsetingredients : () =>dispatch(actions.initIngredients()),
        onpurchasedinit :() =>dispatch(actions.purchasedinit())
    };
}

export default connect(mapStatetoProps,mapDispatchtoProps)(WithErroHandler(BurgerBuilder,axios));

