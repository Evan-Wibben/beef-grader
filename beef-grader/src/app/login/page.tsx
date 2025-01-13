import React from 'react';
import Login from '../components/Login';

const LoginPage: React.FC = () => {
    return (
        <div className="bg-brandLightGreen min-h-screen flex items-center justify-center p-8">
            <div className="bg-brandLightBlue p-6 rounded-lg shadow-md max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4 text-brandDarkTeel">Login</h2>
                <Login />
            </div>
        </div>
    );
};

export default LoginPage;