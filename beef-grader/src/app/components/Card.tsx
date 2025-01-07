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
  <div className="bg-white rounded-3xl shadow-3xl overflow-hidden">
    <div className="p-6 flex items-center gap-8">
      <div>
        {svg}
      </div>
      <div>
        <div className="flex items-center mb-6">
          <h3 className="text-2xl font-bold text-brandGray">{title}</h3>
        </div>
        <p className="text-brandGray leading-relaxed">{description}</p>
        <div className="mt-6 flex">
          <CardButton href={link}>
            Access
          </CardButton>
        </div>
      </div>
    </div>
  </div>
);

export default Card;