'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Squash as Hamburger } from 'hamburger-react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import BeefLogo from '/public/images/BeefLogo.png';
import Image from 'next/image';
import Buttons  from './Button';

const { SignOutButton } = Buttons;

const Navigation: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navItems: Array<'Groups' | 'Records' | 'Create Entry'> = ['Groups', 'Records', 'Create Entry'];
    const routeMapping = {
        Groups: 'pastures',
        Records: 'records',
        'Create Entry': 'create-entry'
    } as const;
    const router = useRouter();

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
        Cookies.remove('userId');
        router.push('/login');
    };

    return (
        <nav className="bg-brandTeel text-white shadow-lg pt-10">
            <div className="block-container py-4 px-8">
                <div className="flex justify-between items-center">
                    <Link href="/" className="flex items-center space-x-3">
                        <span className="text-2xl font-extrabold tracking-tight">
                        <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 61.859 61.707">
                            <defs>
                                <clipPath id="clip-path">
                                <rect id="Rectangle_28" data-name="Rectangle 28" width="61.859" height="61.707" fill="none"/>
                                </clipPath>
                            </defs>
                            <g id="Group_10" data-name="Group 10" transform="translate(0 0.001)">
                                <path id="Path_15" data-name="Path 15" d="M2109.353,0V1.3h9.2V8.769h1.3V0Z" transform="translate(-2058.144)" fill="#fff"/>
                                <path id="Path_16" data-name="Path 16" d="M0,0v8.77H1.3V1.3h9.2V0Z" fill="#fff"/>
                                <path id="Path_17" data-name="Path 17" d="M0,2165.5v9.135H10.5v-1.3H1.3V2165.5Z" transform="translate(0 -2112.929)" fill="#fff"/>
                                <path id="Path_18" data-name="Path 18" d="M2118.549,2165.5v7.833h-9.2v1.3h10.5V2165.5Z" transform="translate(-2058.144 -2112.929)" fill="#fff"/>
                                <g id="Group_9" data-name="Group 9" transform="translate(0 -0.001)">
                                <g id="Group_8" data-name="Group 8" transform="translate(0 0)" clip-path="url(#clip-path)">
                                    <path id="Path_19" data-name="Path 19" d="M36.922,341.3c.078-.119.3-.173.465-.224a4.787,4.787,0,0,1,.526-.114,32.872,32.872,0,0,1,3.709-.209c.7,0,4.384.022,4.677.542a13.452,13.452,0,0,1-3.4.633c-.429.031-.86.021-1.281.048-.8.051-4.4-.27-4.7-.677M28.29,322.2a.86.86,0,0,0,.97.661c.906,0,.956.254,1.275.3-.138-.406-1.16-.894-1.467-1.136.237-.257.805-.2,1.122-.1.969.308,1.568,1.277,2.117,2.041a21.635,21.635,0,0,1,1.85,3.672,6.525,6.525,0,0,1-1.921-1.521c-.281-.285-.5-.1-.9-.1a1.8,1.8,0,0,1-1.48-.737c-.578-.807-.283-1.038-.346-1.7-.348.07-.524,1.191-.589,1.513a4.952,4.952,0,0,0,.427,3.5,7.266,7.266,0,0,1,.755,1.269c-.191.053-.35-.073-.482-.05a23.054,23.054,0,0,0,.27,2.549c.112.824.286,1.6.461,2.41.125.58,1.069,4.1,1.445,4.268.166-.465.52-3.221,1.161-3.134.29.639.1,2.27.337,2.8.27,0,.426-.473.528-.7a8.057,8.057,0,0,0,.309-.863c.081-.258.469-1.716.532-1.808.312-.014.3.342.338.6a6.118,6.118,0,0,1-.119,2.565,10.555,10.555,0,0,1-1.223,2.517,23.267,23.267,0,0,0-1.86,5.663c-.21.851-.645,2.375-.242,3.172.515,1.021,1.8.921,2.759.744,1.241-.23,1.081-.142,1.193-.7.332-1.66,1.842-2.09,2.438-3.149a3.349,3.349,0,0,1-.642.412,2.035,2.035,0,0,1-.866.2c-1.369,0-2.01-.876-2.138-2.175a4.3,4.3,0,0,1,.211-1.834c.144-.376.583-1.185,1.093-.908.105.208,0,.736.195.938.212-.136.113-.4.692-.274a6.4,6.4,0,0,1,1.9,1.086,6.318,6.318,0,0,0,3.225.773c2.777-.007,3.015-.814,4.4-1.6,1.147-.648,1.134-.036,1.334.042.208-.278.093-.783.2-1,.323-.17.686.188.842.438.842,1.343.69,4.139-1.242,4.488a2.264,2.264,0,0,1-1.967-.6c.427.875,1.929,1.309,2.43,2.977a5.4,5.4,0,0,0,.136.621,8.8,8.8,0,0,0,2.14.374c2.214,0,1.959-1.655,1.646-3.254-.177-.906-.815-3.334-1.1-4.226a9.591,9.591,0,0,0-.784-1.9,8.284,8.284,0,0,1-1.54-3.787c-.034-.4-.017-2.024.337-2.223.249.082.277.624.34.866.085.32.165.641.254.951a4.29,4.29,0,0,0,.74,1.631c.144-.2.16-2.241.412-2.863.648-.023.9,2.655,1.1,3.179.407-.188,1.325-3.682,1.466-4.287a31.746,31.746,0,0,0,.7-4.948c-.183-.063-.227.054-.42-.072.046-.165.659-1,.806-1.261A5.369,5.369,0,0,0,54,324.239c-.063-.219-.113-.656-.391-.622.207,1.777-.794,2.606-2.5,2.323a9.38,9.38,0,0,1-2.146,1.706,17.3,17.3,0,0,1,.9-1.884,12.682,12.682,0,0,1,2.3-3.3c.4-.391,1.486-.934,1.927-.408a4.14,4.14,0,0,0-1.56,1.091,2.945,2.945,0,0,1,1.308-.288c1.685.006,1.181-2.26.544-3.159-.448-.635-.934-1.226-1.413-1.839a2.057,2.057,0,0,1-.447-1.171.987.987,0,0,1,.635-.987c.076-.86-1.193-2.689-.959-3.481.479-.175.78.632,1.029.827a3.339,3.339,0,0,0,.332-1.383,2.932,2.932,0,0,0-1.891-3.16c-.9-.372-4.786-1.123-5.187-1.565.249-.362,1.22-.193,1.484-.346a5.317,5.317,0,0,0-1.316-.9,5.053,5.053,0,0,0-3.283-.389l-.182-.173c-1.363-1.259-2.457-1.365-4.329-1.111-.078.01,1.311.935,1.419,1.173-4.025-.1-4.6.908-6.887,1.561.95.145,1.641.6,2.475.641-1.2.29-3.912.875-4.371,1.082A2.948,2.948,0,0,0,29.76,310.2a4.017,4.017,0,0,0-.176,1.521,3.868,3.868,0,0,0,.356,1.362c.26-.318.5-.785.909-.925.264.19.1.591.011.884s-.209.568-.323.849a5.379,5.379,0,0,0-.541,1.77c.227.16.281.071.475.356.8,1.179-1.078,2.752-1.674,3.618a3.084,3.084,0,0,0-.508,2.568m37.42-6.454a5.918,5.918,0,0,0-2.27.238c-.39.131-1.527.577-1.695.913a4.955,4.955,0,0,1,2.735.032c.16.058.588.26.582.408a11.1,11.1,0,0,0-2.025.324,8.213,8.213,0,0,0-1.58.794,4.764,4.764,0,0,1,2.641.067,7.357,7.357,0,0,1-.745.25,4.554,4.554,0,0,0-1.647,1.4c.144.15.413.146.54.294-.087.108-.175.12-.264.22a9.667,9.667,0,0,1-1.888,1.815,3.635,3.635,0,0,1-3.371.3,3.873,3.873,0,0,0,2.584,1.528,8.1,8.1,0,0,0,3.658-.129,13.245,13.245,0,0,0,5.27-2.93,16.4,16.4,0,0,0,3.778-4.425,1.951,1.951,0,0,0-.516-2.817,8.582,8.582,0,0,0-2.807-1.313,13.271,13.271,0,0,0-7.125-.156,10.973,10.973,0,0,0-4.933,3.27c-1.1,1.321.17,2.178,1.129,2.037,1.912-.281,1.933-3.177,4.95-3.261a4.628,4.628,0,0,1,1.742.3,2.7,2.7,0,0,1,1.255.833m-39.344,7.094a3.306,3.306,0,0,1-1.78.224,4.373,4.373,0,0,1-2.656-1.535l-.736-.851a3.032,3.032,0,0,1-.275-.248l.517-.211c-.047-.259-.764-.9-.988-1.063a6.629,6.629,0,0,0-1.391-.645,3.107,3.107,0,0,1,1.283-.189,6.935,6.935,0,0,1,1.315.139,7.468,7.468,0,0,0-1.548-.776,6.123,6.123,0,0,0-2.025-.345c.092-.372,1.038-.565,1.4-.6a7.65,7.65,0,0,1,1.857.136,6.03,6.03,0,0,0-1.654-.887,5.389,5.389,0,0,0-1.613-.27c-.2,0-.416.039-.6.025a3.036,3.036,0,0,1,1.18-.821,5.172,5.172,0,0,1,1.731-.319c2.968.014,3.091,2.923,4.922,3.254,1.262.228,2.144-.854,1.215-1.973-3-3.607-7.639-4.524-12.024-3.15a9.737,9.737,0,0,0-2.8,1.288c-1.078.759-1.1,1.67-.549,2.792a17.267,17.267,0,0,0,3.767,4.4,13.642,13.642,0,0,0,5.227,2.936c2.027.563,4.858.577,6.224-1.309m9.222,29.4a3.787,3.787,0,0,0,2.469,1.468c1.845.336,2.728-.216,3.528-.228.394-.006,1.2.257,1.7.3a5.641,5.641,0,0,0,3.266-.6c.217-.123.973-.714.982-.937-.2-.061-1.2-.131-1.5-.167a23.744,23.744,0,0,0-7.548-.191Z" transform="translate(-10.53 -296.538)" fill="#fff" fill-rule="evenodd"/>
                                </g>
                                </g>
                            </g>
                        </svg>


                        </span>
                    </Link>
                    <ul className="hidden md:flex space-x-6">
                        {navItems.map((item) => (
                            <li key={item} className="p-2 transition duration-300 relative group m-0">
                                <Link href={`/${routeMapping[item]}`}
                                      className="text-white text-lg font-medium relative py-1">
                                    {item}
                                    <span
                                        className="absolute left-0 bottom-0 w-0 h-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                                    <span
                                        className="absolute right-0 top-0 w-0 h- bg-white transition-all duration=300 group-hover:w-full"></span>
                                </Link>
                            </li>
                        ))}
                        <li className="p-2 transition duration=300 relative group m= 00">
                            <SignOutButton href="/login" onClick={handleSignOut}>
                                Sign Out
                            </SignOutButton>
                        </li>
                    </ul>
                    <div className="md:hidden">
                        <Hamburger toggled={isOpen} toggle={setIsOpen}/>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div initial="closed" animate="open" exit="closed" variants={menuVariants}
                                className="md:hidden overflow-hidden block-container px-8 py-2">
                        <motion.ul className="flex flex-col">
                            {navItems.map((item) => (
                                <motion.li key={item} variants={itemVariants} className="border-t border-brandLimeGreen">
                                    <Link href={`/${routeMapping[item]}`}
                                          className="block text-xl hover:bg-white/10 hover:text-brandLimeGreen transition py-1 text-center"
                                          onClick={() => setIsOpen(false)}>
                                        {item}
                                    </Link>
                                </motion.li>
                            ))}
                            <motion.li variants={itemVariants} className="border-t border-brandLimeGreen py-4 flex">
                                <SignOutButton href="/login" onClick={handleSignOut}>
                                    Sign Out
                                </SignOutButton>
                            </motion.li>
                        </motion.ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navigation;