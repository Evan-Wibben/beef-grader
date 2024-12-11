'use client';

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface Cow {
    id: number;
    breed: string;
    age: number;
    pasture: string | null; // Allow pasture to be null
    notes: string;
    bcs_score: string;
}

const RecordsPage: React.FC = () => {
    const [cows, setCows] = useState<Cow[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCows = async () => {
        const userId = Cookies.get('userId');
        if (!userId) {
            setError('User not authenticated');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`/api/records?userId=${userId}`);
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Server Error:', errorData); // Log server error details
                throw new Error(errorData.error || 'Failed to fetch cows');
            }
            const data = await response.json();
            setCows(data);
        } catch (err) {
            console.error('Detailed error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCows();
    }, []);

    const handleDelete = async (cowId: number) => {
        if (!confirm('Are you sure you want to delete this record?')) {
            return;
        }

        const userId = Cookies.get('userId');
        try {
            const response = await fetch(`/api/records?userId=${userId}&cowId=${cowId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Delete Error:', errorData); // Log delete error details
                throw new Error(errorData.error || 'Failed to delete cow');
            }

            // Refresh the cow list
            await fetchCows();
        } catch (err) {
            console.error('Detailed delete error:', err);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Cow Records</h1>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Breed</th>
                        <th className="px-4 py-2">Age</th>
                        <th className="px-4 py-2">Pasture</th>
                        <th className="px-4 py-2">BCS Score</th>
                        <th className="px-4 py-2">Notes</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cows.map((cow) => (
                        <tr key={cow.id}>
                            <td className="border px-4 py-2">{cow.breed}</td>
                            <td className="border px-4 py-2">{cow.age}</td>
                            <td className="border px-4 py-2">{cow.pasture || 'No Pasture'}</td> {/* Display placeholder text */}
                            <td className="border px-4 py-2">{cow.bcs_score}</td>
                            <td className="border px-4 py-2">{cow.notes}</td>
                            <td className="border px-4 py-2">
                                <button 
                                    onClick={() => handleDelete(cow.id)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );    
};

export default RecordsPage;