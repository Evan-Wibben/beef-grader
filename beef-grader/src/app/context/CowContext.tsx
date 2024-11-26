'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface CowSubmission {
    breed: string;
    age: number;
    pasture: string;
    notes: string;
}

interface CowContextType {
    submissions: CowSubmission[];
    addSubmission: (submission: CowSubmission) => void;
}

const CowContext = createContext<CowContextType | undefined>(undefined);

export const CowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [submissions, setSubmissions] = useState<CowSubmission[]>([]);

    const addSubmission = (submission: CowSubmission) => {
        setSubmissions((prevSubmissions) => [...prevSubmissions, submission]);
    };

    return (
        <CowContext.Provider value={{ submissions, addSubmission }}>
            {children}
        </CowContext.Provider>
    );
};

export const useCowContext = () => {
    const context = useContext(CowContext);
    if (!context) {
        throw new Error('useCowContext must be used within a CowProvider');
    }
    return context;
};