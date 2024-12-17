import React from 'react';
import Link from 'next/link';

interface CardButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

interface SignOutButtonProps {
  href: string; // Add href here
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const CardButton: React.FC<CardButtonProps> = ({ href, children, className = '' }) => {
  const baseStyle = 'bg-brandGreen text-white px-6 py-2 rounded-full font-semibold cursor-pointer';
  const buttonStyle = `${baseStyle} ${className}`;

  return (
    <Link href={href} className={buttonStyle}>
      {children}
    </Link>
  );
};

const SignOutButton: React.FC<SignOutButtonProps> = ({ href, onClick, children, className = '' }) => {
  const baseStyle = 'w-full bg-brandLightGreen text-black px-4 py-2 rounded-md border-2 border-brandLightGreen hover:bg-brandGreen hover:border-2 hover:border-brandLightGreen hover:text-white transition duration-300 ease-in-out font-bold text-center cursor-pointer';
  const buttonStyle = `${baseStyle} ${className}`;

  return (
    <Link href={href} className={buttonStyle} onClick={onClick} >
        {children}
    </Link>
  );
};

const Buttons = {
  CardButton,
  SignOutButton,
};

export default Buttons;