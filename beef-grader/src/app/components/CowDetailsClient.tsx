'use client';

import React from 'react';
import CowDetails from './CowDetails';

interface CowDetailsType {
    breed: string;
    age: number | null;
    pasture: string | null;
    notes: string | null;
    bcs_score: string | null;
}

interface CowDetailsClientProps {
    onSubmit: (details: CowDetailsType) => void;
    classification: string | null;
}

const CowDetailsClient: React.FC<CowDetailsClientProps> = ({ onSubmit, classification }) => {
    const handleSubmit = (details: Omit<CowDetailsType, 'bcs_score'>) => {
        onSubmit({
            ...details,
            bcs_score: classification
        });
    };

    return <CowDetails onSubmit={handleSubmit} classification={classification} />;
};

export default CowDetailsClient;