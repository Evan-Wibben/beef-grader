'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import withAuth from '../../components/withAuth'

interface Cow {
    id: number;
    breed: string;
    age: number;
    notes: string;
    bcs_score: string;
    image_url: string | null;
}

interface PastureData {
    id: string;
    name: string;
    cows: Cow[];
}

const CowCard: React.FC<{ cow: Cow; onDeleteCow: (id: number) => void }> = ({ cow, onDeleteCow }) => {
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
                        onClick={() => onDeleteCow(cow.id)}
                        className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                    >
                        Remove from Pasture
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
                        <p className="text-sm text-brandGray">Notes: {cow.notes}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

const PasturePage: React.FC = () => {
    const params = useParams();
    const id = params.id as string;
    const [pastureData, setPastureData] = useState<PastureData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPastureData = async () => {
            try {
                const response = await fetch(`/api/pastures/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch pasture');
                }
                const data = await response.json();
                setPastureData(data);
            } catch (err) {
                console.error(err);
                setError('Could not load pasture details.');
            }
        };

        if (id) {
            fetchPastureData();
        }
    }, [id]);

    const handleDeleteCow = async (cowId: number) => {
        if (confirm('Are you sure you want to remove this cow from the pasture?')) {
            try {
                const response = await fetch(`/api/pastures/${id}?cowId=${cowId}`, {
                    method: 'DELETE',
                });
    
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Delete Error:', errorData);
                    throw new Error(errorData.error || 'Failed to remove cow');
                }
    
                setPastureData((prev) => ({
                    ...prev!,
                    cows: prev!.cows.filter(cow => cow.id !== cowId),
                }));
            } catch (err) {
                console.error(err);
                alert('Error removing cow record');
            }
        }
    };

    if (error) return <p className="text-red-500">{error}</p>;
    if (!pastureData) return <p>Loading...</p>;

    return (
        <div className="bg-brandLightGreen">
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6">{pastureData.name}</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pastureData.cows.map((cow) => (
                        <CowCard key={cow.id} cow={cow} onDeleteCow={handleDeleteCow} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default withAuth(PasturePage);
