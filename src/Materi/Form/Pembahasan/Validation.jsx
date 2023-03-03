import React from "react";
import Input from "./Input";
import ShowError from "./ShowError";

export default class Validation extends React.Component {
    
    state ={
        email: '',
        password:'',
        errors: []
    }
    
    handleSubmit = e => {
        e.preventDefault();
            
        const { email, password} = this.state;
        var EMAIL_REGEXP = new RegExp('^[a-z0-9]+(.[_a-z0-9]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,15})$', 'i');
            console.log(EMAIL_REGEXP.test(email))
        let message = [];
        if (email.length === 0) {
            message = [...message,'Email tidak boleh kosong!'];
        }
        if (password.length === 0) {
            message = [...message,'Password tidak boleh kosong!']
        }
        if (!EMAIL_REGEXP.test(email)) {
            alert('Email tidak valid');
        }
        
        if (message.length) {
            this.setState({
                errors: message
            });
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
                <h3 style={{textAlign:"center",padding:"10px",marginBottom:"30px",borderBottom:"solid 1px #dbdbdb"}}>Login</h3>
                <div style={{width:"50%",margin:"auto"}}>
                <form onSubmit={this.handleSubmit}>
                    <Input label="Email" type="email" name="Email"
                    Listener={value => this.setState({email: value})}/>
                    <Input label="Password" type="password" name="Password"
                     Listener={value => this.setState({password: value})}/> 
                    <br />
                    <button style={{width:"100%",padding:"5px"}} tyoe="submit">Login</button>                    
                </form>

                </div>
                
            </div>
            
        )
    }
}