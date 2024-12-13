'use client'

import React from 'react';
import CowPageClient from '../components/CowPageClient';
import withAuth from '../components/withAuth'

const CowPage: React.FC = () => {
    return <CowPageClient />;
};

export default withAuth(CowPage);