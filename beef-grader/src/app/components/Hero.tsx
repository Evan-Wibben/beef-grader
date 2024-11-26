import React from 'react';
import Image from 'next/image';
import CowsGrazing from '/public/images/CowsGrazing.webp';

const Hero: React.FC = () => (
    <div className="block-container py-6">
        <div className="relative h-[10vh] md:h-[20vh] bg-brandGreen text-white overflow-hidden rounded-3xl">
            <Image
                src={CowsGrazing}
                alt="Cattle grazing in a field"
                fill
                style={{ objectFit: 'cover' }}
                className="mix-blend-normal"
            />
            <div className="absolute inset-0 bg-brandGreen/30 to-transparent"></div>
            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">Grading Beef</h1>
            </div>
        </div>
    </div>
);

export default Hero;