import React from "react";
import Footer from "./Berita/Footer";
import Header from "./Berita/Header";
import SearchBar from "./Berita/SearchBar";




export default class Form extends React.Component {
    render(){
        return(
            <>
                <Header />
                <SearchBar />
                <Footer />
            </>
        )
    }
}