'use client';

import React from 'react';
import CowDetails from './CowDetails';

interface CowDetailsType {
    breed: string;
    age: number | null;
    pasture: string | null;
    notes: string | null;
    bcs_score: string | null;
    userId: string;
    pastureId: number;
    imagePath: string | null; // Add this line if not already present
}

interface CowDetailsClientProps {
    onSubmit: (details: Omit<CowDetailsType, 'userId' | 'bcs_score' | 'imagePath'>) => void;
    classification: string | null;
    imagePath: string | null;
}

const CowDetailsClient: React.FC<CowDetailsClientProps> = ({ onSubmit, classification, imagePath }) => {
    const handleSubmit = (details: Omit<CowDetailsType, 'userId' | 'bcs_score' | 'imagePath'>) => {
        onSubmit({
            ...details,
            pastureId: Number(details.pastureId)
        });
    };

    return <CowDetails onSubmit={handleSubmit} classification={classification} imagePath={imagePath} />;
};

export default CowDetailsClient;