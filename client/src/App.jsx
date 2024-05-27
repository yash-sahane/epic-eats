import React, { useState } from 'react'
import Header from './components/Header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import LoginPopup from './components/LoginPopup'
import SignupPopup from './components/SignupPopup'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

const App = () => {
  const [authPopup, setAuthPopup] = useState(null);

  return (
    <Router>
      <div>
        <Header setAuthPopup={setAuthPopup} />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/checkout' element={<Checkout />}></Route>
        </Routes>
        <Footer />
        {authPopup === 'login' && <LoginPopup setAuthPopup={setAuthPopup} />}
        {authPopup === 'signup' && <SignupPopup setAuthPopup={setAuthPopup} />}
      </div>
    </Router>
  )
}

export default App