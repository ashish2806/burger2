import * as actionTypes from  '../actions/action';


const initialState = {
    ingredient:{
        salad:0,
        meat:0,
        cheese:0,
        bacon:0
         },
         totalPrice :1,
         email:'',
         password:'',
         loggedin : false
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

        case (actionTypes.ONLOGGEDIN):
        {
            
            
            return{
                ...state,
                loggedin :true
            }//to update array immutibly use conact instead of push
        }
        case (actionTypes.ONLOGGEDOUT):
        {
            sessionStorage.setItem("userData","");
            sessionStorage.clear();
            
            return{
                ...state,
                loggedin : false
            }//to update array immutibly use conact instead of push
        }
        case (actionTypes.ONEMAIL):
        {
            return{
                ...state,
                email : action.value
            }
        }
        case (actionTypes.ONPASSWORD):
        {
            return{
                ...state,
                password : action.value
            }
        }
        default :
        return state;
    }
}

export default reducer;