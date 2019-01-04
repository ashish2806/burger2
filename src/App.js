import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import './App.css';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route,Switch,withRouter,Redirect } from 'react-router-dom';
import Login from './containers/Login/Login';
import Logout from './containers/Logout/Logout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

class App extends Component {

componentDidMount(){
  this.props.onTryAutoSignup();
}

  render () {
    let route = (
          <Switch>
            <Route path="/auth" component={Auth} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to ="/" />
          </Switch>
    );
    if(this.props.isAuthenticate){
      route = (
        <Switch>
            <Route path="/checkout" exact component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to ="/" />
          </Switch>
      );
    }
    return (
      <div>
        <Layout>
          {route}
        </Layout>
      </div>
    );
  }
}

const mapstatesToProps = state =>{
  return{
    isAuthenticate : state.auth.token !== null
  }
}
const mapDispatchToProps = dispatch =>{
  return{
    onTryAutoSignup : () =>dispatch(actions.authCheckState() )
  }
}

export default withRouter(connect(mapstatesToProps, mapDispatchToProps)(App));
