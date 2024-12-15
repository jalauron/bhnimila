import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; 

function Dashboard() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); // Redirect to login if no token
            return;
        }

        try {
            const decodedToken = jwtDecode(token); // Decode the JWT token
            setUser(decodedToken); // Store the user info from the decoded token
        } catch (error) {
            console.error('Token decode error:', error);
            navigate('/login'); // Redirect if token is invalid
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        navigate('/login'); // Redirect to login page
    };

    return (
        <div>
            <h1>Welcome to the Dashboard, {user ? user.username : 'Guest'}</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Dashboard;
