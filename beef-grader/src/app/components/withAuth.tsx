'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const AuthenticatedComponent: React.FC<P> = (props) => {
        const router = useRouter();

        useEffect(() => {
            const userId = Cookies.get('userId');

            if (!userId) {
                // If userId is not present, redirect to login page
                router.push('/login');
            }
        }, [router]); // Include router in dependency array

        return <WrappedComponent {...props} />;
    };

    return AuthenticatedComponent;
};

export default withAuth;