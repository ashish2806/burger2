 import * as actionTypes from  '../actions/actionType';

const initialstate={
    orders:[],
    loading:false,
    purchased :false
}
const reducer =(state=initialstate,action)=>{
    switch(action.type){

        case actionTypes.PURCHASED_INIT:
        return{
            ...state,
            purchased:false
        }
        case actionTypes.BURGER_PURCHASE_SUCCESS:
        const newOrder= {
            ...action.orderData,
            id:action.orderId
        };
        return{
            ...state,
            loading:false,
            purchased :true,
            orders:state.orders.concat(newOrder)

        }
        case actionTypes.BURGER_PURCHASE_FAIL:
        return{
                ...state,
                loading:false
        }

        case actionTypes.BURGER_PURCHASE_START:
        return{
            ...state,
            loading:true
        }
        case actionTypes.FETCHED_ORDER_FAIL:
        return{
            ...state,
            loading:false 
        }
        case actionTypes.FETCHED_ORDER_SUCCESS:
        return{
            ...state,
            loading:false,
            orders : action.orders
        }
        case actionTypes.FETCHED_ORDER_START:
        return{
            ...state,
            loading:true
        }

        default:
        return state;
    }
}


export default reducer;