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
        <div>
            <Hero 
                title="My Groups" 
                imageSrc="https://bcs-app.s3.us-east-1.amazonaws.com/Hero+Images/BCS_Group_Hero.webp"
                imageAlt="Cattle grazing in a field"
            />
            <div className="block-container pb-10">
                <form onSubmit={handleAddPasture} className="flex flex-col sm:flex-row items-center gap-4 rounded-lg">
                    <div className="relative w-full sm:w-auto flex-grow">
                        <input
                            type="text"
                            value={newPastureName}
                            onChange={(e) => setNewPastureName(e.target.value)}
                            placeholder="Enter new group name"
                            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandDarkTeel focus:border-transparent outline-none transition duration-200 ease-in-out bg-brandLightGray"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="teel-button px-10"
                    >
                        Add Group
                    </button>
                </form>
            </div>
            <div className="bg-brandLightBlue py-10">
                 <ul className="space-y-4 block-container">
                     {pastures.map((pasture) => (
                         <li key={pasture.id} className="bg-white shadow-3xl rounded-lg p-6">
                             <div className="flex justify-between items-center mb-4">
                                 <Link href={`/pastures/${pasture.id}`}>
                                    <h3 className="text-2xl font-semibold text-gray-800 hover:text-brandGreen transition duration-300">{pasture.name}</h3>
                                </Link>
                            </div>
                            <div className="flex justify-between items-center">
                                <Link href={`/pastures/${pasture.id}`}>
                                     <button className="teel-button px-10">
                                        View Group
                                    </button>
                                </Link>
                                <button 
                                    onClick={() => handleDeletePasture(pasture.id)}
                                    className="red-button px-10"
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