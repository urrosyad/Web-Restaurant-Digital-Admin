import * as React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import Header from "../partial/header"
import Sidebar from "../partial/sidebar"

export default function Pesanan(){
    const [pesanan, setPesanan] = useState([])

    useEffect(()=>{
        readPesanan()
    },[])

    const readPesanan = async () => {
        await axios
          .get("http://localhost:5292/api/Pesanan/getAllPesanan")
          .then((response) => {
            const pesanan = response.data.data
            console.log(pesanan);
            setPesanan(pesanan)
          })
          .catch((err) => console.log(err));
      };

      return(
        <>
        <Header/>
        <Sidebar/>
        <main id="main" className="main">
    
    <section className="section">
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Data Pesanan</h5>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">No Meja</th>
                    <th scope="col">Nama Customer</th>
                    <th scope="col">Nama Menu</th>
                    <th scope="col">Harga Menu</th>
                    <th scope="col">Jumlah Pesan</th>
                    <th scope="col">Total Harga</th>
                  </tr>
                </thead>
                <tbody>
                {pesanan.map((data, index) => (
                    <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{data.no_meja}</td>
                    <td>{data.nama_customer}</td>
                    <td>{data.nama_menu}</td>
                    <td>{data.harga_menu}</td>
                    <td>{data.jumlah_pesan}</td>
                    <td>{data.total_harga}</td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</>
      )
}