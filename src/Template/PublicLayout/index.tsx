import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { Sidebar, Header } from '..';
import { useMemo } from 'react';

export default function PublicLayout() {
    const token = localStorage.getItem('token');

    const location = useLocation();

    const isAuth = useMemo(() => {
        if (location.pathname) {
            return !!token;
        }
    }, [location.pathname, token]);

    if (isAuth) {
        return (
            <div className='bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row'>
                <Sidebar />
                <div className='flex flex-col flex-1'>
                    <Header />
                    <div className='flex-1 p-4 min-h-0 overflow-auto'>
                        <Outlet />
                    </div>
                </div>
            </div>
        );
    }

    return <Navigate to='/login' />;
}
