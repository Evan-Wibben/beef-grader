import React from 'react';

interface Cow {
    id: number;
    breed: string;
    age: number;
    notes: string;
    bcs_score: string;
}

interface CowsForPastureProps {
    cows: Cow[];
    onDeleteCow: (cowId: number) => void; // Add this prop type
}

const CowsForPasture: React.FC<CowsForPastureProps> = ({ cows, onDeleteCow }) => {
    if (cows.length === 0) {
        return <p>No cows in this pasture.</p>;
    }

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Cows in this Pasture</h2>
            <ul className="space-y-2">
                {cows.map(cow => (
                    <li key={cow.id} className="bg-white shadow rounded-lg p-4 flex justify-between items-center">
                        <div>
                            <h3 className="font-semibold">{cow.breed}</h3>
                            <p>Age: {cow.age}</p>
                            <p>Notes: {cow.notes}</p>
                            <p>BCS Score: {cow.bcs_score}</p>
                        </div>
                        <button 
                            onClick={() => onDeleteCow(cow.id)} 
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CowsForPasture;
