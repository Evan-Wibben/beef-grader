'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Squash as Hamburger } from 'hamburger-react';

const Navigation: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navItems = ['Pastures', 'Records', 'Create Entry'];

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

    return (
        <nav className="bg-brandGreen text-white shadow-lg">
            <div className="block-container py-4">
                <div className="flex justify-between items-center">
                    <Link href="/" className="flex items-center space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" className="fill-white">
                            <path d="M29.1,22.8c-0.9-0.9-2.3-1.1-3.4-0.6l-5.1-5c0.9-2,0.8-4.3-0.3-5.9L15.1,4c-0.8-1.2-2.1-1.9-3.7-2c-2-0.2-4,0.7-5.6,2.2  L4.3,5.9C2.7,7.4,1.9,9.3,2,11.2c0.1,1.5,0.7,2.8,1.8,3.7l6.8,5.7c0.9,0.8,2.1,1.1,3.3,1.1c1.1,0,2.2-0.3,3.3-0.9l4.9,4.9  c-0.5,1.1-0.3,2.5,0.6,3.4c0.6,0.6,1.3,0.9,2.1,0.9c0,0,0,0,0,0c0.8,0,1.5-0.3,2.1-0.9c0.4-0.4,0.6-0.8,0.8-1.4  c0.5-0.1,1-0.4,1.3-0.8c0.6-0.6,0.9-1.3,0.9-2.1C30,24.1,29.7,23.3,29.1,22.8z M11.9,19L5,13.4c-0.8-0.7-1-1.6-1-2.2  C3.9,9.8,4.6,8.4,5.7,7.3l1.6-1.6C8.3,4.6,9.7,4,11,4c0.1,0,0.2,0,0.3,0c0.7,0.1,1.6,0.3,2.2,1.2l5.3,7.3c0.8,1.1,0.8,2.8-0.1,4.4  c0,0,0,0,0,0c-0.2,0.4-0.6,0.8-0.9,1.2c-0.3,0.3-0.5,0.5-0.8,0.7C15.1,19.9,13.1,20,11.9,19z M27.7,25.6  C27.7,25.6,27.7,25.6,27.7,25.6c-0.3,0.3-0.6,0.3-0.8,0.3c-0.3,0-0.6,0.1-0.8,0.3s-0.3,0.5-0.3,0.8c0,0.2,0,0.5-0.3,0.8  c-0.2,0.2-0.4,0.3-0.7,0.3c0,0,0,0,0,0c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,0.4-1,0-1.4l-5.3-5.3  c0.1-0.1,0.1-0.1,0.2-0.2c0.2-0.2,0.4-0.4,0.5-0.6l5.3,5.3c0.4,0.4,1,0.4,1.4,0c0.4-0.4,1-0.4,1.4,0c0.2,0.2,0.3,0.4,0.3,0.7  C28,25.1,27.9,25.4,27.7,25.6z"/>
                        </svg>
                        <span className="text-2xl font-extrabold tracking-tight">Beef Grader</span>
                    </Link>
                    <ul className="hidden md:flex space-x-6">
                        {navItems.map((item) => (
                            <li key={item} className="p-2 transition duration-300 relative group m-0">
                                <Link href={`/${item.toLowerCase().replace(' ', '-')}`}
                                      className="text-white text-lg font-medium relative py-1">
                                    {item}
                                    <span
                                        className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                                    <span
                                        className="absolute right-0 top-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </li>
                        ))}
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
                                          className="block py-3 px-4 text-lg hover:bg-white/10 transition"
                                          onClick={() => setIsOpen(false)}>
                                        {item}
                                    </Link>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navigation;