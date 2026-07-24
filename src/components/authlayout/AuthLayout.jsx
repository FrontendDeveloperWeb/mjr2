import { Suspense } from 'react';


import PageLoader from '../shared/PageLoader/PageLoader.jsx';
import { getRouteMeta } from '../../router/index.jsx';
import AuthHeader from './AuthHeader.jsx';
import AuthFooter from './AuthFooter.jsx';

export default function AdminLayout({ children }) {


    return (
        <>
            <AuthHeader />
            <main id="content">
                <Suspense fallback={<PageLoader />}>

                    {children}
                </Suspense>
            </main>
            <AuthFooter />
        </>
    );
}
