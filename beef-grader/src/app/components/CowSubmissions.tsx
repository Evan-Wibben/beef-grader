"use client";

import React from 'react';
import { useCowContext } from '../context/CowContext';

const CowSubmissionsClient: React.FC = () => {
    const { submissions } = useCowContext();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Cow Submissions</h1>
            {submissions.length === 0 ? (
                <p>No submissions yet.</p>
            ) : (
                <table className="min-w-full bg-white">
                    <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Breed</th>
                        <th className="py-3 px-6 text-left">Age</th>
                        <th className="py-3 px-6 text-left">Pasture</th>
                        <th className="py-3 px-6 text-left">Notes</th>
                    </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                    {submissions.map((submission, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left">{submission.breed}</td>
                            <td className="py-3 px-6 text-left">{submission.age}</td>
                            <td className="py-3 px-6 text-left">{submission.pasture}</td>
                            <td className="py-3 px-6 text-left">{submission.notes}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CowSubmissionsClient;