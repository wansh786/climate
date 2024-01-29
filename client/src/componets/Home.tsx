import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './home.css';

export const Home: React.FC = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
    };

    return (
        <div id="banner">
            <h1 id='h1'>"Ask Climate: Your Forecast, Anytime, Anywhere!"</h1>
            <button id="btn" onClick={handleClick}>
                Get started
            </button>

        </div>
    );
};
