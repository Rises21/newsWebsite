// import React from "react";

// export default class FormElement extends React.Component {

//     state = {
//         name: '',
//         jurusan: '',
//         gender: '',
//         address: '',
//         member: false,
//     }    

//     handleSubmit = (e) => { //jika pake prevent harus mengatur reset state saat di submit 
//         e.preventDefault();
//         let {name, jurusan, gender, address, member} = this.state;
//         alert(`
//         Nama : ${name}
//         Jurusan : ${jurusan}
//         Jenis Kelamin : ${gender}
//         Alamat : ${address}
//         Member : ${member? 'YES':'NO'}
//         `)
//         this.setState(
//              {
//         name: '',
//         jurusan: '',
//         gender: '',
//         address: '',
//         member: false,
//     }
//         )
//     }
//     render(){
//         return(
//             <div style={{width:"50%",margin:"100px auto",padding:"30px", border:"solid 1px #dbdbdb"}}>
//                     <form onSubmit={this.handleSubmit}>
                    
//                     <label>
//                         Nama : <input type="text" name="name" defaultValue="bangkit" onChange={e => this.setState({name: e.target.value} )} />
//                     </label><br /><br />
//                     <label>
//                         Jurusan : <select defaultValue={this.props} name="jurusan" onChange={e => this.setState({jurusan: e.target.value})}>
//                             <option value="">Pilih Jurusan</option>
//                             <option value="Teknik Informatika" >Teknikn Informatika</option>
//                             <option value="Sistem Informasi" >Sistem Informasi</option>
//                             <option value="Desain Komunikasi Visual" >Desain Komunikasi Visual</option>
//                         </select>
//                     </label><br /><br />
//                     <label onChange={e => this.setState({gender: e.target.value})}>
//                         Jenis Kelamin : 
//                         <input style={{margin:"10px"}} type="radio" value="Laki-Laki" name="gender" />Laki-Laki
//                         <input style={{margin:"10px"}} type="radio" value="Perempuan" name="gender" />Perempuan
//                     </label><br /><br />
//                     <label>
//                         Alamat : <textarea cols="30" row="10" name="address" onChange={e => this.setState({address: e.target.value})} />
//                     </label><br /><br />
//                     <label>
//                         Member : <input type="checkbox" checked={this.state.member} name="member" onChange={e => this.setState({member: e.target.checked})}/>
//                     </label><br /><br /> <br />

//                     <button style={{padding:"10px"}} type="submit">Login</button>
//                 </form>
//             </div>
           
//         );
//     }
// }