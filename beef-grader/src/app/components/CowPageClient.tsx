'use client';

import React, { useState } from 'react';
import CameraComponent from '../components/CameraComp';
import CowDetailsClient from './CowDetailsClient';
import Cookies from 'js-cookie'; // Import js-cookie to manage cookies

interface CowDetailsType {
    breed: string;
    age: number | null;
    pasture: string | null;
    notes: string | null;
    bcs_score: string | null;
    userId: string; // Include userId in the type
}

const CowForm: React.FC = () => {
    const [classification, setClassification] = useState<string | null>(null);

    const handleCowSubmit = async (details: Omit<CowDetailsType, 'userId'>) => {
        const userId = Cookies.get('userId'); // Retrieve userId from cookies
        console.log('Retrieved user ID from cookies:', userId); // Debug log for user ID

        if (!userId) {
            console.error('User ID is not available. Please log in.');
            return; // Handle case where userId is not available
        }

        const dataToSubmit = {
            ...details,
            bcs_score: classification,
            userId: userId || '', // Include userId in the submission
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
                const errorDetails = await response.text(); // Log the response text
                throw new Error(`Failed to submit cow data: ${errorDetails}`);
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