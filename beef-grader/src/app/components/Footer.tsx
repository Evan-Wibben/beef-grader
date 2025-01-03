import React from 'react';
import Link from 'next/link';
import BeefLogo from '/public/images/BeefLogo.png';
import Image from 'next/image';

const Footer: React.FC = () => {
    // Define the mapping between front-facing names and routes
    const routeMapping = {
        Groups: 'pastures',
        Records: 'records',
        'Submit Cow': 'submit-cow'
    };

    const navItems = Object.keys(routeMapping) as Array<keyof typeof routeMapping>;

    return (
        <footer className="bg-brandGray text-white py-8">
            <div className="block-container">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
                    <div>
                        <Image
                            alt="Logo for Beef Grader"
                            src={BeefLogo}
                            className="h-16 w-auto"
                            priority
                        />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold mb-4">- Quick Links -</h2>
                        <ul className="space-y-2 text-center">
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

                <div className="mt-8 border-white text-center text-sm italic">
                    &copy; {new Date().getFullYear()} Paulsen
                </div>
            </div>
        </footer>
    );
};

export default Footer;