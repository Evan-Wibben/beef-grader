"use client"; // Ensure this component is a client component

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error messages
    const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true); // Set loading state

        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            Cookies.set('userId', data.id); // Set userId cookie on successful login
            alert('Login successful!');
            router.push('/'); // Redirect to home page on success
        } else {
            const errorData = await response.json(); // Get error details from response
            setErrorMessage(errorData.error || 'Login failed'); // Set error message
        }

        setIsLoading(false); // Reset loading state
    };

    return (
        <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email" // Add id for accessibility
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        className="border p-2 rounded w-full mb-2"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password" // Add id for accessibility
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        className="border p-2 rounded w-full mb-4"
                    />
                </div>
                <button 
                    type="submit" 
                    className={`bg-brandGreen text-white px-4 py-2 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isLoading} // Disable button while loading
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>} {/* Display error message */}
            <p className="mt-4">
                     {`Don't have an account? `}
                 <a href="/register" className="text-blue-500 hover:underline">
                      Create one here
                </a>
            </p>
        </div>
    );
};

export default Login;