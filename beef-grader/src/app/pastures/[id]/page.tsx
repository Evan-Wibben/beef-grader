'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import withAuth from '../../components/withAuth';
import Hero from '../../components/Hero';
import PieChart from '../../components/PieChart';
import LineChart from '../../components/LineChart';
import { motion, AnimatePresence } from 'framer-motion';

interface Cow {
    id: number;
    breed: string;
    age: number;
    notes: string;
    bcs_score: string;
    image_url: string | null;
    created_at: string;
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
                return 'bg-brandRed';
            case 'Beef 4':
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
        <motion.div layout className="bg-white shadow-3xl rounded-lg overflow-hidden flex flex-col h-fit">
            <div className="p-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-brandDarkTeel">Tag #{cow.breed}</h3>
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
                        animate={{ height: isExpanded ? 'auto' : 0 }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                    <div className="p-4">
                    <div className="flex items-center mb-2">
                                <span className={`w-4 h-4 rounded-full border-[1px] border-brandDarkTeel ${getClassificationColor(cow.bcs_score)}`} />
                                <p className="text-lg font-bold ml-2 text-brandDarkTeel">BCS SCORE: {getBCSScore(cow.bcs_score)}</p>
                            </div>
                        {cow.image_url && (
                            <div className="w-full h-64 relative mb-4">
                                <Image
                                    src={cow.image_url}
                                    alt={`Cow tag ${cow.breed}`}
                                    fill
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                        )}
                        <div className='bg-brandLightGreen rounded-lg mb-4'>
                            <div className="ml-1">
                                <p className="text-sm text-brandGray mb-1">Age: {cow.age}</p>
                                <p className="text-sm text-brandGray mb-1">Notes:</p>
                            </div>
                            <p className="text-sm text-brandGray border-[2px] p-2 border-brandLightGray">{cow.notes}</p>
                        </div>
                        <button 
                            onClick={() => onDeleteCow(cow.id)}
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

const PasturePage: React.FC = () => {
    const params = useParams();
    const id = params.id as string;
    const [pastureData, setPastureData] = useState<PastureData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [expandedCowId, setExpandedCowId] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

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

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(e.target.value);
        };
    
    const filteredCows = pastureData ? (searchTerm 
        ? pastureData.cows.filter(cow => cow.breed.toLowerCase().includes(searchTerm.toLowerCase())) 
        : pastureData.cows) 
        : [];
        

    if (error) return <p className="text-red-500">{error}</p>;
    if (!pastureData) return <p>Loading...</p>;

    return (
        <div>
            <Hero 
                title={pastureData.name}
                imageSrc="https://bcs-app.s3.us-east-1.amazonaws.com/Hero+Images/BCS_Individual_Group.webp"
                imageAlt="Cattle in a pasture."
            />
                <div className='md:flex justify-center gap-24 block-container'>
                    <PieChart cows={pastureData.cows} />
                    <LineChart cows={pastureData.cows} />
                </div>
                
            <div className="bg-brandLightBlue py-8">
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
                    

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredCows.map((cow) => (
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
                  
        </div>
    );
};

export default withAuth(PasturePage);