import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';      // Login component
import Register from './Register';  // Register component
import Dashboard from './Dashboard';  // Dashboard component
import MainPage from './MainPage';  // MainPage component which includes both Login and Register forms

function App() {
    return (
        <Router>
            <Routes>
                {/* Main page which contains Login and Register */}
                <Route path="/" element={<MainPage />} />

                {/* Separate route for Register page */}
                <Route path="/register" element={<Register />} />

                {/* Route for Dashboard page */}
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
