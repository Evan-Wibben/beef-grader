'use client';

import React from 'react';
import CameraComponent from '../components/CameraComp';
import CowDetailsClient from '../components/CowDetailsClient';
import { useCowContext } from '../context/CowContext';

const CowPageClient: React.FC = () => {
    const { addSubmission } = useCowContext();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Cow Management</h1>
            <CameraComponent />
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Enter Cow Details</h2>
                <CowDetailsClient onSubmit={addSubmission} />
            </div>
        </div>
    );
};

export default CowPageClient;