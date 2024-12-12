"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePastureContext } from '../context/PastureContext';
import withAuth from '../components/withAuth'

const PasturesPage: React.FC = () => {
    const { pastures, addPasture, fetchPastures, deletePasture } = usePastureContext();
    const [newPastureName, setNewPastureName] = useState('');

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

    const handleDeletePasture = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this pasture?')) {
            await deletePasture(id);
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
                    <li key={pasture.id} className="bg-white shadow rounded-lg p-4 flex justify-between items-center">
                        <Link href={`/pastures/${pasture.id}`}>
                            <span className="hover:underline">{pasture.name}</span>
                        </Link>
                        <button 
                            onClick={() => handleDeletePasture(pasture.id)}
                            className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default withAuth(PasturesPage);