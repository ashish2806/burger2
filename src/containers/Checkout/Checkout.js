import React, { Component } from 'react';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';

class Checkout extends Component{
    state = {
        ingredients:{
            salad :1,
            meat :1,
            bacon:1,
            cheese:1
        }
    }
    CheckoutcontinueHandler = () =>{
            this.props.history.push('/checkout/content-data')
    }
    CheckoutcancelHandler = () =>{
        this.props.history.goBack();
    }

    componentDidMount(){
        const query = new URLSearchParams( this.props.location.search);

        const ingredients ={};
        console.log("fff");
        console.log(query.get('?salad'));
        console.log(query.entries());
        
        for (let param of query.entries()){
            console.log(param);
            ingredients[param[0]] = +param[1];
        }
        
        this.setState({ ingredients : ingredients});
        
    }
    render(){
        return(
            <div>
                <CheckoutSummary  ingredient={this.state.ingredients}
                    Checkoutcancel={this.CheckoutcancelHandler}
                    Checkoutcontinue={this.CheckoutcontinueHandler}
                    />
                <Route path={this.props.match.path + '/content-data'} component={ContactData} />                    
                <Route path={this.props.match.path + '/content-data'} 
                            render={()=>(<ContactData ingredient ={this.state.ingredients} />)} 
                            />                    
                
            </div>
        );
    }
}


export default Checkout;