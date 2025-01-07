'use client';

import React, { useState } from 'react';
import CameraComponent from './CameraComp';
import CowDetailsClient from './CowDetailsClient';
import Cookies from 'js-cookie';
import Hero from '../components/Hero';

interface CowDetailsType {
    breed: string;
    age?: number | null;
    pasture: string | null;
    notes: string | null;
    bcs_score: string | null;
    userId: string;
    pastureId?: number;
    imagePath: string | null;
}

const CowForm: React.FC = () => {
    const [classification, setClassification] = useState<string | null>(null);
    const [imagePath, setImagePath] = useState<string | null>(null);

    const handleCowSubmit = async (details: Omit<CowDetailsType, 'userId' | 'bcs_score' | 'imagePath'>) => {
        const userId = Cookies.get('userId');
        if (!userId) {
            console.error('User ID is not available. Please log in.');
            return;
        }

        const dataToSubmit = {
            ...details,
            bcs_score: classification,
            userId: userId,
            imagePath: imagePath
        };
        
        try {
            const response = await fetch('/api/submit-cow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSubmit),
            });

            if (!response.ok) {
                const errorDetails = await response.text();
                throw new Error(`Failed to submit cow data: ${errorDetails}`);
            }

            const result = await response.json();
            console.log('Submission successful:', result);
            
            setClassification(null);
            setImagePath(null);
        } catch (error) {
            console.error('Error submitting cow data:', error);
        }
    };

    return (
        <div className='bg-brandLightGreen'>
            <div className="p-6">
                <Hero 
                    title="Create Record" 
                    imageSrc="https://bcs-app.s3.us-east-1.amazonaws.com/Hero+Images/BCS_Home_Hero.jpg"
                    imageAlt="Cattle grazing in a field"
                />
                <CameraComponent 
                    setClassification={setClassification}
                    setImagePath={setImagePath}
                />
                <CowDetailsClient 
                    onSubmit={handleCowSubmit} 
                    classification={classification}
                    imagePath={imagePath}
                />
            </div>
        </div>

    );
};

export default CowForm;