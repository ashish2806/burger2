import * as actionTypes from './actionType';
import axios from '../../../src/Axios-orders';

export const addIngredient = (name) =>{
    return{
        type:actionTypes.ADD_INGREDIENT,
        ingredientName : name

    }
}


export const removeIngredient = (name) =>{
    return{
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName : name

    }
}
export const setIngerdients  = (ingredients) => {
    return{
        type:actionTypes.SET_INGRDIENTS,
        ingredients :ingredients
    }
}

export const FetchIngredientsfailed  = () => {
    return{
        type:actionTypes.FETCH_INGRDIENTS_FAILED
    }
}
export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-my-burger-ba850.firebaseio.com/ingredients.json')
        .then(response=>{
            console.log(response.data);
            dispatch(setIngerdients(response.data));
        })
        .catch(error=>{
            dispatch(FetchIngredientsfailed());
        })

    };
}