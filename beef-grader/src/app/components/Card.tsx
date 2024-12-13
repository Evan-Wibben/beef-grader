import React from 'react';
import Buttons from './Button';

const { CardButton } = Buttons;

interface CardProps {
  title: string;
  description: string;
  link: string;
  svg?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, description, link, svg }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-brandBrown">
    <div className="p-6">
      <div className="flex items-center mb-4">
        {svg && <div className="mr-3">{svg}</div>}
        <h3 className="text-2xl font-bold text-brandBrown">{title}</h3>
      </div>
      <p className="text-brandGray leading-relaxed">{description}</p>
      <div className="mt-4 flex justify-end">
        <CardButton href={link}>
          Access
        </CardButton>
      </div>
    </div>
  </div>
);

export default Card;