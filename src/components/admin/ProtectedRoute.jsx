import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import AdminLayout from './AdminLayout';

// Wraps the admin routes to ensure user is authenticated
const ProtectedRoute = () => {
    const [session, setSession] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check current session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setIsLoading(false);
        });

        // Listen for auth changes (login/logout)
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    if (isLoading) {
        return (
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f5f9' }}>
                <p style={{ fontSize: '18px', color: '#64748b' }}>인증 정보를 확인 중입니다...</p>
            </div>
        );
    }

    if (!session) {
        // If not logged in, redirect to the admin login page
        return <Navigate to="/ty-manage-desk/login" replace />;
    }

    // If logged in, render the AdminLayout and its nested routes (Outlet)
    return (
        <AdminLayout>
            <Outlet />
        </AdminLayout>
    );
};

export default ProtectedRoute;
