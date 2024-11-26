'use client'

import React, { useState } from 'react';
import { Camera, CameraResultType } from '@capacitor/camera';

const CameraComponent: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);

    const takePhoto = async () => {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Uri,
        });

        // Set the image URI to state
        setImage(image.webPath || null);
    };

    return (
        <div className="flex flex-col items-center p-6">
            <h2 className="text-2xl font-bold mb-4">Take a Photo</h2>
            <button
                onClick={takePhoto}
                className="bg-brandGreen text-white px-4 py-2 rounded-lg shadow-md hover:bg-brandBrown transition duration-300"
            >
                Open Camera
            </button>
            {image && (
                <div className="mt-4">
                    <img src={image} alt="Captured" className="rounded-lg shadow-lg" />
                </div>
            )}
        </div>
    );
};

export default CameraComponent;