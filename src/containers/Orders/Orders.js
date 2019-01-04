  import React, { Component } from  'react';
  import Order from '../../components/Order/Order';
  import { connect } from 'react-redux';
  import * as actionTypes from '../../store/actions/index';
  class Orders extends Component{

    componentDidMount(){
        this.props.onFetchedOrdes();
    }
      render(){
          return(
            <div>
                {console.log(this.props.orders)}
                {this.props.orders.map(order=>(
                   <Order key={order.id}
                        ingredients = {order.ingredients}
                    />
                ))} 

                               
            </div>
          );
      }

  }
const mapStatesToProps = state =>{
    return{
        orders:state.order.orders,
        loading : state.order.loadinig
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onFetchedOrdes : () => dispatch(actionTypes.fetchedOrder())
    }
}
  export default connect(mapStatesToProps,mapDispatchToProps)(Orders);
