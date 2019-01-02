import * as actionTypes from './actionType';
import axios from 'axios';

export const authStart = () =>{
    return{
        type:actionTypes.AUTH_START
    }
}

export const authFail = (error) =>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};


export const logout  = () =>{
    return{
        type :actionTypes.AUTH_LOGOUT
    }
}

export const authexpireTimrout = (exp_time) =>{
    return dispatch => {
        setTimeout(() =>{
            dispatch(logout());
        },exp_time *1000);
    }
}
export const auth  = (email,password,isSignup) =>{
    return dispatch => {
        dispatch(authStart());
        const authData ={
            email :email,
            password :password,
            returnSecureToken : true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDNixhUznL3vz3btZbubawvB6Ct26EMUrw';
        if(!isSignup){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDNixhUznL3vz3btZbubawvB6Ct26EMUrw';
        }
        axios.post(url,authData)
        .then(response => {
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(authexpireTimrout(response.data.expiresIn))
        })
        .catch(err =>{
            console.log(err)
            dispatch(authFail(err.response.data.error));
        })
    }
}