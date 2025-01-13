import React from 'react';
import Register from '../components/Register'; // Import the Register component

const RegisterPage: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-8">
            <div className="bg-brandLightBlue p-6 rounded-lg shadow-md max-w-md w-full">
                <h2 className="text-lg font-bold text-brandDarkTeel mb-4">Create Account</h2>
                <Register />
            </div>
        </div>
    );
};

export default RegisterPage;