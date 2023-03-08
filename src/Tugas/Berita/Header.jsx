import React from "react";

export default class Header extends React.Component {
    render() {
        const styleContainer = {
            padding: "15px",
            paddingLeft: "10%",
            backgroundColor: "#dbdbdb",
            width: "100%",
            boxShadow: "1px 0 6px 1px #000 "
        }
        const styleTitle = {
            textShadow: "0 0 4px rgba(0,0,0, 1)",
            color: "#fafafa"
        }

        return(
            <header style={styleContainer}>
                <h2 style={styleTitle}>News Website</h2>
            </header>
        )
    }
}