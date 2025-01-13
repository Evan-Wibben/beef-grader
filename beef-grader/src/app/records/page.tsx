'use client';

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Image from 'next/image';
import withAuth from '../components/withAuth';
import Hero from '../components/Hero';
import { motion, AnimatePresence } from 'framer-motion';

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
        <motion.div 
        layout
        className="bg-white shadow-3xl rounded-lg overflow-hidden flex flex-col h-fit"
    >
        <div className="p-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Tag #{cow.breed}</h3>
                <button onClick={() => onExpand(cow.id)} className="focus:outline-none">
                    {isExpanded ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
                            <g id="Group_16" data-name="Group 16" transform="translate(-371 -1442)">
                                <g id="Ellipse_9" data-name="Ellipse 9" transform="translate(371 1442)" fill="#fff" stroke="#0f505c" strokeWidth="2">
                                <circle cx="11" cy="11" r="11" stroke="none"/>
                                <circle cx="11" cy="11" r="10" fill="none"/>
                                </g>
                                <line id="Line_29" data-name="Line 29" x2="9.284" transform="translate(377.358 1453)" fill="none" stroke="#0f505c" strokeLinecap="round" strokeWidth="2"/>
                            </g>
                        </svg>
                          
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
                                <g id="Group_15" data-name="Group 15" transform="translate(-371 -1340)">
                                    <g id="Ellipse_7" data-name="Ellipse 7" transform="translate(371 1340)" fill="#fff" stroke="#0f505c" strokeWidth="2">
                                        <circle cx="11" cy="11" r="11" stroke="none"/>
                                        <circle cx="11" cy="11" r="10" fill="none"/>
                                    </g>
                                    <line id="Line_24" data-name="Line 24" y2="8.44" transform="translate(382 1346.78)" fill="none" stroke="#0f505c" strokeLinecap="round" strokeWidth="2"/>
                                    <line id="Line_25" data-name="Line 25" x2="9.284" transform="translate(377.358 1351)" fill="none" stroke="#0f505c" strokeLinecap="round" strokeWidth="2"/>
                                </g>
                            </svg>
                        )}
                </button>
            </div>
        </div>
        <AnimatePresence>
            {isExpanded && (
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                >
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
                        <div className='bg-brandLightGreen rounded-lg p-2 mb-4'>
                            <div className="flex items-center mb-2">
                                <span className={`w-3 h-3 rounded-full ${getClassificationColor(cow.bcs_score)}`} />
                                <p className="text-md font-bold ml-2">BCS Score: {getBCSScore(cow.bcs_score)}</p>
                            </div>
                            <p className="text-sm text-brandGray">Age: {cow.age}</p>
                            <p className="text-sm text-brandGray">Pasture: {cow.pasture || 'No Pasture'}</p>
                            <p className="text-sm text-brandGray">Notes: {cow.notes}</p>
                        </div>
                        <button 
                            onClick={() => handleDelete(cow.id)}
                            className="red-button w-full"
                        >
                            Remove from Pasture
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </motion.div>
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
        <div className='bg-brandLightBlue'>
            <Hero 
                    title="All Herd Records" 
                    imageSrc="https://bcs-app.s3.us-east-1.amazonaws.com/Hero+Images/BCS_Records_Hero.webp"
                    imageAlt="Cattle grazing in a field"
                />
            <div className="block-container">
                
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
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