import React, { Component } from 'react';
import Button from '../../../components/Button/Button';
import classes from './ContactData.css';
import axios from '../../../../src/Axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/WithErrorHandler/WitherroHandler';
class ContactData extends Component {

    state={
        orderForm:{
            name:{
                elementType :'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched : false
            },
            street:{
                elementType :'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Street'
                },
                value:'',
                validation:{
                    required:true
                }    ,
                valid:false,
                touched : false
            },
            zipCode:{
                elementType :'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Zip'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:5
                } ,
                valid:false,
                touched : false
            },
            country:{
                elementType :'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your country'
                },
                value:'',
                validation:{
                    required:true
                } ,
                valid:false,
                touched : false
            },
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
            deliverMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:"fastest",displayvalue:"Fastest"},
                        {value:"chepest",displayvalue:"Cheapest"}
                    ]
                },
                value:'fastest',
                validation:{},
                valid:true
            }
        },
        formValid:false

    }
    componentWillMount(){
      //  console.log(this.props.ingredients);
    }

    orderHandler = (event) => {
        event.preventDefault();
        //this.setState({loading:true}); 
        const formdata = {};

        for (let k in this.state.orderForm){
            formdata[k] = this.state.orderForm[k].value; 
        }
        const order = {
            ingredients:this.props.ings,
            orderdata : formdata

        }
        this.props.onOrderBurger(order);

        /*axios.post('/orders.json',order)
        .then(response =>{ 
            this.setState({loading:true});
            this.props.history.push('/');
        })
        .catch(error  =>  this.setState({loading:true}));*/
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
        console.log(event.target.value);
        const updateOrderForm = {
            ...this.state.orderForm
        }
        const updateFormElement = {
            ...updateOrderForm[inputIdentifier]
        }

        updateFormElement.value = event.target.value;
        updateFormElement.valid = this.checkvalidity(updateFormElement.value,updateFormElement.validation);
        updateFormElement.touched = true;
        updateOrderForm[inputIdentifier] = updateFormElement;
        let formValid_c = true;
        for(let i in updateOrderForm){
            formValid_c = updateOrderForm[i].valid && formValid_c;
        }
        
        this.setState({orderForm : updateOrderForm,formValid:formValid_c});
        console.log("formValid="+this.state.formValid);



    }
    render(){
        const formElementArray = [];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }
        let form =  (
                    <form onSubmit={this.orderHandler}>
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
                                <Button disabled={!this.state.formValid} btnType="Success" > ORDER </Button>{/*clicked={this.orderHandler}*/}
                    </form>
        );
        if (this.props.loading){
            form = <Spinner />
        }
        return(
                <div className={classes.contactData}>
                    {form}
                </div>
        );
    }
}
const mapStatetoProps = state =>{
    return {
        ings : state.burgerBuilder.ingredient,
        price : state.burgerBuilder.price,
        loading : state.order.loading
    };
}

const mapDispatchtoProps = dispatch =>{
    return {
        onOrderBurger:(orderData) => dispatch(actions.purchaseBurger(orderData))
    }
}
export default connect(mapStatetoProps,mapDispatchtoProps)(withErrorHandler(ContactData,axios));