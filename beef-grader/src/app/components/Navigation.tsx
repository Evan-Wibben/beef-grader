'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Squash as Hamburger } from 'hamburger-react';
import Cookies from 'js-cookie'; // Import js-cookie for cookie management
import { useRouter } from 'next/navigation'; // Import useRouter for redirection

const Navigation: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navItems = ['Pastures', 'Records', 'Create Entry'];
    const router = useRouter(); // Initialize router

    const menuVariants = {
        closed: {
            opacity: 0,
            height: 0,
            transition: {
                duration: 0.3,
                when: "afterChildren",
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        },
        open: {
            opacity: 1,
            height: "auto",
            transition: {
                duration: 0.3,
                when: "beforeChildren",
                staggerChildren: 0.05,
                staggerDirection: 1
            }
        }
    };

    const itemVariants = {
        closed: { opacity: 0, y: -10 },
        open: { opacity: 1, y: 0 }
    };

    const handleSignOut = () => {
        Cookies.remove('userId'); // Remove the userId cookie
        router.push('/login'); // Redirect to login page after signing out
    };

    return (
        <nav className="bg-brandGreen text-white shadow-lg pt-10">
            <div className="block-container py-4">
                <div className="flex justify-between items-center">
                    <Link href="/" className="flex items-center space-x-3">
                        <span className="text-2xl font-extrabold tracking-tight">Beef Grader</span>
                    </Link>
                    <ul className="hidden md:flex space-x-6">
                        {navItems.map((item) => (
                            <li key={item} className="p-2 transition duration-300 relative group m-0">
                                <Link href={`/${item.toLowerCase().replace(' ', '-')}`}
                                      className="text-white text-lg font-medium relative py-1">
                                    {item}
                                    <span
                                        className="absolute left-0 bottom-0 w-0 h-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                                    <span
                                        className="absolute right-0 top-0 w-0 h- bg-white transition-all duration=300 group-hover:w-full"></span>
                                </Link>
                            </li>
                        ))}
                        {/* Add Sign Out Option */}
                        <li className="p-2 transition duration=300 relative group m= 00">
                            <button onClick={handleSignOut} className="text-white text-lg font-medium relative py= 01">
                                Sign Out
                            </button>
                        </li>
                    </ul>
                    <div className="md:hidden">
                        <Hamburger toggled={isOpen} toggle={setIsOpen}/>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div initial="closed" animate="open" exit="closed" variants={menuVariants}
                                className="md:hidden overflow-hidden">
                        <motion.ul className="flex flex-col">
                            {navItems.map((item) => (
                                <motion.li key={item} variants={itemVariants} className="border-t border-white/20">
                                    <Link href={`/${item.toLowerCase().replace(' ', '-')}`}
                                          className="block py=03 px=04 text-lg hover:bg-white/10 transition"
                                          onClick={() => setIsOpen(false)}>
                                        {item}
                                    </Link>
                                </motion.li>
                            ))}
                            {/* Mobile Sign Out Option */}
                            <motion.li variants={itemVariants} className="border-t border-white/20">
                                <button onClick={handleSignOut} className="block py=03 px=04 text-lg hover:bg-white/10 transition">
                                    Sign Out
                                </button>
                            </motion.li>
                        </motion.ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navigation;