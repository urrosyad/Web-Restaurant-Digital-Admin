import React, { useState, useEffect } from 'react';
import axios from "axios";
import Header from "../partial/header";
import Sidebar from "../partial/sidebar";

export default function Dashboard(){
    const [managerCount, setManagerCount] = useState(0);
    const [chefCount, setChefCount] = useState(0);
    const [waitressCount, setWaitressCount] = useState(0);
    const [menuCount, setMenuCount] = useState(0);
    const [mejaCount, setMejaCount] = useState(0);
    const [pesananCount, setPesananCount] = useState(0);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const managerResponse = await axios.get('http://localhost:5292/api/Manager/getAll');
          setManagerCount(managerResponse.data.data.length);
  
          const chefResponse = await axios.get('http://localhost:5292/api/Chef/getAll');
          setChefCount(chefResponse.data.data.length);
  
          const waitressResponse = await axios.get('http://localhost:5292/api/Waitress/getAll');
          setWaitressCount(waitressResponse.data.data.length);
  
          const menuResponse = await axios.get('http://localhost:5292/api/Menu/getAll');
          setMenuCount(menuResponse.data.data.length);
  
          const mejaResponse = await axios.get('http://localhost:5292/api/Meja/getAll');
          setMejaCount(mejaResponse.data.data.length);

          const pesananResponse = await axios.get('http://localhost:5292/api/Pesanan/getAllPesanan');
          setPesananCount(pesananResponse.data.data.length);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
    
    return(
        <>
        <Header/>
        <Sidebar/>
        <main id="main" className="main">
        <section className="section">
        <h1 className='fw-bold'>Dasboard</h1>
            <div className="row">
               <div className="col-sm-4">
                <div className="card shadow rounded-5">
                    <div className="card-body">
                        <h4 className="card-title"><i className="bi bi-person-workspace"></i> Manager</h4>
                        <h5 className='fw-bold text-default'>{managerCount} Karyawan</h5>
                    </div>
                </div>
                </div>

               <div className="col-sm-4">
                <div className="card shadow rounded-5">
                    <div className="card-body">
                        <h5 className="card-title"><i className="bi bi-person-video2"></i> Chef</h5>
                        <h5 className='fw-bold text-default'>{chefCount} Karyawan</h5>
                    </div>
                </div>
                </div>

               <div className="col-sm-4">
                <div className="card shadow rounded-5">
                    <div className="card-body">
                        <h4 className="card-title"><i className="bi bi-person-vcard"></i> Waitress</h4>
                        <h5 className='fw-bold text-default'>{waitressCount} Karyawan</h5>
                    </div>
                </div>
                </div>

            </div>

            <div className="row">

                <div className="col-md-4">
                    <div className="card shadow rounded-5">
                        <div className="card-body">
                            <h4 className="card-title"><i className="bi bi-egg-fried"></i> Menu</h4>
                            <h5 className='fw-bold text-default'>{menuCount} Menu</h5>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow rounded-5">
                        <div className="card-body">
                            <h4 className="card-title"><i className="bi bi-grid-3x3-gap"></i> Meja</h4>
                            <h5 className='fw-bold text-default'>{mejaCount} Meja</h5>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow rounded-5">
                        <div className="card-body">
                            <h4 className="card-title"><i className="bi bi-list"></i> Pesanan</h4>
                            <h5 className='fw-bold text-default'>{pesananCount} Pesanan Masuk</h5>
                        </div>
                    </div>
                </div>

            </div>
            
        </section>
        </main>
        </>
    )
}