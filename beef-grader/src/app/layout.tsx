import React from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <Navigation/>
        <main>{children}</main>
        <Footer/>
        </body>
        </html>
    );
}