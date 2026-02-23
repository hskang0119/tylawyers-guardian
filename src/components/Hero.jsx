import React from 'react';

const Hero = ({ title, bgImage }) => {
    return (
        <section style={{
            ...styles.heroSection,
            backgroundImage: `url(${bgImage || '/hero-bg.png'})`
        }}>
            <div style={styles.overlay}></div>
            <div className="container" style={styles.container}>
                <div style={styles.content}>
                    <p style={styles.subtitle}>TY Lawyers 인권상담신고센터</p>
                    <h1 style={styles.title}>{title}</h1>
                    <div style={styles.minimalLine}></div>
                </div>
            </div>
        </section>
    );
};

const styles = {
    heroSection: {
        position: 'relative',
        height: '320px',
        backgroundColor: '#1E293B',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0',
        color: 'var(--color-white)',
        overflow: 'hidden',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.4) 0%, rgba(15, 23, 42, 0.7) 100%)',
        zIndex: 1,
    },
    container: {
        position: 'relative',
        zIndex: 2,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 20px',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: '14px',
        color: 'rgba(255, 255, 255, 0.9)',
        marginBottom: '12px',
        fontWeight: 400,
        letterSpacing: '1px',
    },
    title: {
        fontSize: '44px',
        fontWeight: 600,
        margin: '0 0 24px 0',
        color: '#ffffff',
        letterSpacing: '-0.5px',
        textShadow: '0 2px 4px rgba(0,0,0,0.2)',
    },
    minimalLine: {
        width: '40px',
        height: '2px',
        backgroundColor: '#ffffff',
        opacity: 0.8,
    }
};

const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @media (max-width: 600px) {
    h1[style*="fontSize: 44px"] {
        font-size: 32px !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default Hero;
