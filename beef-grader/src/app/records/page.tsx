'use client';

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Image from 'next/image';
import withAuth from '../components/withAuth';
import Hero from '../components/Hero';

interface Cow {
    id: number;
    breed: string;
    age: number;
    pasture: string | null;
    notes: string;
    bcs_score: string;
    image_url: string | null;
}

const CowCard: React.FC<{ 
    cow: Cow; 
    handleDelete: (id: number) => void;
    isExpanded: boolean;
    onExpand: (id: number) => void;}> = ({ cow, handleDelete, isExpanded, onExpand }) => {
    
    function getClassificationColor(classification: string | null) {
        switch (classification) {
            case 'Beef 1-3':
                return 'bg-brandRed';
            case 'Beef 8-9':
                return 'bg-brandRed';
            case 'Beef 4':
                return 'bg-brandYellow';
            case 'Beef 7':
                return 'bg-brandYellow';
            case 'Beef 5':
                return 'bg-brandBlue';
            case 'Beef 6':
                return 'bg-brandLimeGreen';
            default:
                return 'bg-brandGray';
        }
    }

    const getBCSScore = (score: string) => {
        if (score === 'Beef 1-3') return '1-3';
        if (score === 'Beef 4') return '4';
        if (score === 'Beef 5') return '5';
        if (score === 'Beef 6') return '6';
        if (score === 'Beef 7') return '7';
        if (score === 'Beef 8-9') return '8-9';
        return score;
    }

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-fit">
            <div className="p-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">Tag #: {cow.breed}</h3>
                    <div className="flex items-center">
                        <span className={`w-3 h-3 rounded-full ${getClassificationColor(cow.bcs_score)}`} />
                        <p className="text-md font-bold ml-2">BCS Score: {getBCSScore(cow.bcs_score)}</p>
                    </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                    <button 
                        onClick={() => onExpand(cow.id)}
                        className="teel-button"
                    >
                        {isExpanded ? 'Hide Details' : 'Show Details'}
                    </button>
                    <button 
                        onClick={() => handleDelete(cow.id)}
                        className="red-button"
                    >
                        Delete
                    </button>
                </div>
            </div>
            {isExpanded && (
                <div className="p-4 border-t border-gray-200">
                    {cow.image_url && (
                        <div className="relative w-full h-auto">
                            <Image
                                src={cow.image_url}
                                alt={`Cow tag ${cow.breed}`}
                                width={500}
                                height={300}
                                style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
                            />
                        </div>
                    
                    )}
                    <div className='bg-gray-100 rounded-lg p-2'>
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
    const [expandedCowId, setExpandedCowId] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

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

    const handleExpand = (cowId: number) => {
        setExpandedCowId(prevId => prevId === cowId ? null : cowId);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredCows = searchTerm ? cows.filter(cow => cow.breed.toLowerCase().includes(searchTerm.toLowerCase())) : cows;

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='bg-brandLightGreen'>
            <div className="container mx-auto p-4">
                <Hero 
                    title="All Herd Records" 
                    imageSrc="https://bcs-app.s3.us-east-1.amazonaws.com/Hero+Images/BCS_Pasture_Individual.webp"
                    imageAlt="Cattle grazing in a field"
                />
                <div className="flex justify-center">
                    <div className="mb-4 w-full max-w-96">
                        <input
                            type="text"
                            placeholder="Search by tag number..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brandDarkTeel"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredCows.map((cow) => (
                        <CowCard
                            key={cow.id}
                            cow={cow}
                            handleDelete={handleDelete}
                            isExpanded={expandedCowId === cow.id}
                            onExpand={handleExpand}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default withAuth(RecordsPage);