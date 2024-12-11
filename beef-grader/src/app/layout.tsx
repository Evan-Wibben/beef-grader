'use client'; // This directive marks the component as a client component

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
        // Define custom elements when the component mounts
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