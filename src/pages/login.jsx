import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login(){
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate()
  const [showAlert, setShowAlert] = useState(false)
  const [alertType, setAlertType] = useState(null)

  useEffect(() => {
    let timer;
    if (showAlert) {
      timer = setTimeout(() => {
        setShowAlert(false);
        setAlertType(null);
      }, 2000);
    }
        
    return () => {
        clearTimeout(timer);
      };
  }, [showAlert]);
  

  const handleLogin = async () => {
    try {
      const response = await axios.get('http://localhost:5292/api/Manager/getAll');
      const managers = response.data.data;

      // Cari apakah ada manager dengan username yang sesuai
      const matchedManager = managers.find(manager => manager.user_manager === loginData.username);

      if (matchedManager) {

        // Bandingkan password, sesuaikan ini dengan cara penyimpanan yang sebenarnya
        if (matchedManager.pass_manager === loginData.password) {
          console.log('Login berhasil');

          // Menyimpan data yang sudah login
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userData', JSON.stringify(matchedManager));

          // navigasi ke halaman dasboard
          navigate("/dasboard")

        } else {
          setShowAlert(true)
          setAlertType("password")
        }

      } else {
        setShowAlert(true)
        setAlertType("username")
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }

  };



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
                        <h5 className="card-title text-center pb-0 fs-4">Masuk Ke Admin Restaurant</h5>
                        <p className="text-center small">Masukkan Username dan Password untuk Login</p>
                      </div>
    
                      <form className="row g-3 needs-validation" noValidate>
    
                        <div className="col-12">
                          <label htmlFor="username" className="form-label">Username</label>
                          <div className="input-group has-validation">
                          <input className="form-control" type="text" id="username" value={loginData.username}
                            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                          />
                          {showAlert && alertType === 'username' && (
                            <div className={`alert alert-danger mt-3`} role="alert">
                              Username tidak ditemukan atau belum terdaftar!
                            </div>
                          )}
                          </div>
                        </div>
    
                        <div className="col-12">
                          <label htmlFor="password" className="form-label">Password</label>
                          <input className="form-control" type="password" id="password" value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                          />
                          {showAlert && alertType === 'password' && (
                            <div className={`alert alert-danger mt-3`} role="alert">
                              Password yang anda masukkan salah!
                            </div>
                          )}
                        </div>
    
                        <div className="col-12">
                          <button className="btn btn-primary w-100" type="button" onClick={handleLogin}>Masuk</button>
                        </div>
    
                        <div className="col-12">
                          <p className="small mb-0"><a href="/register">Buat akun Admin sebagai Manager!</a></p>
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