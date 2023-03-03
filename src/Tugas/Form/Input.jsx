import React from "react";

export default class Input extends React.Component {

    render() {
        const style = {
            width:"100%"
    } 
        return(
            <>
                <label style={style}>{this.props.label}</label>
                <br />
                <input style={style} type={this.props.type} name={this.props.name} 
                onChange={e => this.props.Listener(e.target.value)}/>
                <br />                
            </>
        )
    }
}