import React from 'react';
import Link from 'next/link';

interface CardButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const CardButton: React.FC<CardButtonProps> = ({ href, children, className = '' }) => {
  const baseStyle = 'bg-brandGreen text-white px-6 py-2 rounded-full font-semibold';
  const buttonStyle = `${baseStyle} ${className}`;

  return (
    <Link href={href} className={buttonStyle}>
      {children}
    </Link>
  );
};

export default CardButton;