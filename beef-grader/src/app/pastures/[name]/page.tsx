"use client"; // Ensure this line is present

import { useParams } from 'next/navigation';
import { usePastureContext } from '../../context/PastureContext';
import { useCowContext } from '../../context/CowContext';

const PasturePage: React.FC = () => {
    const { name } = useParams(); // Get the dynamic route parameter for pasture name
    const { pastures } = usePastureContext();
    const { submissions } = useCowContext();

    // Log for debugging
    console.log("Retrieved pasture name:", name);
    console.log("Available pastures:", pastures);

    // Normalize and find the pasture based on the name from the URL
    const pastureName = typeof name === 'string' ? decodeURIComponent(name.trim().toLowerCase()) : '';
    const pasture = pastures.find(p => p.name.trim().toLowerCase() === pastureName);

    // Filter cows associated with this pasture using the pasture name
    const associatedCows = submissions.filter(cow => cow.pasture.trim().toLowerCase() === pastureName);

    // Log associated cows for debugging
    console.log("Associated cows:", associatedCows);

    if (!pasture) return <div>Pasture not found</div>; // Handle not found case

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">{pasture.name}</h1>
            <h2 className="text-2xl font-semibold mb-4">Associated Cows</h2>
            {associatedCows.length === 0 ? (
                <p>No cows in this pasture</p>
            ) : (
                <ul className="space-y-2">
                    {associatedCows.map((cow, index) => (
                        <li key={index} className="bg-white shadow rounded-lg p-4">
                            <p><strong>Breed:</strong> {cow.breed}</p>
                            <p><strong>Age:</strong> {cow.age}</p>
                            <p><strong>Notes:</strong> {cow.notes}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PasturePage;