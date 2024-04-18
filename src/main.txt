import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <Auth0Provider
     domain="dev-d6dzw2p2ysol5oh6.us.auth0.com"
    clientId="gCf6FMygUFmwQbtBtJaO78P1kBQgsAwM"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    >

    <App />
    </Auth0Provider>
)
