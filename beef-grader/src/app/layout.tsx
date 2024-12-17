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
                <link rel="preload" href="/_next/static/media/CowsGrazing.53ccf40b.webp" as="image"></link>
                <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Quicksand:wght@300..700&display=swap" rel="stylesheet" />
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