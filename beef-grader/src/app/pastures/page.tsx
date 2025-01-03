"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePastureContext } from '../context/PastureContext';
import withAuth from '../components/withAuth';
import Hero from '../components/Hero';

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
        <div className='bg-brandLightGreen'>
            <div className="container mx-auto p-4">
                <Hero 
                    title="My Groups" 
                />
                <form onSubmit={handleAddPasture} className="mb-6 flex flex-col sm:flex-row items-center gap-4 bg-brandBrown p-4 rounded-lg">
                    <div className="relative w-full sm:w-auto flex-grow">
                        <input
                            type="text"
                            value={newPastureName}
                            onChange={(e) => setNewPastureName(e.target.value)}
                            placeholder="Enter new group name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-transparent outline-none transition duration-200 ease-in-out"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-white text-black px-4 py-2 rounded-lg border-2 border-white hover:bg-brandBrown hover:border-2 hover:border-white hover:text-white transition duration-300 ease-in-out font-bold text-center"
                    >
                        Add Group
                    </button>
                </form>

                <ul className="space-y-4">
                    {pastures.map((pasture) => (
                        <li key={pasture.id} className="bg-white shadow-lg rounded-xl p-6">
                            <div className="flex justify-between items-center mb-4">
                                <Link href={`/pastures/${pasture.id}`}>
                                    <h3 className="text-xl font-semibold text-gray-800 hover:text-brandGreen transition duration-300">{pasture.name}</h3>
                                </Link>
                            </div>
                            <div className="flex justify-between items-center">
                                <Link href={`/pastures/${pasture.id}`}>
                                    <button className="bg-brandGreen text-white py-2 px-4 rounded-lg border-brandGreen border-2 hover:bg-white hover:border-2 hover:border-brandGreen hover:text-black transition duration-300 ease-in-out text-center">
                                        View Group
                                    </button>
                                </Link>
                                <button 
                                    onClick={() => handleDeletePasture(pasture.id)}
                                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
        
    );
};

export default withAuth(PasturesPage);