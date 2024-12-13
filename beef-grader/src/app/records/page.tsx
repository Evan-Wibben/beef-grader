'use client';

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Image from 'next/image';
import withAuth from '../components/withAuth';

interface Cow {
    id: number;
    breed: string;
    age: number;
    pasture: string | null;
    notes: string;
    bcs_score: string;
    image_url: string | null;
}

const CowCard: React.FC<{ cow: Cow; handleDelete: (id: number) => void }> = ({ cow, handleDelete }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">Tag #: {cow.breed}</h3>
                    <p className="text-sm text-gray-600">BCS Score: {cow.bcs_score}</p>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                    <button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                        {isExpanded ? 'Hide Details' : 'Show Details'}
                    </button>
                    <button 
                        onClick={() => handleDelete(cow.id)}
                        className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
            {isExpanded && (
                <div className="p-4 border-t border-gray-200">
                    {cow.image_url && (
                        <div className="w-full h-48 relative mb-4">
                            <Image
                                src={cow.image_url}
                                alt={`${cow.breed} cow`}
                                layout="fill"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    )}
                    <div>
                        <p className="text-sm text-brandGray">Age: {cow.age}</p>
                        <p className="text-sm text-brandGray">Pasture: {cow.pasture || 'No Pasture'}</p>
                        <p className="text-sm text-brandGray">Notes: {cow.notes}</p>
                    </div>
                </div>
            )}
        </div>
    );
};


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

    // Return content for frontend
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='bg-brandLightGreen'>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6">Cow Records</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cows.map((cow) => (
                        <CowCard key={cow.id} cow={cow} handleDelete={handleDelete} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default withAuth(RecordsPage);
