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
}

interface CowDetailsClientProps {
    onSubmit: (details: Omit<CowDetailsType, 'userId' | 'bcs_score'>) => void;
    classification: string | null;
}

const CowDetailsClient: React.FC<CowDetailsClientProps> = ({ onSubmit, classification }) => {
    const handleSubmit = (details: Omit<CowDetailsType, 'userId' | 'bcs_score'>) => {
        onSubmit({
            ...details,
            pastureId: Number(details.pastureId)
        });
    };

    return <CowDetails onSubmit={handleSubmit} classification={classification} />;
};

export default CowDetailsClient;