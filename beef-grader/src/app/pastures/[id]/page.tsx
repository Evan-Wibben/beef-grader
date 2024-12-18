'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import withAuth from '../../components/withAuth';
import Hero from '../../components/Hero';
import PieChart from '../../components/PieChart';

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

const CowCard: React.FC<{ 
    cow: Cow; 
    onDeleteCow: (id: number) => void;
    isExpanded: boolean;
    onExpand: (id: number) => void;
}> = ({ cow, onDeleteCow, isExpanded, onExpand }) => {
    function getClassificationColor(classification: string | null) {
        switch (classification) {
            case 'Beef 1-3':
            case 'Beef 8-9':
                return 'bg-red-500';
            case 'Beef 4':
            case 'Beef 7':
                return 'bg-yellow-500';
            case 'Beef 5':
            case 'Beef 6':
                return 'bg-green-500';
            default:
                return 'bg-gray-500';
        }
    }

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-fit">
            <div className="p-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">Tag #: {cow.breed}</h3>
                    <div className="flex items-center">
                        <span className={`w-3 h-3 rounded-full ${getClassificationColor(cow.bcs_score)}`} />
                        <p className="text-sm text-gray-600 ml-2">BCS Score: {cow.bcs_score}</p>
                    </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                    <button 
                        onClick={() => onExpand(cow.id)}
                        className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brandGreen hover:bg-[#456422]"
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
                        <div className="w-full h-64 relative mb-2">
                            <Image
                                src={cow.image_url}
                                alt={`Cow tag ${cow.breed}`}
                                fill
                                style={{ objectFit: 'contain' }}
                            />
                        </div>
                    )}
                    <div className='bg-brandLightGreen rounded-lg p-2'>
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
    const [expandedCowId, setExpandedCowId] = useState<number | null>(null);

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

    const handleExpand = (cowId: number) => {
        setExpandedCowId(prevId => prevId === cowId ? null : cowId);
    };

    if (error) return <p className="text-red-500">{error}</p>;
    if (!pastureData) return <p>Loading...</p>;

    return (
        <div className="bg-brandLightGreen">
            <div className="container mx-auto p-4">
                <Hero 
                    title={pastureData.name}
                />

                <PieChart cows={pastureData.cows} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pastureData.cows.map((cow) => (
                        <CowCard 
                            key={cow.id} 
                            cow={cow} 
                            onDeleteCow={handleDeleteCow}
                            isExpanded={expandedCowId === cow.id}
                            onExpand={handleExpand}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default withAuth(PasturePage);