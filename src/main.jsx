// This is the entry point of the application.
// It renders the `App` component inside the `#root` div in `index.html`.
// Imports global styles from `index.css`.

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
