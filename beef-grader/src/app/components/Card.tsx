import React from 'react';
import Link from 'next/link';

interface CardProps {
    title: string;
    description: string;
    link: string;
    icon: React.ReactNode; // Accepts any React node (like an icon)
}

const Card: React.FC<CardProps> = ({ title, description, link, icon }) => (
    <Link href={link} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
        <div className="p-6">
            <div className="text-4xl text-brandGreen mb-4">{icon}</div>
            <h3 className="text-2xl font-semibold text-brandBrown mb-2">{title}</h3>
            <p className="text-brandGray">{description}</p>
        </div>
    </Link>
);

export default Card;