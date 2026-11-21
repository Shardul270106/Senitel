import React from 'react';
import { createRoot } from 'react-dom/client';
import LandingPage from './App.jsx';
import Dashboard from './Dashboard.jsx';
import Docs from './Docs.jsx';
import './styles.css';

const pathname = window.location.pathname.replace(/\/$/, '');
const page = pathname === '/dashboard' ? <Dashboard /> : pathname === '/docs' ? <Docs /> : <LandingPage />;

createRoot(document.getElementById('root')).render(<React.StrictMode>{page}</React.StrictMode>);
