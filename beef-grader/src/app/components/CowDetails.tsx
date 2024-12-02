import { usePastureContext } from '../context/PastureContext';
import { useState, useRef } from 'react';

interface CowDetailsProps {
    onSubmit: (details: { breed: string; age: number; pasture: string; notes: string }) => void;
}

const CowDetails: React.FC<CowDetailsProps> = ({ onSubmit }) => {
    const { pastures } = usePastureContext();
    const [breed, setBreed] = useState('');
    const [age, setAge] = useState<number | ''>('');
    const [pastureName, setPastureName] = useState('');
    const [notes, setNotes] = useState('');

    // Create a ref for the form
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ breed, age: Number(age), pasture: pastureName, notes });

        // Reset form fields
        setBreed('');
        setAge('');
        setPastureName('');
        setNotes('');

        // Optionally reset the form using ref
        if (formRef.current) {
            formRef.current.reset(); // This will clear all inputs in the form
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4" ref={formRef}>
            <div>
                <label className="block text-sm font-medium text-gray-700">Breed</label>
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
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Pasture</label>
                <select
                    value={pastureName}
                    onChange={(e) => setPastureName(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
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

            <button type="submit"
                    className="bg-brandGreen text-white px-4 py-2 rounded-lg shadow-md hover:bg-brandBrown transition duration-300">
                Submit
            </button>
        </form>
    );
};

export default CowDetails;