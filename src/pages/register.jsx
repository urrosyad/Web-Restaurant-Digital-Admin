import React, { useState, useEffect } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register(){

    const [createAcount, setCreateAccount] = useState({
        nama_manager: "",
        user_manager: "",
        pass_manager: ""
    })

    const [showAlert, setShowAlert] = useState(false)
    const [alertType, setAlertType] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        let timer;
        if (showAlert) {
          timer = setTimeout(() => {
            setShowAlert(false);
            setAlertType(null);
          }, 3000);
        }
            
        return () => {
            clearTimeout(timer);
          };
      }, [showAlert]);

    const handleCreate = async () => {
        try {

                // Validasi untuk nama_manager
                if (createAcount.nama_manager.length > 30) {
                  setShowAlert(true);
                  setAlertType("nama");
                  return;
              }
          
              // Validasi untuk username (tanpa spasi)
              const usernameRegex = /^[a-z]+$/
              if (!usernameRegex.test(createAcount.user_manager)) {
                  setShowAlert(true);
                  setAlertType("username");
                  return;
              }
          
              // Validasi untuk password
              const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
              if (!passwordRegex.test(createAcount.pass_manager)) {
                  setShowAlert(true);
                  setAlertType("password");
                  return;
              }
          
          if (createAcount.nama_manager !== '' && createAcount.user_manager !== '' && createAcount.pass_manager !== '') {
              
            await axios
              .post("http://localhost:5292/api/Manager/postManager", createAcount)
              .then((response) => {
                console.log(response);
              })
              .catch((err) => console.log(err));
              console.log("Data berhasil ditambah:", createAcount);

              alert("Berhasil Membuat Akun Admin")
              
              console.log("isi create manager: " + createAcount);
              console.log("isi username create manager: " + createAcount.user_manager);
              
              return navigate("/")

            } else {
                setShowAlert(true)
                setAlertType("emptyData")
            }

          } catch (error) {
            console.error("Error creating data:", error);
          }
      }

    return(
        <main>
        <div className="container">
    
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-5 col-md-6 d-flex flex-column align-items-center justify-content-center">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4 mb-3">Buat Akun Admin</h5>
                        {showAlert && (
                        <div className={`alert alert-danger mt-3`} role="alert">
                            {alertType === 'nama' ? 'Nama tidak boleh lebih dari 30 character' : (alertType === 'username' ? 'Username tidak boleh mengandung spasi dan harus huruf kecil semua' : (alertType === "password" ? "Password harus terdiri dari minimal 8 character berisi angka dan huruf" : "Data tidak boleh kosong"))}
                        </div>
                        )}

                      </div>

                      <form className="row g-3 needs-validation" noValidate>
                        <div className="col-12">
                          <label htmlFor="nama" className="form-label fw-bold">Nama Lengkap</label>
                          <input type="text" name="name" className="form-control" id="name" value={createAcount.nama_manager} 
                            onChange={(e) => setCreateAccount({...createAcount, nama_manager: e.target.value})} required/>
                            <p className="small mt-1">Nama maksimal 30 character</p>
                        </div>
    
                        <div className="col-12">
                          <label htmlFor="username" className="form-label fw-bold">Username</label>
                          <div className="input-group has-validation">
                            <input type="text" name="username" className="form-control" id="username" value={createAcount.user_manager} 
                            onChange={(e) => setCreateAccount({...createAcount, user_manager: e.target.value})} required/>
                            <p className="small mt-1">Username tidak boleh menggunakan spasi dan harus terdiri dari huruf kecil </p>
                          </div>
                        </div>
    
                        <div className="col-12">
                          <label htmlFor="password" className="form-label fw-bold">Password</label>
                          <input type="password" name="password" className="form-control" id="password" value={createAcount.pass_manager} 
                            onChange={(e) => setCreateAccount({...createAcount, pass_manager: e.target.value})} min="8" required/>
                            <p className="small mt-1">Password harus terdiri dari min 8 char terdiri dari huruf dan angka</p>
                        </div>
    
                        <div className="col-12">
                          <button className="btn btn-primary w-100" type="button" onClick={handleCreate} >Buat Akun</button>
                        </div>
                      </form>
    
                    </div>
                  </div>    
                </div>
              </div>
            </div>
    
          </section>
    
        </div>
      </main>
    )
}