export const dynamic = 'force-static'

import React from 'react';
import Image from 'next/image';
import Hero from '../../components/Hero';
import PieChart from '../../components/PieChart';
import pool from '../../../lib/db'; // Adjust the path as needed
import LineChart from '../../components/LineChart';

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

const CowCard: React.FC<{ cow: Cow }> = ({ cow }) => {
    function getClassificationColor(classification: string | null) {
        switch (classification) {
            case 'Beef 1-3':
                return 'bg-[#dc2626]';
            case 'Beef 8-9':
                return 'bg-[#dc262680]';
            case 'Beef 4':
                return 'bg-[#ffce56]';
            case 'Beef 7':
                return 'bg-[#36a2eb]';
            case 'Beef 5':
                return 'bg-[#bbdd36]';
            case 'Beef 6':
                return 'bg-[#5a822b]';
            default:
                return 'bg-[#808080]';
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

  export default async function PasturePage({ params }: PasturePageProps) {
    const { id } = await params;
    const pastureData = await getPastureData(id);

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
        <div className="bg-brandLightGreen">
            <div className="container mx-auto p-4">
                <Hero 
                    title={pastureData.name}
                />

                <div className='md:flex justify-center gap-24 my-8'>
                    <PieChart cows={pastureData.cows} />
                    <LineChart cows={pastureData.cows} />
                </div>
                
                <div className="flex justify-center">
                    <div className="mb-4 w-full max-w-96">
                        <input
                            type="text"
                            placeholder="Search by tag number..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brandGreen"
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
    );
}

async function getPastureData(id: string): Promise<PastureData | null> {
    try {
        const pastureResult = await pool.query('SELECT * FROM pastures WHERE id = $1', [id]);
        if (pastureResult.rows.length === 0) {
            return null;
        }
        const pasture = pastureResult.rows[0];
        const cowsResult = await pool.query('SELECT id, breed, age, notes, bcs_score, image_url FROM cows WHERE pasture_id = $1', [id]);
        return {
            ...pasture,
            cows: cowsResult.rows,
        };
    } catch (error) {
        console.error('Error fetching pasture data:', error);
        return null;
    }
}

export async function generateStaticParams() {
    try {
        const result = await pool.query('SELECT id FROM pastures');
        return result.rows.map(row => ({
            id: row.id.toString()
        }));
    } catch (error) {
        console.error('Error generating static params:', error);
        return [];
    }
}
