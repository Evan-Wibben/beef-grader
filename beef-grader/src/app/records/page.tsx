'use client';

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Image from 'next/image';
import withAuth from '../components/withAuth'

interface Cow {
    id: number;
    breed: string;
    age: number;
    pasture: string | null;
    notes: string;
    bcs_score: string;
    image_url: string | null;
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
                throw new Error('Failed to fetch cows');
            }
            const data = await response.json();
            setCows(data);
        } catch {
            setError('An error occurred while fetching cow records.');
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
                throw new Error('Failed to delete cow');
            }

            await fetchCows();
        } catch {
            setError('An error occurred while deleting the cow record.');
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Cow Records</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cows.map((cow) => (
                    <div key={cow.id} className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
                        {cow.image_url && (
                            <div className="w-full h-48 relative">
                                <Image
                                    src={cow.image_url}
                                    alt={`${cow.breed} cow`}
                                    layout="fill"
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        )}
                        <div className="px-4 py-5 sm:p-6 flex-grow">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">{cow.breed}</h3>
                            <div className="mt-2 max-w-xl text-sm text-gray-500">
                                <p>Age: {cow.age}</p>
                                <p>Pasture: {cow.pasture || 'No Pasture'}</p>
                                <p>BCS Score: {cow.bcs_score}</p>
                                <p>Notes: {cow.notes}</p>
                            </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button 
                                onClick={() => handleDelete(cow.id)}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
    
};

export default withAuth(RecordsPage);