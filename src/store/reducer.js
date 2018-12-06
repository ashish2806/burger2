import * as actionTypes from  './action';


const initialState = {
    ingredient:{
        salad:0,
        meat:0,
        cheese:0,
        bacon:0
         },
         totalPrice :1
};
const PRICES ={
    salad:1,
    meat:2,
    cheese:3,
    bacon:4
}

const reducer = (state=initialState , action) =>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
      //  alert(action.ingredientName);
        return{
            ...state,
            ingredient:{
                 ...state.ingredient,
                 [action.ingredientName] : state.ingredient[action.ingredientName] + 1 
                 },
            totalPrice : state.totalPrice + PRICES[action.ingredientName]     

             
           
        };
        case actionTypes.REMOVE_INGREDIENT:
        return{
            ...state,
            ingredient:{
                 ...state.ingredient,
                 [action.ingredientName] : state.ingredient[action.ingredientName] -  1 
                 },
            totalPrice : state.totalPrice - PRICES[action.ingredientName]
             

        };
        default :
        return state;
    }
}

export default reducer;