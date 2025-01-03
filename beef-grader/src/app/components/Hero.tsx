import React from 'react';
import Image, { StaticImageData } from 'next/image';

interface HeroProps {
  title: string;
  imageSrc?: string | StaticImageData;
  imageAlt?: string;
}

const Hero: React.FC<HeroProps> = ({ title, imageSrc, imageAlt }) => (
    <div className="block-container pb-4">
        <div className="relative h-[10vh] md:h-[12vh] bg-brandGreen text-white overflow-hidden rounded-xl">
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
            <div className="absolute inset-0 bg-brandGreen/30 to-transparent"></div>
            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
                <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">{title}</h1>
            </div>
        </div>
    </div>
);

export default Hero;