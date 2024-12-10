"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePastureContext } from '../context/PastureContext'; // Adjust the path as necessary

const PasturesPage: React.FC = () => {
    const { pastures, addPasture } = usePastureContext();
    const [newPastureName, setNewPastureName] = useState('');

    const handleAddPasture = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPastureName.trim()) {
            addPasture({ id: Date.now().toString(), name: newPastureName.trim() });
            setNewPastureName('');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Pastures</h1>
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
                        <Link href={`/pastures/${encodeURIComponent(pasture.name)}`}>
                            <span className="bg-brandBrown hover:underline">{pasture.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PasturesPage;