'use client';

import React from 'react';
import CowDetails from './CowDetails';

interface CowDetailsClientProps {
    onSubmit: (details: { breed: string; age: number; pasture: string; notes: string }) => void;
}

const CowDetailsClient: React.FC<CowDetailsClientProps> = ({ onSubmit }) => {
    return <CowDetails onSubmit={onSubmit} />;
};

export default CowDetailsClient;