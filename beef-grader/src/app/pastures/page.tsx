"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link'; // Import Link for navigation
import { usePastureContext } from '../context/PastureContext';

const PasturesPage: React.FC = () => {
    const { pastures, addPasture, fetchPastures } = usePastureContext();
    const [newPastureName, setNewPastureName] = useState('');

    // Fetch pastures only once when the component mounts
    useEffect(() => {
        fetchPastures();
    }, []);

    const handleAddPasture = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPastureName.trim()) {
            await addPasture({ name: newPastureName.trim() });
            setNewPastureName('');
            await fetchPastures();
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">My Pastures</h1>

            <form onSubmit={handleAddPasture} className="mb-6">
                <input
                    type="text"
                    value={newPastureName}
                    onChange={(e) => setNewPastureName(e.target.value)}
                    placeholder="Enter new pasture name"
                    className="border p-2 mr-2"
                />

                <button type="submit" className="bg-brandBrown text-white p-2 rounded">
                    Add Pasture
                </button>
            </form>

            <ul className="space-y-2">
                {pastures.map((pasture) => (
                    <li key={pasture.id} className="bg-white shadow rounded-lg p-4">
                        {/* Link to the individual pasture page */}
                        <Link href={`/pastures/${pasture.id}`}>
                            <span className="hover:underline">{pasture.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PasturesPage;