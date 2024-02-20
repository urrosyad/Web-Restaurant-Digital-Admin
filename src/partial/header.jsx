import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    const userData = JSON.parse(localStorage.getItem('userData'));
    const namaManager = userData ? userData.nama_manager : null;
    const userManager = userData ? userData.user_manager : null;

    console.log(isLoggedIn);
    isLoggedIn ? console.log("sudah login") : console.log("belum login");

    const navigate = useNavigate()
    const handleLogout = () => {
      alert("Anda Keluar")
      // Hapus data login dari localStorage
      localStorage.removeItem('userData');
      localStorage.setItem('isLoggedIn', 'false');
    
      navigate("/")
    };

    return(
  <header id="header" className="header fixed-top d-flex align-items-center">

  <div className="d-flex align-items-center justify-content-between">
    <a href="index.html" className="logo d-flex align-items-center">
      <span className="d-none d-lg-block">Restaurant Admin</span>
    </a>
  </div>
  {/* <!-- End Logo --> */}

  <nav className="header-nav ms-auto">
    <ul className="d-flex align-items-center">

      <li className="nav-item d-block d-lg-none">
        <a className="nav-link nav-icon search-bar-toggle " href="#">
          <i className="bi bi-search"></i>
        </a>
      </li>
      {/* <!-- End Search Icon--> */}

      <li className="nav-item dropdown pe-5">

        <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
            <img className="rounded-circle" src="./assets/img/profil.jpg" alt="" />
          <span className="d-none d-md-block dropdown-toggle ps-2">
             Selamat Datang <b> {isLoggedIn ? namaManager : "LOGIN"} </b>
          </span>
        </a>
        {/* <!-- End Profile Iamge Icon --> */}

        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
          <li className="dropdown-header">
            <h6>{isLoggedIn ? namaManager : "Login First"}</h6>
            <span>{isLoggedIn ? userManager : "Login First"}</span>
          </li>
          <li>
            <hr className="dropdown-divider"/>
          </li>

          <li>
            <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
              <i className="bi bi-person"></i>
              <span>My Profile</span>
            </a>
          </li>
          <li>
          <hr className="dropdown-divider"/>
          </li>

          <li>
            <button className="dropdown-item d-flex align-items-center" type='button' onClick={handleLogout} >
              <i className="bi bi-box-arrow-right"></i>
              <span>Log Out</span>
            </button>
          </li>

        </ul>
        {/* <!-- End Profile Dropdown Items --> */}
      </li>
      {/* <!-- End Profile Nav --> */}
    </ul>
  </nav>
  {/* <!-- End Icons Navigation --> */}
</header>

    )
}
