'use client';

import React, { useState } from 'react';
import { Camera, CameraResultType } from '@capacitor/camera';

interface CameraComponentProps {
    setClassification: (classification: string | null) => void;
    setImagePath: (path: string | null) => void;
}

const CameraComponent: React.FC<CameraComponentProps> = ({ setClassification, setImagePath }) => {
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
            // First, upload the image
            const uploadResponse = await fetch('/api/upload-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: imageBase64 }),
            });

            if (!uploadResponse.ok) {
                throw new Error('Failed to upload image');
            }

            const uploadResult = await uploadResponse.json();
            setImagePath(uploadResult.imagePath);

            // Then, send for classification
            const classificationResponse = await fetch('http://localhost:8080/api/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: imageBase64 }),
            });

            if (!classificationResponse.ok) {
                throw new Error('Failed to classify image');
            }

            const classificationResult = await classificationResponse.json();
            setClassification(classificationResult.predicted_class || null);
        } catch (error) {
            console.error('Error processing image:', error);
            setClassification(null);
            setImagePath(null);
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