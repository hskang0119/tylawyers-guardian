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

                <p style={styles.description}>
                    기업의 투명성과 청렴한 문화를 위해 외부 독립 전문기관인 법무법인 티와이로이어스가 운영하는 내부 신고 시스템입니다.
                </p>

                <div style={styles.contactInfo}>
                    <div style={styles.infoLine}>서울 서초구 강남대로 291, 11층(서초동, 남강빌딩)</div>
                    <div style={styles.infoLine}>
                        <span>TEL 02-3481-0330</span>
                        <span>FAX 02-3481-2103</span>
                        <span>E-mail tylawyers@tylaw.co.kr</span>
                    </div>
                    <div style={styles.infoLine}>광고책임변호사 : 정회일</div>
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
        backgroundColor: 'var(--color-bg-light, #fafafa)',
        borderTop: '1px solid var(--color-border)',
        padding: '60px 0 60px',
        marginTop: 'auto',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '24px',
    },
    logoWrapper: {
        display: 'flex',
        alignItems: 'flex-start',
    },
    logoImage: {
        height: '42px',
        objectFit: 'contain',
    },
    description: {
        fontSize: '16px',
        color: 'var(--color-text-main, #333)',
        lineHeight: 1.6,
        margin: '0 0 8px 0',
        wordBreak: 'keep-all',
        maxWidth: '700px',
    },
    contactInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    infoLine: {
        fontSize: '15px',
        color: 'var(--color-text-muted, #555)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '24px',
        margin: 0,
    },
    copyrightWrapper: {
        marginTop: '24px',
    },
    copyright: {
        fontSize: '14px',
        color: 'var(--color-text-light, #999)',
        margin: 0,
    },
};

export default Footer;
