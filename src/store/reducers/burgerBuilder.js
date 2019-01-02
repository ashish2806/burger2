import * as actionTypes from  '../actions/actionType';
import { updateObject } from '../utility';

const initialState = {
    ingredient:null,
         totalPrice :1,
         email:'',
         password:'',
         loggedin : false,
         error:false
};
const PRICES ={
    salad:1,
    meat:2,
    cheese:3,
    bacon:4
}

const addingr = (state,action) =>{
    const updateingredient  = {[action.ingredientName] : state.ingredient[action.ingredientName] + 1 };
            const updateingredients = updateObject(state.ingredient,updateingredient);
            const updatestate = {
                ingredient:updateingredients,
            totalPrice : state.totalPrice + PRICES[action.ingredientName]
            }
            return updateObject(state,updatestate);

}
const reducer = (state=initialState , action) =>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:return addingr(state,action); //shorter way
      //  alert(action.ingredientName);
            
        case actionTypes.REMOVE_INGREDIENT:
            const updateingredient1  = {[action.ingredientName] : state.ingredient[action.ingredientName] - 1 };
            const updateingredients1 = updateObject(state.ingredient,updateingredient1);
            const updatestate1 = {
                ingredient:updateingredients1,
            totalPrice : state.totalPrice + PRICES[action.ingredientName]
            }
            return updateObject(state,updatestate1);
        case actionTypes.SET_INGRDIENTS:

            return updateObject(state,{
                ingredient:{
                salad :action.ingredients.salad,
                meat : action.ingredients.meat,
                cheese : action.ingredients.cheese,
                bacon : action.ingredients.bacon
                
            },
            totalPrice:1,
            error:false});
            
        
        case actionTypes.FETCH_INGRDIENTS_FAILED:

        return updateObject(state,{error:true});  

        case (actionTypes.ONLOGGEDIN):
        {
            return updateObject(state,{loggedin:true});  
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