import React from "react";

const  Footer = () =>  {

        const styleContainer = {
            backgroundColor: "#dbdbdb",
            width: "100%",
            boxShadow: "1px 0 6px 1px #000 "
        }
        const styleTitle = {
            textShadow: "0 0 4px rgba(0,0,0, 1)",
            color: "#fafafa",
            padding: "20px",
            textAlign: "center"
        }

        return(
            <footer style={styleContainer}>
                <p style={styleTitle}>&#169; 2022 By Rises, Allright Reserved.</p>
            </footer>
        )

}
export default Footer;