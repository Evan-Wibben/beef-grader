export const dynamic = 'force-static'

import React from 'react';
import Image from 'next/image';
import Hero from '../../components/Hero';
import PieChart from '../../components/PieChart';
import pool from '../../../lib/db'; // Adjust the path as needed

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

const CowCard: React.FC<{ cow: Cow }> = ({ cow }) => {
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
                {cow.image_url && (
                    <div className="w-full h-64 relative mt-2">
                        <Image
                            src={cow.image_url}
                            alt={`Cow tag ${cow.breed}`}
                            fill
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                )}
                <div className='bg-brandLightGreen rounded-lg p-2 mt-2'>
                    <p className="text-sm text-brandGray">Age: {cow.age}</p>
                    <p className="text-sm text-brandGray">Notes: {cow.notes}</p>
                </div>
            </div>
        </div>
    );
};

interface PasturePageProps {
    params: Promise<{ id: string }>;
  }

  export default async function PasturePage({ params }: PasturePageProps) {
    const { id } = await params;
    const pastureData = await getPastureData(id);

    if (!pastureData) {
        return <p>Pasture not found</p>;
    }

    return (
        <div className="bg-brandLightGreen">
            <div className="container mx-auto p-4">
                <Hero title={pastureData.name} />
                <PieChart cows={pastureData.cows} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pastureData.cows.map((cow) => (
                        <CowCard key={cow.id} cow={cow} />
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