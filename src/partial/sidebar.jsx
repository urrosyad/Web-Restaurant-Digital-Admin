import * as React from 'react'
import {NavLink} from "react-router-dom" 
const Sidebar = () => {

    return(
        
        <aside id="sidebar" className="sidebar">

            <ul className="sidebar-nav" id="sidebar-nav">

            <li className="nav-item" >
            <NavLink to="/dasboard" className="nav-link collapsed" >
                <i className="bi bi-grid"></i>
                <span>Dashboard</span>
            </NavLink>
            </li>
            {/* <!-- End Dashboard Nav --> */}

            <li className="nav-item">
                <a className="nav-link collapsed" data-bs-target="#karyawan-nav" data-bs-toggle="collapse" href="#">
                <i className="bi bi-menu-button-wide"></i>
                <span>Master Karyawan</span>
                <i className="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="karyawan-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                <li>
                    <NavLink to="/manager" className="nav-link" activeclassname="active">
                    <i className="bi bi-circle"></i><span>Data Manager</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/chef" className="nav-link" activeclassname="active">
                    <i className="bi bi-circle"></i><span>Data Chef</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/waitress" className="nav-link" activeclassname="active">
                    <i className="bi bi-circle"></i><span>Data Waitress</span>
                    </NavLink>
                </li>
                </ul>
            </li>
            {/* <!-- End Karyawan Nav --> */}

            <li className="nav-item">
                <a className="nav-link collapsed" data-bs-target="#meja-nav" data-bs-toggle="collapse" href="#">
                <i className="bi bi-journal-text"></i><span>Master Meja</span><i className="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="meja-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                <li>
                     <NavLink to="/meja" className="nav-link" activeclassname="active">
                    <i className="bi bi-circle"></i><span>Data Meja</span>
                    </NavLink>
                </li>
                </ul>
            </li>
            {/* <!-- End Meja Nav --> */}

            <li className="nav-item">
                <a className="nav-link collapsed" data-bs-target="#menu-nav" data-bs-toggle="collapse" href="#">
                <i className="bi bi-layout-text-window-reverse"></i><span>Master Menu</span><i className="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="menu-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                <li>
                    <NavLink to="/menu" className="nav-link" activeclassname="active">
                    <i className="bi bi-circle"></i><span>Data Menu</span>
                    </NavLink>
                </li>
                </ul>
            </li>
            {/* <!-- End Menu Nav --> */}

            <li className="nav-item">
                <a className="nav-link collapsed" data-bs-target="#pesanan-nav" data-bs-toggle="collapse" href="#">
                <i className="bi bi-layout-text-window-reverse"></i><span>Pesanan</span><i className="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="pesanan-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                <li>
                    <NavLink to="/pesanan" className="nav-link" activeclassname="active">
                    <i className="bi bi-circle"></i><span>Data Pesanan Masuk</span>
                    </NavLink>
                </li>
                </ul>
            </li>
            {/* <!-- End Menu Nav --> */}
            </ul>
        </aside>
    )
}

export default Sidebar;