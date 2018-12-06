import React, { Component } from 'react';


class ContactData extends Component {
    componentWillMount(){
        console.log("ggg");
        console.log(this.props.ingredient);
    }
    render(){

        
        return(
                <div>
                    <form>
                        <input type="text" name="name" placeholder="name"/>
                        <button>Submit</button>
                    </form>
                </div>
        );
    }
}


export default ContactData;