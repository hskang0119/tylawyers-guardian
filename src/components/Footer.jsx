import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div className="container" style={styles.container}>
                <div style={styles.logoWrapper}>
                    <img
                        src="/tylogo.jpg"
                        alt="TY Lawyers Logo"
                        style={styles.logoImage}
                    />
                </div>

                <div style={styles.contactInfo}>
                    <div style={styles.infoLine}>
                        <span>회사명 : 법무법인 티와이로이어스</span>
                        <span style={styles.divider}>|</span>
                        <span>06611 서울 서초구 강남대로 291, 11층(서초동, 남강빌딩)</span>
                        <span style={styles.divider}>|</span>
                        <span>대표전화 : 02-3481-0330</span>
                    </div>
                    <div style={styles.infoLine}>
                        <span>FAX : 02-3481-2103</span>
                        <span style={styles.divider}>|</span>
                        <span>E-mail : tylawyers@tylaw.co.kr</span>
                        <span style={styles.divider}>|</span>
                        <span>개인정보보호책임자 : 강현성 변호사</span>
                        <span style={styles.divider}>|</span>
                        <span>사업자등록번호 : 177-87-02823</span>
                    </div>
                </div>

                <div style={styles.copyrightWrapper}>
                    <p style={styles.copyright}>
                        ⓒ 2026 TYLAWYERS. ALL RIGHTS RESERVED.
                    </p>
                </div>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: '#e2e8f0',
        borderTop: '1px solid var(--color-border)',
        padding: '60px 0 60px',
        marginTop: 'auto',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '16px',
    },
    logoWrapper: {
        display: 'flex',
        alignItems: 'flex-start',
        marginBottom: '8px',
    },
    logoImage: {
        height: '42px',
        objectFit: 'contain',
        mixBlendMode: 'multiply',
    },
    contactInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    infoLine: {
        fontSize: '15px',
        color: 'var(--color-text-muted, #555)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '12px',
        margin: 0,
    },
    divider: {
        color: 'var(--color-text-light, #999)',
        fontSize: '13px',
        opacity: 0.6,
        userSelect: 'none',
    },
    copyrightWrapper: {
        marginTop: '16px',
    },
    copyright: {
        fontSize: '14px',
        color: 'var(--color-text-light, #999)',
        margin: 0,
    },
};

export default Footer;
