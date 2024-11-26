import React from 'react';

interface Cow {
    id: number;
    name: string;
    breed: string;
    grade: string;
    submissionDate: string;
}

interface CowListProps {
    cows: Cow[];
}

const CowList: React.FC<CowListProps> = ({ cows }) => (
    <ul>
        {cows.length > 0 ? (
            cows.map(cow => (
                <li key={cow.id}>
                    <h3>{cow.name}</h3>
                    <p>Breed: {cow.breed}</p>
                    <p>Grade: {cow.grade}</p>
                    <p>Submitted on: {cow.submissionDate}</p>
                </li>
            ))
        ) : (
            <li>No graded cows available.</li>
        )}
    </ul>
);

export default CowList;