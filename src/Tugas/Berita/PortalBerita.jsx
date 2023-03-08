import React from "react";
import axios from "axios";
import Input from "../Form/Input";

export default class PortalBerita extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            berita: [],
            loading: false,
            error: null,
            pencarian: "",
            halaman: 1,
            beritaPerHalaman: 5,
            batasWaktuMemantul: null
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.filterBerita = this.filterBerita.bind(this);
        this.bersihkanPencarian = this.bersihkanPencarian.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }
    componentDidMount() {
        this.panggilApiBerita();
    }
    componentWillUnmount() {
        clearTimeout(this.state.batasWaktuMemantul);
    }

    panggilApiBerita() {
        this.setState({loading: true});
        axios.get(
            "http://newsapi.org/v2/top-headlines?country=us&apiKey=989548329dd94e968d3d9779c9310de3"
        )
        .then((res) => {
            this.setState({
                berita: res.data.articles,
                loading: false});
        })
        .catch((err) => {
            this.setState({error: err.message, loading: false});
        })
        .finally(() => {
            console.log("Method panggilBerita telah di eksekusi <<<");
        });
    }
    handleSearch(e) {
        const pencarian = e.target.value;
        clearTimeout(this.state.batasWaktuMemantul);
        const batasWaktuMemantul = setTimeout(() => {
           this.setState({ pencarian, halaman: 1 }); 
        }, 500);

        this.setState({ batasWaktuMemantul });
    }
    filterBerita() {
        const { berita, pencarian } = this.state;
        if (!pencarian) {
            return berita;
        }
        const filteredBerita = berita.filter(article => article.title.toLowerCase().includes(pencarian.toLocaleLowerCase()));
        return filteredBerita;
    }
    bersihkanPencarian() {
        this.setState({ pencarian: "", halaman: 1 });
    }
    handlePageChange(e) {
        this.setState({ halaman: Number(e.target.id) });
    }

    render(){
        console.log(this.state.berita,">>>");
        const { loading, error, pencarian, halaman, beritaPerHalaman } = this.state;
        if(loading){
            return <div style={{fontSize:"3 rem"}}>LOADING...</div>
        }
        if (error) {
            return <div style={{fontSize:"3 rem"}}>{error}</div>
        }

        const filteredBerita = this.filterBerita();

        const indexOfBeritaTerakhir = halaman * beritaPerHalaman;
        const indexOfBeritaPertama = indexOfBeritaTerakhir - beritaPerHalaman;
        const beritaTerkini = filteredBerita.slice(indexOfBeritaPertama, indexOfBeritaTerakhir);

        const nomerHalaman = [];
        for (let i = 1; i <= Math.ceil(filteredBerita.length / beritaPerHalaman); i++) {
            nomerHalaman.push(i)     
        }

        return(
            <div style={{backgroundColor:"#dbdbdb"}}>
                <Input 
                type="text"
                placeholder="Cari Berita..."
                value={pencarian}
                Listener={value => this.setState({pencarian: value})}
                />
                {filteredBerita.length === 0 ? (
                    <div>Berita Tidak Ditemukan</div>
                ) : (
                    <div>
                        <button onClick={this.bersihkanPencarian}>Bersihkan Pencarian</button>
                        {beritaTerkini.map((article) => (
                            <div key={article.url}>
                                <h2>{article.title}</h2>
                                <p>{article.description}</p>
                                <img style={{width:"200px"}} src={article.urlToImage} alt={article.title}/>
                                <a target="_blank" href={article.url}>More Information...</a>
                            </div>
                        ))}

                        <div style={{backgroundColor:"rgba(0,0,0, .2)"}}>
                            {nomerHalaman.map((nomer) => (
                                <button 
                                style={{width:"40px",margin:"10px",textAlign:"center"}}
                                key={nomer}
                                id={nomer}
                                onClick={this.handlePageChange}
                                className={halaman === nomer ? "active" : ""}
                                >{nomer}</button>
                            ))}
                        </div>
                    </div>
                )};
            </div>
        )
    }
}