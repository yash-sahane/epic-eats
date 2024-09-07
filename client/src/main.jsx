import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { StoreContextProvider } from './context/StoreContext.jsx'

export const SERVER_URI = 'http://localhost:5000'
// export const SERVER_URI = 'https://epic-eats-mfec.onrender.com'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StoreContextProvider>
    <App />
  </StoreContextProvider>
)
