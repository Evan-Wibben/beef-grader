import React from 'react';
import Image, { StaticImageData } from 'next/image';

interface HeroProps {
  title: string;
  imageSrc?: string | StaticImageData;
  imageAlt?: string;
}

const Hero: React.FC<HeroProps> = ({ title, imageSrc, imageAlt }) => (
    <div className="pb-8">
        <div className="relative h-[18rem] md:h-[35rem] bg-brandGreen text-white overflow-hidden shadow-xl">
            {imageSrc && (
                <Image
                    src={imageSrc}
                    alt={imageAlt || ''}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="mix-blend-normal"
                    priority
                />
            )}
            <div className="absolute inset-0 to-transparent"></div>
        </div>
        <div className="block-container">
            <div className="relative bg-brandTeel text-white z-10 -mt-6 md:-mt-10 flex flex-col justify-center items-center text-center px-4 py-4 rounded-2xl">
                <h1 className="text-4xl md:text-6xl">{title}</h1>
            </div>
        </div>
        
    </div>
);

export default Hero;