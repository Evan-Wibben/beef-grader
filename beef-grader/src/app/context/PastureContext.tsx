"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface Pasture {
    id: number;
    name: string;
}

interface PastureContextType {
    pastures: Pasture[];
    addPasture: (pasture: Omit<Pasture, 'id'>) => Promise<void>;
    fetchPastures: () => Promise<void>;
    deletePasture: (id: number) => Promise<void>;
}

const PastureContext = createContext<PastureContextType | undefined>(undefined);

export const PastureProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [pastures, setPastures] = useState<Pasture[]>([]);

    const addPasture = async (pasture: Omit<Pasture, 'id'>) => {
        const userId = Cookies.get('userId');
        if (!userId) {
            console.error('User ID is not available. Cannot add pasture.');
            return;
        }

        const response = await fetch('/api/pastures', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...pasture, userId }),
        });

        if (response.ok) {
            const newPasture = await response.json();
            setPastures((prevPastures) => [...prevPastures, newPasture]);
        } else {
            console.error('Failed to add pasture:', await response.text());
        }
    };

    const fetchPastures = async () => {
        const userId = Cookies.get('userId');
        if (!userId) {
            console.error('User ID is not available. Cannot fetch pastures.');
            return;
        }
    
        const response = await fetch(`/api/pastures?userId=${userId}`);
        if (response.ok) {
            const data = await response.json();
            setPastures(data);
        } else {
            console.error('Failed to fetch pastures:', await response.text());
        }
    };

    const deletePasture = async (id: number) => {
        const userId = Cookies.get('userId');
        if (!userId) {
            console.error('User ID is not available. Cannot delete pasture.');
            return;
        }

        const response = await fetch(`/api/pastures?id=${id}&userId=${userId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            setPastures((prevPastures) => prevPastures.filter(pasture => pasture.id !== id));
        } else {
            console.error('Failed to delete pasture:', await response.text());
        }
    };

    return (
        <PastureContext.Provider value={{ pastures, addPasture, fetchPastures, deletePasture }}>
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
