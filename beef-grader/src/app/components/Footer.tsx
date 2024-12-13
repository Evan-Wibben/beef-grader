import React from 'react';
import Link from 'next/link';
import BeefLogo from '/public/images/BeefLogo.png';
import Image from 'next/image';

const Footer: React.FC = () => (
    <footer className="bg-brandGray text-white py-8">
        <div className="block-container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
                <div>
                <Image
                    alt='Logo for Beef Grader'
                    src={BeefLogo}
                    className="h-16 w-auto"
                    priority
                  />
                </div>
                <div>
                    <h2 className="text-xl font-bold mb-4">Quick Links</h2>
                    <ul className="space-y-2 text-center">
                        {['Home', 'Pastures', 'Records', 'Submit Cow'].map((item) => (
                            <li key={item}>
                                <Link
                                  href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                                    className="text-md hover:text-gray-400 transition duration-300"
                                    >
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="mt-8 border-t border-white pt-4 text-center text-sm">
                &copy; {new Date().getFullYear()} Paulsen
            </div>
        </div>
    </footer>
);

export default Footer;