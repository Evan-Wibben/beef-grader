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
    pastureId?: number; 
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

    function getClassificationColor(classification: string | null) {
        switch(classification) {
            case 'Beef 1-3':
            case 'Beef 8-9':
                return 'bg-red-500';
            case 'Beef 4':
            case 'Beef 7':
                return 'bg-yellow-500';
            case 'Beef 5':
            case 'Beef 6':
                return 'bg-green-500';
            default:
                return 'bg-gray-500';
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 block-container" ref={formRef}>
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
            
            {classification && (
                <div className="flex items-center justify-center my-4">
                    <div className={`relative w-32 h-32 flex items-center justify-center rounded-full 
                        ${getClassificationColor(classification)}
                    `}>
                        <input
                            type="text"
                            value={classification}
                            readOnly
                            className="text-lg font-bold text-center bg-white rounded-full w-24 h-24 border-none focus:outline-none"
                        />
                    </div>
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-gray-700">Tag Number</label>
                <input
                    type="text"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-transparent outline-none transition duration-200 ease-in-out"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Age (Optional)</label>
                <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value === '' ? '' : Number(e.target.value))}
                    className="mt-1 block w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-transparent outline-none transition duration-200 ease-in-out"
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
                <label className="block text-sm font-medium text-gray-700">Notes (Optional)</label>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-transparent outline-none transition duration-200 ease-in-out"
                    rows={4}
                />
            </div>


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