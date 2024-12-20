'use client'

import React from 'react';
import Hero from './components/Hero';
import Card from './components/Card';
import withAuth from './components/withAuth';
import CowsGrazing from '/public/images/CowsGrazing.webp';


const Home: React.FC = () => {
    return (
        <div className="bg-brandLightGreen pt-4 px-4">
            <Hero 
                title="Grading Beef" 
                imageSrc={CowsGrazing} 
                imageAlt="Cattle grazing in a field"
            />
            <div className="bg-brandLightGreen pb-6">
                <div className="block-container">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card
                            title="Pastures"
                            description="Manage and analyze your pastures for optimal cattle grazing."
                            link="/pastures"
                        />
                        <Card
                            title="Records"
                            description="Keep detailed records of your cattle and their performance."
                            link="/records"
                        />
                        <Card
                            title="Create Entry"
                            description="Grade and submit individual cows for analysis."
                            link="/create-entry"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withAuth(Home);