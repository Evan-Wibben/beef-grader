'use client';

import React, { useEffect } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { CowProvider } from './context/CowContext';
import { PastureProvider } from './context/PastureContext';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import Script from 'next/script';

import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        defineCustomElements(window);
    }, []); 

    return (
        <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="apple-touch-icon" href="/icon.png" />
                <link rel="manifest" href="/manifest.json" />

                {/* Font */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />

                {/* Favicon */}


                <Script type="module" src="https://cdn.jsdelivr.net/npm/@ionic/pwa-elements/dist/index.js"></Script>
                <title>BCS Grader</title>
            </head>
            <body>
                <CowProvider>
                    <PastureProvider>
                        <Navigation />
                        <main>{children}</main>
                        <Footer />
                    </PastureProvider>
                </CowProvider>
            </body>
        </html>
    );
}