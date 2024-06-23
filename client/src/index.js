import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthOProviderWithNavigate from './auth/AuthOProviderWithNavigate';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <AuthOProviderWithNavigate>
            <App /> 
        </AuthOProviderWithNavigate> 
    </Router>
);

