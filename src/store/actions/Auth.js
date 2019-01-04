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
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
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
            const expirationDate = new Date (new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token',response.data.idToken);
            localStorage.setItem('userId',response.data.localId);
            localStorage.setItem('expirationDate',expirationDate);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(authexpireTimrout(response.data.expiresIn))
        })
        .catch(err =>{
            console.log(err)
            dispatch(authFail(err.response.data.error));
        })
    }
}


export const  authRedirectPath = (path) =>{
    return{
        type :actionTypes.AUTH_REDIRECT_PATH,
        path:path
    }
}


export const authCheckState = () =>{
    return dispatch =>{
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate < new Date()){
                dispatch(logout());
            }else{
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token,userId));
                dispatch(authexpireTimrout( (expirationDate.getTime() - new Date().getTime())/1000 ));
            }
           
        }
    }
}