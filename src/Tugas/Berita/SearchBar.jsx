import React from "react";
import axios from "axios";

export default class SearchBar extends React.Component {

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

    shouldComponentUpdate(){
        console.log(this.shouldComponentUpdate,"<><><><>");
        return true;
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


    render() {
        const styleContainer = {
            width: "95%",
            backgroundColor: "#fafafa",
            margin:"15px auto",
            padding: "40px",
            boxShadow: "1px 0 6px 1px #000 "
        }

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
            <div style={styleContainer}>
                <input style={{height: "30px", width: "100%", marginBottom: "10px",padding: "10px"}}
                type="text"
                placeholder="Cari Berita..."
                value={pencarian}
                onChange={this.handleSearch}
                />
                {filteredBerita.length === 0 ? (
                    <div style={{marginTop: "30px", fontSize: "2rem", textAlign: "center"}}>Berita Tidak Ditemukan</div>
                ) : (
                    <div>
                        <button onClick={this.bersihkanPencarian} style={{padding: "6px", width: "25%", marginBottom: "10px"}}>Bersihkan Pencarian</button>
                        {beritaTerkini.map((article) => (
                            <div key={article.url}>
                                <h2 style={{clear:"both",marginTop: "15px"}}>{article.title}</h2>
                                <img style={{width:"200px",float:"left", margin:"5px"}} src={article.urlToImage} alt={article.title}/>
                                <p>{article.description}</p>
                                
                                <br />
                                <a target="_blank" href={article.url}>More Information...</a>
                            </div>
                        ))}

                        <div style={{backgroundColor:"rgba(0,0,0, .2)",clear:"both"}}>
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
                )}
            </div>
        )
    }
}