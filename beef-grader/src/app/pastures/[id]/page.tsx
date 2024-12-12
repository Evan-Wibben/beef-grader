'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import CowsForPasture from '../../components/CowsForPasture';
import withAuth from '../../components/withAuth'

// Define the Cow interface
interface Cow {
    id: number;
    breed: string;
    age: number;
    notes: string;
    bcs_score: string;
    image_url: string | null;
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

    const handleDeleteCow = async (cowId: number) => {
        if (confirm('Are you sure you want to remove this cow from the pasture?')) {
            try {
                const response = await fetch(`/api/pastures/${id}?cowId=${cowId}`, {
                    method: 'DELETE',
                });
    
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Delete Error:', errorData); // Log delete error details
                    throw new Error(errorData.error || 'Failed to remove cow');
                }
    
                // Refresh pasture data after removal
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
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">{pastureData.name}</h1>
            <CowsForPasture 
                cows={pastureData.cows} 
                onDeleteCow={handleDeleteCow} // Pass the delete handler to the component
            />
        </div>
    );
};

export default withAuth(PasturePage);