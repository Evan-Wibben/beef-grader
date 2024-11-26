import React from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { CowProvider } from './context/CowContext';

import './globals.css';

export default function RootLayout({children,}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body>
        <CowProvider>
            <Navigation />
            <main>{children}</main>
            <Footer />
        </CowProvider>
        </body>
        </html>
    );
}