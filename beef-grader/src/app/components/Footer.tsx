import React from 'react';
import Link from 'next/link';
import BeefLogo from '/public/images/BeefLogo.png';
import Image from 'next/image';

const Footer: React.FC = () => {
    // Define the mapping between front-facing names and routes
    const routeMapping = {
        Groups: 'pastures',
        Records: 'records',
        'Create Entry': 'create-entry'
    };

    const navItems = Object.keys(routeMapping) as Array<keyof typeof routeMapping>;

    return (
        <footer className="bg-brandTeel text-white py-8">
            <div className="block-container">
                <div className="grid grid-cols-1 gap-6 justify-items-center">
                    <div>
                        <h2 className="text-xl font-bold mb-4">Quick Links</h2>
                        <ul className="space-y-4 text-center">
                            {navItems.map((item) => (
                                <li key={item}>
                                    <Link
                                        href={routeMapping[item]}
                                        className="text-md hover:text-gray-400 transition duration-300"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="my-8 border-white text-brandLimeGreen text-center text-sm italic">
                    &copy; {new Date().getFullYear()} Paulsen
                </div>
            </div>
        </footer>
    );
};

export default Footer;