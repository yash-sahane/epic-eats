import React, { useState } from 'react'
import Header from './components/Header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Add from './Pages/Add'
import Order from './Pages/Order'
import List from './Pages/List'
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <div className='max-container flex paddingx min-h-screen'>
          <Sidebar />
          <Routes>
            <Route path='/' element={<Add />}></Route>
            <Route path='/order' element={<Order />}></Route>
            <Route path='/list' element={<List />}></Route>
          </Routes>
        </div>
      </div>
      <Toaster />
    </Router>
  )
}

export default App