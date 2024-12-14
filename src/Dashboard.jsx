// In Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if the JWT token exists in localStorage
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true);
        } else {
            navigate('/'); // Redirect to login if not authenticated
        }
    }, [navigate]);

    if (!isAuthenticated) {
        return null; // Or a loading spinner, etc.
    }

    return (
        <div className="dashboard-container">
            <h1>Welcome to your Dashboard!</h1>
            <p>Here is your overview.</p>
        </div>
    );
}

export default Dashboard;
