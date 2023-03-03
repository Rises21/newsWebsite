import React from "react";

export default class ShowError extends React.Component {
    render() {
        let error = this.props.error;
        const style = {color:"red",boxShadow:"0 0 8px 1px red",listStyle:"none",textAlign:"center",padding:"10px",borderRadius:"5px",backgroundColor:"rgba(255, 0, 0, .1 )"};
        return(
            <ul style={style}>
                {error.map((err,i) => <li key={i}>{err}</li>)}
            </ul>
        )
    }
}