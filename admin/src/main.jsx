import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// export const SERVER_URI = 'http://localhost:5000'
export const SERVER_URI = 'https://epic-eats-mfec.onrender.com'

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
