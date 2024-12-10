'use client';

import React, { useState } from 'react';
import CameraComponent from '../components/CameraComp';
import CowDetailsClient from './CowDetailsClient';

interface CowDetailsType {
    breed: string;
    age: number | null;
    pasture: string | null;
    notes: string | null;
    bcs_score: string | null;
}

const CowForm: React.FC = () => {
    const [classification, setClassification] = useState<string | null>(null);

    const handleCowSubmit = async (details: CowDetailsType) => {
        const dataToSubmit = {
            ...details,
            bcs_score: classification
        };
        console.log('Cow details to be submitted:', dataToSubmit);
        
        try {
            const response = await fetch('/api/submit-cow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSubmit),
            });

            if (!response.ok) {
                throw new Error('Failed to submit cow data');
            }

            const result = await response.json();
            console.log('Submission successful:', result);
            
            // Clear classification after successful submission
            setClassification(null);
        } catch (error) {
            console.error('Error submitting cow data:', error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Add Cow Details</h1>
            <CameraComponent 
                setClassification={setClassification} 
            />
            <CowDetailsClient 
                onSubmit={handleCowSubmit} 
                classification={classification} 
            />
        </div>
    );
};

export default CowForm;