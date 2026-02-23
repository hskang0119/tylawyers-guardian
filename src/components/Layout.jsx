import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
    return (
        <div style={styles.layout}>
            <Header />
            <main style={styles.main}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

const styles = {
    layout: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--color-bg-light)',
    },
    main: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    }
};

export default Layout;
