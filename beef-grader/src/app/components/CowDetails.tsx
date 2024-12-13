'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePastureContext } from '../context/PastureContext';

interface CowDetailsProps {
    onSubmit: (details: CowDetailsType) => void;
    classification: string | null;
    imagePath: string | null;
}

interface CowDetailsType {
    breed: string;
    age: number | null;
    pasture: string | null;
    notes: string | null;
    bcs_score: string | null;
    userId: string;
    pastureId?: number; // Made optional
    imagePath: string | null;
}

const CowDetails: React.FC<CowDetailsProps> = ({ onSubmit, classification, imagePath }) => {
    const { pastures } = usePastureContext();
    const [breed, setBreed] = useState('');
    const [age, setAge] = useState<number | ''>('');
    const [pastureName, setPastureName] = useState('');
    const [notes, setNotes] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    
    const formRef = useRef<HTMLFormElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!classification) {
            setBreed('');
            setAge('');
            setPastureName('');
            setNotes('');
            if (formRef.current) {
                formRef.current.reset();
            }
        }
    }, [classification]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submission started in CowDetails");
        setIsLoading(true);
        setErrorMessage(null);
    
        if (!breed) {
            setErrorMessage('Breed is a required field.');
            setIsLoading(false);
            return;
        }

        const selectedPasture = pastures.find(p => p.name === pastureName);

        const cowData: CowDetailsType = {
            breed,
            age: age ? Number(age) : null,
            pasture: pastureName || null,
            notes: notes || null,
            bcs_score: classification,
            userId: '', 
            pastureId: selectedPasture?.id, // Use optional chaining
            imagePath: imagePath
        };
    
        console.log("Cow data prepared:", cowData);
    
        try {
            console.log("Calling onSubmit with cow data");
            await onSubmit(cowData);
            console.log("onSubmit completed successfully");
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrorMessage('Failed to submit cow data');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4" ref={formRef}>
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
            
            <div>
                <label className="block text-sm font-medium text-gray-700">Tag Number</label>
                <input
                    type="text"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value === '' ? '' : Number(e.target.value))}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Pasture (Optional)</label>
                <select
                    value={pastureName}
                    onChange={(e) => setPastureName(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                >
                    <option value="">Select a pasture</option>
                    {pastures.map((pasture) => (
                        <option key={pasture.id} value={pasture.name}>{pasture.name}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    rows={4}
                />
            </div>

            {classification && (
                <div>
                    <label className="block text-sm font-medium text-gray-700">BCS Score</label>
                    <input
                        type="text"
                        value={classification}
                        readOnly
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                    />
                </div>
            )}

            <button 
                type="submit"
                className={`px-4 py-2 rounded-lg shadow-md transition duration-300 ${
                    isLoading || !classification || !breed
                        ? 'bg-brandGray text-white'
                        : 'bg-brandGreen text-white hover:bg-brandBrown'
                }`}
                disabled={isLoading || !classification || !breed}
            >
                {isLoading ? 'Submitting...' : 'Submit'}
                {(isLoading || !classification || !breed) && ''}
            </button>
        </form>
    );
};

export default CowDetails;