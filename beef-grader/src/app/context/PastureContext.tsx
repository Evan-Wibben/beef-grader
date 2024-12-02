"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Pasture {
    id: string;
    name: string;
}

interface PastureContextType {
    pastures: Pasture[];
    addPasture: (pasture: Pasture) => void;
}

const PastureContext = createContext<PastureContextType | undefined>(undefined);

export const PastureProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [pastures, setPastures] = useState<Pasture[]>([]);

    const addPasture = (pasture: Pasture) => {
        setPastures((prevPastures) => [...prevPastures, pasture]);
    };

    return (
        <PastureContext.Provider value={{ pastures, addPasture }}>
            {children}
        </PastureContext.Provider>
    );
};

export const usePastureContext = () => {
    const context = useContext(PastureContext);
    if (!context) {
        throw new Error('usePastureContext must be used within a PastureProvider');
    }
    return context;
};