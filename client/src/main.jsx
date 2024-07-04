import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './test.jsx'
//import test from '../../sample/solution/src/app.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('client')).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
)
