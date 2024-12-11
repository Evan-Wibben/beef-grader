'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import CowsForPasture from '../../components/CowsForPasture';

// Define the Cow interface
interface Cow {
    id: number;
    breed: string;
    age: number;
    notes: string;
    bcs_score: string;
}

// Define the PastureData interface using the Cow interface
interface PastureData {
    id: string;
    name: string;
    cows: Cow[];
}

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

    if (error) return <p className="text-red-500">{error}</p>;
    if (!pastureData) return <p>Loading...</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">{pastureData.name}</h1>
            <CowsForPasture cows={pastureData.cows} />
        </div>
    );
};

export default PasturePage;