import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './partial/header'
import Sidebar from './partial/sidebar'
import Manager from './pages/manager'
import Chef from './pages/chef'
import Waitress from './pages/waitress'
import Menu from './pages/menu'
import Dashboard from './pages/dasboard'
import Meja from './pages/meja'
import Login from './pages/login'
import Register from './pages/register'
import Pesanan from './pages/pesanan'

function App() {


  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dasboard" element={<Dashboard />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="/chef" element={<Chef />} />
        <Route path="/waitress" element={<Waitress />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/meja" element={<Meja />} />
        <Route path="/pesanan" element={<Pesanan />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
