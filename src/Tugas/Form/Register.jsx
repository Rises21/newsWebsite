import React from "react";
import Input from "./Input";
import ShowError from "./ShowError";

export default class Register extends React.Component {
    
    state ={
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: []
    }
    
    handleSubmit = e => {
        e.preventDefault();
            
        const { username, email, password, confirmPassword} = this.state;
        var EMAIL_REGEXP = new RegExp('^[a-z0-9]+(.[_a-z0-9]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,15})$', 'i');
        let message = [];
        if (username.length === 0) {
            message = [...message,'Username can\'t empty'];
        } else if (username.length < 3){
            message = [...message,'Username must have at least 3 characters']
        } else if ( username.length > 20) {
            message = [...message,'Username cannot be longer than 20 characters']
        }
        if (email.length === 0) {
            message = [...message,'Email can\'t empty'];
        } else if (!EMAIL_REGEXP.test(email)) {
            message = [...message,'Email is invalid'];
        }
        if (password.length === 0) {
            message = [...message,'Password can\'t empty']
        } else if (password.length < 8) {
            message = [...message,'The password must have at least 8 characters']
        } else if (password.length > 16 ) {
            message = [...message,'The password cannot be longer than 16 characters']
        }
        if (password !== confirmPassword) {
            message = [...message,'Confirm Password not same with password']
        }
        if (message.length) {
            this.setState({
                errors: message
            });
        } 
        
        if (!message.length) {
            const {username, email, password, confirmPassword} = this.state;
            alert(`
                    Username : ${username},
                    E-mail: ${email},
                    Password: ${password},
                    Confirm Password: ${confirmPassword}            
            `);
                 this.setState({
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    errors: []
                })
        }
    }

    resetForm = () => {
        let form = document.getElementsByTagName('input');
       for (let i = 0; i < form.length; i++) {
        form[i].value = "";
       }        
    }
    render() {
        const style = {
            width: "50%",
            margin: "100px auto",
            padding: "15px",
            border: "solid 1px #dbdbdb",
        }


        return(
            <div style={style}>
            {Boolean(this.state.errors.length) && <ShowError error={this.state.errors} />}
                <h3 style={{textAlign:"center",padding:"10px",marginBottom:"30px",borderBottom:"solid 1px #dbdbdb"}}>Register</h3>
                <div style={{width:"50%",margin:"auto"}}>
                <form id="registForm" onSubmit={this.handleSubmit}>
                    <Input label="Username" type="text" name="Username"
                        Listener={value => this.setState({username: value})}/>
                    <Input label="Email" type="email" name="Email"
                        Listener={value => this.setState({email: value})}/>
                    <Input label="Password" type="password" name="Password"
                        Listener={value => this.setState({password: value})}/>
                    <Input label="ConfirmPassword" type="password" name="ConfirmPassword"
                        Listener={value => this.setState({confirmPassword: value})}/> 
                    <br />
                    <button style={{width:"100%",padding:"5px"}} type="submit" onClick={this.resetForm}>Register</button>                    
                </form>

                </div>
                
            </div>
            
        )
    }
}