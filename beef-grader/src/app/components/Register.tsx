"use client"; // Mark this component as a client component

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Register: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            alert('Registration successful! You can now log in.');
            router.push('/login'); // Redirect to login page after successful registration
        } else {
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="border p-2 rounded w-full mb-2"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="border p-2 rounded w-full mb-4"
            />
            <button type="submit" className="teel-button">
                Create Account
            </button>
        </form>
    );
};

export default Register;