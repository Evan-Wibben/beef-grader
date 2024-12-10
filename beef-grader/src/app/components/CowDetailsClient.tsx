'use client';

import React from 'react';
import CowDetails from './CowDetails';
import Cookies from 'js-cookie'; // Import js-cookie to manage cookies

interface CowDetailsType {
    breed: string;
    age: number | null;
    pasture: string | null;
    notes: string | null;
    bcs_score: string | null;
    userId: string; // Include userId in the type
}

interface CowDetailsClientProps {
    onSubmit: (details: CowDetailsType) => void;
    classification: string | null;
}

const CowDetailsClient: React.FC<CowDetailsClientProps> = ({ onSubmit, classification }) => {
    const handleSubmit = (details: Omit<CowDetailsType, 'bcs_score' | 'userId'>) => {
        const userId = Cookies.get('userId'); // Retrieve userId from cookies

        onSubmit({
            ...details,
            bcs_score: classification,
            userId: userId || '', // Include userId in the submission
        });
    };

    return <CowDetails onSubmit={handleSubmit} classification={classification} />;
};

export default CowDetailsClient;