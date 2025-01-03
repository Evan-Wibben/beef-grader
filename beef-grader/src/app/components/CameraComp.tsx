'use client';

import React, { useState, useCallback } from 'react';
import { Camera, CameraResultType } from '@capacitor/camera';
import ReactCrop, { Crop, PercentCrop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface CameraComponentProps {
    setClassification: (classification: string | null) => void;
    setImagePath: (path: string | null) => void;
}

const CameraComponent: React.FC<CameraComponentProps> = ({ setClassification, setImagePath }) => {
    const [image, setImage] = useState<string | null>(null);
    const [crop, setCrop] = useState<Crop>({
        unit: '%',
        width: 50,
        height: 50,
        x: 25,
        y: 25
    });

    const takePhoto = async () => {
        try {
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: false,
                resultType: CameraResultType.Base64,
            });

            setImage(image.base64String || null);
        } catch (error) {
            console.error('Error taking photo:', error);
        }
    };

    const onCropChange = (crop: PixelCrop, percentCrop: PercentCrop) => {
        setCrop(percentCrop);
    };

    const getCroppedImage = useCallback(async () => {
        if (!image) return;

        const canvas = document.createElement('canvas');
        const scaleX = 1;
        const scaleY = 1;
        const img = new Image();
        img.src = `data:image/jpeg;base64,${image}`;

        await new Promise((resolve) => {
            img.onload = resolve;
        });

        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        if (ctx) {
            ctx.drawImage(
                img,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height
            );
        }

        const croppedImageBase64 = canvas.toDataURL('image/jpeg').split(',')[1];
        await sendImageToBackend(croppedImageBase64);
    }, [crop, image]);

    const sendImageToBackend = async (imageBase64: string) => {
        try {
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
        <div className="flex flex-col items-center py-6 container mx-auto max-w-[1000px]">
            {!image ? (
                <div className='border-dashed border-[8px] border-brandGreen rounded-lg px-[100px] md:px-32 lg:px-64 py-20 md:py-24 lg:py-32'>
                    <button onClick={takePhoto} className="bg-brandGreen text-white px-4 py-2 rounded-lg shadow-md hover:bg-brandBrown transition duration-300">
                        Open Camera or Upload Image
                    </button>
                </div>
            ) : (
                <div className="w-full flex flex-col items-center">
                    <div className="relative w-full max-w-2xl mb-4">
                    <ReactCrop
                        crop={crop}
                        onChange={onCropChange}
                        keepSelection={true}
                    >
                            <img 
                                src={`data:image/jpeg;base64,${image}`} 
                                alt="Uploaded" 
                                className="max-w-full max-h-[70vh] object-contain"
                            />
                        </ReactCrop>
                    </div>
                    <button 
                        onClick={getCroppedImage} 
                        className="bg-brandGreen text-white px-4 py-2 rounded-lg shadow-md hover:bg-brandBrown transition duration-300"
                    >
                        Crop and Save
                    </button>
                </div>
            )}
        </div>
    );
};

export default CameraComponent;