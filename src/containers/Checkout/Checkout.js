import React, { Component } from 'react';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Checkout extends Component{
    
    CheckoutcontinueHandler = () =>{
            this.props.history.push('/checkout/content-data')
    }
    CheckoutcancelHandler = () =>{
        this.props.history.goBack();
    }

    componentWillMount(){
       
    }
   
    render(){
        let summary = <Redirect to="/" />;
        const rediredpurchase = this.props.purchased ? <Redirect to="/" />:null;
        if(this.props.ings){
            summary = (
                
            <div>
                {rediredpurchase}
                <CheckoutSummary  ingredient={this.props.ings}
                    Checkoutcancel={this.CheckoutcancelHandler}
                    Checkoutcontinue={this.CheckoutcontinueHandler}
                    />                    
                    <Route path={this.props.match.path + '/content-data'} 
                            //render={(props) => (<ContactData ingredients = {this.state.ingredients}  price={this.state.price} {...props} />)}
                            component={ContactData}
                    />
                
            </div>
            );
        }
        return summary ;
    }
}

const mapStatetoProps = state =>{
    return {
        ings : state.burgerBuilder.ingredient,
        purchased :state.order.purchased
    };
}

export default connect(mapStatetoProps)(Checkout);