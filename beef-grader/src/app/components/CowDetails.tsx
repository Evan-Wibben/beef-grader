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
    created_at: string;
}

const CowDetails: React.FC<CowDetailsProps> = ({ onSubmit, classification, imagePath }) => {
    const { pastures, fetchPastures } = usePastureContext();
    const [breed, setBreed] = useState('');
    const [age, setAge] = useState<number | ''>('');
    const [pastureName, setPastureName] = useState('');
    const [notes, setNotes] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    
    const formRef = useRef<HTMLFormElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchPastures();
    }, []);

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
            pastureId: selectedPasture?.id,
            imagePath: imagePath,
            created_at: new Date().toISOString()
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
        switch (classification) {
            case 'Beef 1-3':
                return 'bg-brandRed';
            case 'Beef 8-9':
                return 'bg-brandRed';
            case 'Beef 4':
                return 'bg-brandYellow';
            case 'Beef 7':
                return 'bg-brandYellow';
            case 'Beef 5':
                return 'bg-brandBlue';
            case 'Beef 6':
                return 'bg-brandLimeGreen';
            default:
                return 'bg-brandGray';
        }
    }
    
    const getBCSScore = (classification: string | null) => {
        if (classification === 'Beef 1-3') return '1-3';
        if (classification === 'Beef 4') return '4';
        if (classification === 'Beef 5') return '5';
        if (classification === 'Beef 6') return '6';
        if (classification === 'Beef 7') return '7';
        if (classification === 'Beef 8-9') return '8-9';
        return classification || '';
    }
    
    return (
        <div className="bg-brandLightBlue">
            <form onSubmit={handleSubmit} className="py-8 block-container" ref={formRef}>
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
            
            {classification && (
                <div className="flex items-center justify-center my-4">
                    <div className="relative w-32 h-32">
                        <svg width="100%" height="100%" viewBox="0 0 200 200">
                            <circle cx="100" cy="100" r="80" fill="none" stroke={getClassificationColor(classification)} strokeWidth="25" strokeLinecap="round" />
                            <circle cx="100" cy="100" r="65" fill="white" />
                        </svg>
                        
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl">
                            {getBCSScore(classification)}
                        </div>
                    </div>
                </div>
             )}

            <div>
                <label className="block text-md font-light text-brandGray ml-2">Tag Number *</label>
                <input
                    type="text"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                    className="form-input"
                    required
                />
            </div>

            <div>
                <label className="block text-md font-light text-brandGray ml-2">Age</label>
                <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value === '' ? '' : Number(e.target.value))}
                    className="form-input"
                />
            </div>

            <div>
                <label className="block text-md font-light text-brandGray ml-2">Group</label>
                <select
                    value={pastureName}
                    onChange={(e) => setPastureName(e.target.value)}
                    className="form-input"
                >
                    <option value="">Select a Group</option>
                    {pastures.map((pasture) => (
                        <option key={pasture.id} value={pasture.name}>{pasture.name}</option>
                    ))}
                </select>
            </div>

            <div className="pb-2">
                <label className="block text-md font-light text-brandGray ml-2">Notes</label>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="form-input"
                    rows={4}
                />
            </div>
            
            <div className="flex justify-center">
                <button type="submit" className={`px-12 py-2 rounded-lg shadow-md transition duration-300 border-2 border-brandGray ${
                    isLoading || !classification || !breed
                        ? 'bg-brandGray text-white'
                        : 'bg-brandDarkTeel text-white hover:bg-transparent hover:text-brandDarkTeel !border-brandDarkTeel'
                    }`}
                    disabled={isLoading || !classification || !breed}
                >
                    {isLoading ? 'Submitting...' : 'Submit'}
                    {(isLoading || !classification || !breed) && ''}
                </button>
            </div>
        </form>
    </div>
    );
};
export default CowDetails;