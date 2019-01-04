import React , { Component } from "react";

import Input from '../../components/UI/Input/Input';
import Button from '../../components/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
class Auth extends Component{
    state={
        controls:{
            email:{
                elementType :'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your Email'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched : false
            },
            password:{
                elementType :'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Your Password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6
                },
                valid:false,
                touched : false
            }
           
        },
        isSignup : true
    }

        componentDidMount (){
            if(!this.props.buildingBurger && this.props.AuthenticatePath != '/'){
                this.props.onSetAuthRedirectPath();
            }
        }
    checkvalidity(value,rules){
        let is_valid= true   ;
         if(rules.required){
             is_valid = value.trim() !== '' && is_valid;
         }
 
         if(rules.minLength){
             is_valid = value.length >= rules.minLength && is_valid;
         }
         if(rules.maxLength){
             is_valid = value.length <= rules.maxLength && is_valid;
         }
         return is_valid;
     }
    inputChnageHandler = (event,inputIdentifier) =>{
        const controlForm = {
            ...this.state.controls
        }
        const updateFormElement = {
            ...controlForm[inputIdentifier]
        }

        updateFormElement.value = event.target.value;
        updateFormElement.valid = this.checkvalidity(updateFormElement.value,updateFormElement.validation);
        updateFormElement.touched = true;
        controlForm[inputIdentifier] = updateFormElement;
        
        this.setState({controls : controlForm});
        //console.log("formValid="+this.state.formValid);



    }

    switchHandler = () =>{
        this.setState(
            prevState=>{
                return{isSignup : !prevState.isSignup}
            }
        )
    }
    authHandler = (event) =>{
        //alert();
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup);
    }
    render(){
        const formElementArray = [];
        for(let key in this.state.controls){
            formElementArray.push({
                id:key,
                config:this.state.controls[key]
            });
        }
        
        let form =  (
                    <form onSubmit={this.authHandler}>
                    
                        {formElementArray.map(formElement=>(
                            <Input 
                                key={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig = {formElement.config.elementConfig}
                                value = {formElement.config.value}
                                invalid = {!formElement.config.valid}
                                shouldValidate = {formElement.config.validation}
                                touched = {formElement.config.touched}
                                clicked={(event)=>this.inputChnageHandler(event,formElement.id)}
                            />

                        ))}
                            <Button  btnType="Success" > {this.state.isSignup ? 'SIGNUP':'SIGNIN'} </Button>{/*clicked={this.orderHandler}*/}
                           
                    </form>
                   
        );
        if(this.props.loading){
           form = <Spinner /> 
        } 
        let errorMessage = '';

        if(this.props.error){
            errorMessage = this.props.error.message;
        }
        let tr = null;
        
        if(this.props.isAuthenticate){
            tr=<Redirect to={this.props.AuthenticatePath} />
        }
        return(
            <div className={classes.contactData}>
           {tr}
            {errorMessage}
                {form}
                <Button btnType="Danger" clicked={this.switchHandler} >Switch to {this.state.isSignup ? 'SIGNIN':'SIGNUP'}</Button>
            </div>
        );
    }
}
const mapStatetpProps = state => {
    return{
            loading : state.auth.loading,
            error : state.auth.error,
            isAuthenticate : state.auth.token !== null,
            buildingBurger : state.burgerBuilder.building,
            AuthenticatePath : state.auth.Auth_redirec_path
    }
}

const mapDispatchtoProps = dispatch =>{
    return{
        onAuth : (email,password,isSignup) =>dispatch(actions.auth(email,password,isSignup)),
        onSetAuthRedirectPath : () =>dispatch(actions.authRedirectPath('/'))
    }
}
export default connect(mapStatetpProps,mapDispatchtoProps)(Auth);