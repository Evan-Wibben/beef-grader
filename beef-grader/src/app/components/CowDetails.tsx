'use client';

import React, { useState } from 'react';

interface CowDetailsProps {
    onSubmit: (details: { breed: string; age: number; pasture: string; notes: string }) => void;
}

const CowDetails: React.FC<CowDetailsProps> = ({ onSubmit }) => {
    const [breed, setBreed] = useState<string>('');
    const [age, setAge] = useState<number | ''>('');
    const [pasture, setPasture] = useState<string>('');
    const [notes, setNotes] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ breed, age: Number(age), pasture, notes });
        setBreed('');
        setAge('');
        setPasture('');
        setNotes('');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Form fields for breed, age, pasture, and notes */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Breed</label>
                <input
                    type="text"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value === '' ? '' : Number(e.target.value))}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Pasture</label>
                <select
                    value={pasture}
                    onChange={(e) => setPasture(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                >
                    <option value="">Select a pasture</option>
                    <option value="Pasture 1">Pasture 1</option>
                    <option value="Pasture 2">Pasture 2</option>
                    <option value="Pasture 3">Pasture 3</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    rows={4}
                />
            </div>

            <button type="submit" className="bg-brandGreen text-white px-4 py-2 rounded-lg shadow-md hover:bg-brandBrown transition duration-300">
                Submit
            </button>
        </form>
    );
};

export default CowDetails;