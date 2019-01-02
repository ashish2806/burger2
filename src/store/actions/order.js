import * as actionTypes from './actionType';
import axios from '../../Axios-orders';
export const purchaseBurgerSuccess = (id,orderData) =>{
    return{
        type:actionTypes.BURGER_PURCHASE_SUCCESS,
        orderId : id,
        orderData : orderData
    }
}


export const purchaseBurgerFail = (error) =>{
    return{
        type : actionTypes.BURGER_PURCHASE_FAIL,
        error : error
    }
}

export const purchaseBurgerStart = () =>{
    return{
        type : actionTypes.BURGER_PURCHASE_START
    }
}

export const purchaseBurger = (orderData) =>{
    alert();
    return dispatch =>{
        dispatch(purchaseBurgerStart());
        axios.post('orders.json',orderData)
        .then(
            response=>{
                dispatch(purchaseBurgerSuccess(response.data,orderData));
        })
        .catch(error=>{
            dispatch(purchaseBurgerFail(error));
        });

    }
}


export const purchasedinit  = () => {
    return{
        type : actionTypes.PURCHASED_INIT
    }
}

export const fetchedOrderStart = () =>{
    return{
        type : actionTypes.FETCHED_ORDER_START
    }
}


export const fetchedOrderFail = (error) =>{
    return{
        type : actionTypes.FETCHED_ORDER_FAIL,
        error:error
    }
}

export const fetchedOrderSuccess = ( orders ) =>{
    return{
        type:actionTypes.FETCHED_ORDER_SUCCESS,
        orders : orders
    }
}

export const fetchedOrder = () =>{

    return dispatch =>{
        axios.get('orders.json')
        .then(res=>{
            const fetchedOrder =[];
            for(let key in res.data){
                fetchedOrder.push({
                    ...res.data[key],
                    id:key
                });
            }
            dispatch(fetchedOrderSuccess(fetchedOrder));
        })
        .catch(err =>{
            dispatch(fetchedOrderFail(err));
        })
    }

}