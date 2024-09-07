import Header from './components/Header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import LoginPopup from './components/LoginPopup'
import SignupPopup from './components/SignupPopup'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import { Toaster } from 'react-hot-toast';
import Verify from './pages/Verify'
import Orders from './pages/Orders'
import { useStoreContext } from './context/StoreContext'

const App = () => {
  const { authPopup, setAuthPopup } = useStoreContext();

  return (
    <Router>
      <div>
        <Header setAuthPopup={setAuthPopup} />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          {/* <Route element={<ProtectedRoutes />}> */}
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/checkout' element={<Checkout />}></Route>
          <Route path='/verify' element={<Verify />}></Route>
          <Route path='/orders' element={<Orders />}></Route>
          {/* </Route> */}
        </Routes>
        <Footer />
        {authPopup === 'login' && <LoginPopup setAuthPopup={setAuthPopup} />}
        {authPopup === 'signup' && <SignupPopup setAuthPopup={setAuthPopup} />}
      </div>
      <Toaster />
    </Router>
  )
}

export default App