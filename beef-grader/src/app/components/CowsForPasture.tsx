import React from 'react';
import Image from 'next/image';

interface Cow {
    id: number;
    breed: string;
    age: number;
    notes: string;
    bcs_score: string;
    image_url: string | null;
}

interface CowsForPastureProps {
    cows: Cow[];
    onDeleteCow: (cowId: number) => void;
}

const CowsForPasture: React.FC<CowsForPastureProps> = ({ cows, onDeleteCow }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cows.map((cow) => (
                <div key={cow.id} className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
                    {cow.image_url && (
                        <div className="w-full h-48 relative">
                            <Image
                                src={cow.image_url}
                                alt={`${cow.breed} cow`}
                                layout="fill"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    )}
                    <div className="px-4 py-5 sm:p-6 flex-grow">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">{cow.breed}</h3>
                        <div className="mt-2 max-w-xl text-sm text-gray-500">
                            <p>Age: {cow.age}</p>
                            <p>BCS Score: {cow.bcs_score}</p>
                            <p>Notes: {cow.notes}</p>
                        </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button 
                            onClick={() => onDeleteCow(cow.id)}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Remove from Pasture
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CowsForPasture;

