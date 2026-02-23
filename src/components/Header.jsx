import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: '신고안내', path: '/info' },
        { name: '신고하기', path: '/report' },
        { name: '신고확인', path: '/status' },
        { name: '도입문의', path: '/partner' },
        { name: '오시는길', path: '/contact' }
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <header style={styles.header}>
            <div className="container" style={styles.container}>
                {/* Logo Area */}
                <Link to="/" style={styles.logoLink} onClick={() => setIsMenuOpen(false)}>
                    <img
                        src="/tylogo.jpg"
                        alt="TY Lawyers Logo"
                        style={{ height: '40px', objectFit: 'contain' }}
                    />
                    <div style={styles.logoText}>
                        <span style={styles.logoDivider}>|</span>
                        <span style={styles.logoSubtitle}>인권상담신고센터</span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav style={styles.desktopNav}>
                    <ul style={styles.navList}>
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    style={{
                                        ...styles.navLink,
                                        color: isActive(link.path) ? '#1e3a8a' : '#222222', // Darker navy active, dark grey inactive
                                        fontWeight: isActive(link.path) ? 600 : 500, // Semi-bold active, medium inactive
                                    }}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    style={styles.mobileToggle}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={24} color="var(--color-text-main)" /> : <Menu size={24} color="var(--color-text-main)" />}
                </button>
            </div>

            {/* Mobile Navigation Dropdown */}
            {isMenuOpen && (
                <div style={styles.mobileNav}>
                    <ul style={styles.mobileNavList}>
                        {navLinks.map((link) => (
                            <li key={link.path} style={styles.mobileNavItem}>
                                <Link
                                    to={link.path}
                                    style={{
                                        ...styles.mobileNavLink,
                                        color: isActive(link.path) ? 'var(--color-primary)' : 'var(--color-text-main)',
                                        fontWeight: isActive(link.path) ? 600 : 400,
                                    }}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
};

const styles = {
    header: {
        backgroundColor: 'var(--color-white)',
        borderBottom: '1px solid var(--color-border)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%',
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '72px',
    },
    navWrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: '40px', // Increased gap between items based on screenshot
    },
    navItem: {
        position: 'relative',
    },
    logoLink: {
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
    },
    logoText: {
        fontSize: '20px',
        display: 'flex',
        alignItems: 'center',
        letterSpacing: '-0.02em',
    },
    logoDivider: {
        margin: '0 12px',
        color: 'var(--color-border)',
        fontWeight: 300,
    },
    logoSubtitle: {
        fontSize: '16px',
        fontWeight: 500,
        color: 'var(--color-text-main)',
    },
    desktopNav: {
        display: 'none',
    },
    navList: {
        display: 'flex',
        gap: '28px', // Reduced gap based on user request
        listStyle: 'none',
        margin: 0,
        padding: 0,
    },
    navLink: {
        fontSize: '15px', // Decreased font size further
        transition: 'color 0.2s',
        textDecoration: 'none',
        letterSpacing: '-0.02em', // Tighter letter spacing
    },
    mobileToggle: {
        display: 'block',
        padding: '8px',
    },
    mobileNav: {
        backgroundColor: 'var(--color-white)',
        borderTop: '1px solid var(--color-border)',
        padding: '8px 0',
    },
    mobileNavList: {
        display: 'flex',
        flexDirection: 'column',
    },
    mobileNavItem: {
        borderBottom: '1px solid var(--color-bg-light)',
    },
    mobileNavLink: {
        display: 'block',
        padding: '16px 24px',
        fontSize: '16px',
        textDecoration: 'none',
    },
};

// Simple media query hack using CSS in JS is complex, 
// so we'll add a small style tag here for the desktop media query
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @media (min-width: 768px) {
    header nav[style*="display: none"] {
      display: block !important;
    }
    header button[aria-label="Toggle menu"] {
      display: none !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default Header;
