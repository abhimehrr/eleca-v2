import React from 'react'
import ReactDOM from 'react-dom/client'

// App
import App from './App.jsx'
import './index.css'

// Redux
import { Provider } from 'react-redux'
import store from './store/store'

ReactDOM.createRoot(document.getElementById('eleca')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
