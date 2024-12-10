'use client';

import React, { useState } from 'react';
import { Camera, CameraResultType } from '@capacitor/camera';

interface CameraComponentProps {
    setClassification: (classification: string | null) => void;
}

const CameraComponent: React.FC<CameraComponentProps> = ({ setClassification }) => {
    const [image, setImage] = useState<string | null>(null);

    const takePhoto = async () => {
        try {
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: false,
                resultType: CameraResultType.Base64,
            });

            setImage(image.base64String || null);

            if (image.base64String) {
                await sendImageToBackend(image.base64String);
            }
        } catch (error) {
            console.error('Error taking photo:', error);
        }
    };

    const sendImageToBackend = async (imageBase64: string) => {
        try {
            const response = await fetch('http://localhost:8080/api/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image: imageBase64 }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            setClassification(result.predicted_class || null);
        } catch (error) {
            console.error('Error sending image to backend:', error);
            setClassification(null);
        }
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
                    <img src={`data:image/jpeg;base64,${image}`} alt="Captured" className="rounded-lg shadow-lg" />
                </div>
            )}
        </div>
    );
};

export default CameraComponent;