import { React } from 'react'

import ReactDOM from 'react-dom/client.js'

import App from './App.jsx'
import { App2 } from './App.jsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)

ReactDOM.createRoot(document.getElementById('root2')).render(<App2 />)