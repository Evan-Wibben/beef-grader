import React from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { CowProvider } from './context/CowContext';
import { PastureProvider } from './context/PastureContext';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

import './globals.css';

if (typeof window !== 'undefined') {
    defineCustomElements(window);
}

export default function RootLayout({children,}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
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