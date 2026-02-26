import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: '이용안내', path: '/info' },
        { name: '신고하기', path: '/report' },
        { name: '진행상황조회', path: '/status' },
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
                                        fontWeight: isActive(link.path) ? 700 : 500, // Bold active, medium inactive
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
                                        fontWeight: isActive(link.path) ? 700 : 500, // Bold active, medium inactive
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
        backgroundColor: 'var(--color-bg, #FFFFFF)',
        borderBottom: '1px solid var(--color-border, #E2E8F0)',
        padding: '1.2rem 0', // Added padding from renewal header
        position: 'sticky',
        top: 0,
        zIndex: 100, // Matched z-index
        width: '100%',
        boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)', // Matched shadow-sm
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        // Removed fixed height to let padding handle it like in renewal
        margin: '0 auto',
        maxWidth: '1200px', // Matching --container-max-width
        padding: '0 1rem', // Added default horizontal padding for container
    },
    navWrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: '40px',
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
        fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif",
        fontSize: '1.5rem', // Matched logo font size
        fontWeight: 700, // Matched logo font weight
        color: '#1E3A8A', // Matched color-primary
        display: 'flex',
        alignItems: 'center',
        letterSpacing: '-0.5px', // Matched logo letter-spacing
    },
    logoDivider: {
        margin: '0 12px',
        color: '#E2E8F0', // Matched color-border
        fontWeight: 300,
    },
    logoSubtitle: {
        fontSize: '16px',
        fontWeight: 500,
        color: '#111827', // Matched color-text-main
    },
    desktopNav: {
        display: 'none',
    },
    navList: {
        display: 'flex',
        gap: '2rem', // Matched spacing-md
        listStyle: 'none',
        margin: 0,
        padding: 0,
    },
    navLink: {
        fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif",
        fontSize: '1.1rem', // Increased font size to be more prominent
        transition: 'color 0.2s',
        textDecoration: 'none',
    },
    mobileToggle: {
        display: 'block',
        padding: '8px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
    },
    mobileNav: {
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #E2E8F0',
        padding: '8px 0',
    },
    mobileNavList: {
        display: 'flex',
        flexDirection: 'column',
        margin: 0,
        padding: '1rem 0',
    },
    mobileNavItem: {
        borderBottom: '1px solid #f3f4f6', // Matching mobile link border
    },
    mobileNavLink: {
        display: 'block',
        padding: '1.25rem 1.5rem', // Matching mobile link padding
        fontSize: '1.1rem', // Matching mobile link font size
        textDecoration: 'none',
        fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif",
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
