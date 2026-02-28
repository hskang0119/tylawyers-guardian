import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, MessageSquare, LogOut, Shield } from 'lucide-react';
import { supabase } from '../../supabaseClient';

const AdminLayout = ({ children }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await supabase.auth.signOut();
            navigate('/ty-manage-desk/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const navLinks = [
        { path: '/ty-manage-desk', label: '대시보드', icon: <LayoutDashboard size={20} /> },
        { path: '/ty-manage-desk/reports', label: '신고 내역', icon: <FileText size={20} /> },
        { path: '/ty-manage-desk/inquiries', label: '도입 문의', icon: <MessageSquare size={20} /> },
    ];

    return (
        <div style={styles.layout}>
            {/* Sidebar */}
            <aside style={styles.sidebar}>
                <div style={styles.logoArea}>
                    <Shield size={28} color="white" />
                    <span style={styles.logoText}>TY ADMIN</span>
                </div>

                <nav style={styles.nav}>
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            end={link.path === '/ty-manage-desk'}
                            style={({ isActive }) => ({
                                ...styles.navItem,
                                backgroundColor: isActive ? '#334155' : 'transparent',
                                color: isActive ? '#fff' : '#cbd5e1',
                                borderLeft: isActive ? '3px solid #3b82f6' : '3px solid transparent',
                            })}
                        >
                            {link.icon}
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                <div style={styles.logoutArea}>
                    <button onClick={handleLogout} style={styles.logoutBtn}>
                        <LogOut size={20} />
                        로그아웃
                    </button>
                    <a href="/" target="_blank" rel="noopener noreferrer" style={styles.siteLink}>
                        사용자 사이트 보기 ↗
                    </a>
                </div>
            </aside>

            {/* Main Content Area */}
            <main style={styles.mainContent}>
                {children}
            </main>
        </div>
    );
};

const styles = {
    layout: {
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
    },
    sidebar: {
        width: '260px',
        backgroundColor: '#0f172a',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
    },
    logoArea: {
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        gap: '12px',
        borderBottom: '1px solid #1e293b',
    },
    logoText: {
        fontSize: '20px',
        fontWeight: 700,
        letterSpacing: '1px',
    },
    nav: {
        flex: 1,
        padding: '24px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    navItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '12px 24px',
        gap: '12px',
        textDecoration: 'none',
        fontSize: '16px',
        fontWeight: 500,
        transition: 'all 0.2s',
    },
    logoutArea: {
        padding: '24px',
        borderTop: '1px solid #1e293b',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    logoutBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 16px',
        backgroundColor: 'transparent',
        border: '1px solid #334155',
        color: '#cbd5e1',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '15px',
        fontWeight: 500,
        transition: 'all 0.2s',
    },
    siteLink: {
        color: '#94a3b8',
        fontSize: '13px',
        textDecoration: 'none',
        textAlign: 'center',
        padding: '8px',
    },
    mainContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
    }
};

export default AdminLayout;
