import React from 'react';
import Link from 'next/link';

interface CardButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

interface SignOutButtonProps {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const CardButton: React.FC<CardButtonProps> = ({ href, children, className = '' }) => {
  const baseStyle = 'bg-brandDarkTeel text-white px-8 py-2 rounded-md font-semibold cursor-pointer border-2 border-brandDarkTeel hover:bg-transparent hover:border-2 hover:text-brandDarkTeel';
  const buttonStyle = `${baseStyle} ${className}`;

  return (
    <Link href={href} className={buttonStyle}>
      {children}
    </Link>
  );
};

const SignOutButton: React.FC<SignOutButtonProps> = ({ href, onClick, children, className = '' }) => {
  const baseStyle = 'w-full bg-white text-brandGray px-4 py-2 rounded-md text-lg border-2 border-white hover:bg-transparent hover:border-2 hover:border-brandLimeGreen hover:text-white transition duration-300 ease-in-out font-bold text-center cursor-pointer';
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