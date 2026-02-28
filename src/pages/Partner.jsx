import React, { useState } from 'react';
import Hero from '../components/Hero';

const Partner = () => {
    const [formData, setFormData] = useState({
        company: '',
        name: '',
        department: '',
        email: '',
        phone: '',
        content: '',
        agree: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.agree) {
            alert('개인정보 수집 및 이용에 동의해주세요.');
            return;
        }
        // Validate other fields if necessary
        console.log('Form submitted:', formData);
        alert('도입 문의가 접수되었습니다. (현재는 UI 테스트 모드입니다)');
        // In a real app, send data to Supabase or backend here
    };

    return (
        <div style={styles.container}>
            <Hero title="도입 문의" />

            <div className="container" style={styles.contentWrapper}>

                {/* Introduction Text */}
                <div style={styles.introSection}>
                    <p style={styles.introText}>
                        법무법인 티와이로이어스가 직접 운영하며 철저한 독립성을 보장합니다.<br />
                        개인정보 유출 걱정 없이 안전하게 기업 내부 신고 시스템을 운영할 수 있습니다.
                    </p>
                </div>

                {/* Inquiry Form */}
                <div style={styles.sectionBlock}>
                    <h3 style={styles.sectionTitle}>도입문의</h3>
                    <form onSubmit={handleSubmit} style={styles.formContainer}>

                        <div style={styles.formRow}>
                            <label style={styles.formLabel}>기관 [기업] 명 <span style={styles.required}>*</span></label>
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                placeholder="기관 [기업]명 입력"
                                style={styles.formInput}
                                required
                            />
                        </div>

                        <div style={styles.formRow}>
                            <label style={styles.formLabel}>이 름 <span style={styles.required}>*</span></label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="이름 입력"
                                style={styles.formInput}
                                required
                            />
                        </div>

                        <div style={styles.formRow}>
                            <label style={styles.formLabel}>소속부서/직급 <span style={styles.required}>*</span></label>
                            <input
                                type="text"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                placeholder="소속부서/직급 입력"
                                style={styles.formInput}
                                required
                            />
                        </div>

                        <div style={styles.formRow}>
                            <label style={styles.formLabel}>이메일 주소 <span style={styles.required}>*</span></label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="이메일 입력"
                                style={styles.formInput}
                                required
                            />
                        </div>

                        <div style={styles.formRow}>
                            <label style={styles.formLabel}>연 락 처 <span style={styles.required}>*</span></label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="연락처 입력"
                                style={styles.formInput}
                                required
                            />
                        </div>

                        <div style={{ ...styles.formRow, alignItems: 'flex-start' }}>
                            <label style={{ ...styles.formLabel, paddingTop: '16px' }}>문의 내용 <span style={styles.required}>*</span></label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                placeholder="문의 내용"
                                style={styles.formTextarea}
                                required
                            />
                        </div>

                        {/* Privacy Policy */}
                        <div style={styles.privacySection}>
                            <h4 style={styles.privacyTitle}>개인정보 수집 및 이용 동의</h4>
                            <div style={styles.privacyBox}>
                                <p><strong>법무법인 티와이로이어스</strong>는 온라인 내부신고시스템 파트너십 서비스 제공을 위해 다음과 같이 개인정보를 수집하고 있습니다.</p>
                                <br />
                                <p><strong>1. 개인정보 수집 및 이용 동의</strong></p>
                                <ul style={styles.privacyList}>
                                    <li>수집하는 항목 : 기관[기업]명, 이름, 소속부서/직급, 이메일, 연락처</li>
                                    <li>수집 목적 : 도입 문의 상담 및 파트너십 관련 안내</li>
                                    <li>보유 및 이용기간 : <strong>상담 종료 시까지 (관련 법령에 따라 보존할 필요가 있는 경우 해당 기간까지)</strong></li>
                                </ul>
                            </div>
                            <div style={styles.checkboxWrapper}>
                                <input
                                    type="checkbox"
                                    id="agree"
                                    name="agree"
                                    checked={formData.agree}
                                    onChange={handleChange}
                                    style={styles.checkbox}
                                    required
                                />
                                <label htmlFor="agree" style={styles.checkboxLabel}>
                                    개인정보 수집 및 이용에 동의합니다.
                                </label>
                            </div>
                        </div>

                        <div style={styles.submitWrapper}>
                            <button type="submit" style={{
                                ...styles.submitButton,
                                opacity: formData.agree ? 1 : 0.5,
                                cursor: formData.agree ? 'pointer' : 'not-allowed'
                            }}>
                                도입 문의하기
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        paddingBottom: '100px',
        backgroundColor: '#f8fafc',
    },
    contentWrapper: {
        paddingTop: '60px',
    },
    introSection: {
        textAlign: 'center',
        marginBottom: '60px',
        maxWidth: '960px',
        margin: '0 auto 60px auto',
    },
    introText: {
        fontSize: '18px',
        lineHeight: 1.7,
        color: 'var(--color-text-muted)',
        fontWeight: 500,
    },
    sectionBlock: {
        backgroundColor: 'var(--color-white)',
        padding: '40px', // Tighter padding compared to 50px
        borderRadius: '12px',
        boxShadow: '0 4px 15px -3px rgba(15, 44, 89, 0.05)', // Match Report formSection
        border: '1px solid #e2e8f0',
        marginBottom: '40px',
        maxWidth: '960px',
        margin: '0 auto 40px auto',
    },
    sectionTitle: {
        fontSize: '24px',
        fontWeight: 700,
        color: 'var(--color-primary)', // Emphasize with brand navy
        marginBottom: '32px',
        textAlign: 'center',
        display: 'block',
    },
    formContainer: {
        borderTop: '2px solid #334155',
        paddingTop: '20px',
    },
    formRow: {
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid #e2e8f0',
        padding: '16px 0',
    },
    formLabel: {
        flex: '0 0 160px',
        fontSize: '17px',
        fontWeight: 600,
        color: 'var(--color-text-main)',
    },
    required: {
        color: '#ef4444',
        marginLeft: '4px',
    },
    formInput: {
        flex: 1,
        padding: '14px 16px',
        border: '1px solid #cbd5e1',
        borderRadius: '8px',
        fontSize: '17px',
        width: '100%',
        boxSizing: 'border-box',
        transition: 'all 0.2s',
        backgroundColor: '#f8fafc',
        color: '#1e293b',
    },
    formTextarea: {
        flex: 1,
        padding: '16px',
        border: '1px solid #cbd5e1',
        borderRadius: '8px',
        fontSize: '17px',
        minHeight: '160px',
        width: '100%',
        boxSizing: 'border-box',
        resize: 'vertical',
        transition: 'all 0.2s',
        backgroundColor: '#f8fafc',
        color: '#1e293b',
        fontFamily: 'inherit',
    },
    privacySection: {
        marginTop: '50px',
    },
    privacyTitle: {
        fontSize: '20px',
        fontWeight: 700,
        color: 'var(--color-text-main)',
        marginBottom: '16px',
    },
    privacyBox: {
        backgroundColor: '#ffffff',
        border: '1px solid #cbd5e1',
        padding: '24px 32px',
        minHeight: '180px',
        height: 'auto',
        overflowY: 'hidden',
        fontSize: '16px',
        lineHeight: 1.7,
        color: '#475569',
        borderRadius: '8px',
        marginBottom: '16px',
        boxShadow: '0 4px 15px -3px rgba(15, 44, 89, 0.05)',
    },
    privacyList: {
        paddingLeft: '20px',
        margin: '8px 0',
    },
    checkboxWrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '40px',
    },
    checkbox: {
        width: '20px',
        height: '20px',
        cursor: 'pointer',
    },
    checkboxLabel: {
        fontSize: '17px',
        fontWeight: 600,
        color: '#334155',
        cursor: 'pointer',
    },
    submitWrapper: {
        textAlign: 'center',
        borderTop: '1px solid #e2e8f0',
        paddingTop: '40px',
    },
    submitButton: {
        backgroundColor: 'var(--color-primary)',
        color: 'var(--color-white)',
        border: 'none',
        borderRadius: '8px',
        padding: '16px 48px',
        fontSize: '18px',
        fontWeight: 700,
        transition: 'all 0.2s',
        display: 'inline-block',
    }
};

const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @media (max-width: 768px) {
    div[style*="borderBottom: '1px solid #e2e8f0'"] {
      flex-direction: column;
      align-items: flex-start;
      padding: 20px 0;
    }
    label[style*="flex: '0 0 160px'"] {
      flex: none !important;
      margin-bottom: 12px;
    }
  }
`;
document.head.appendChild(styleSheet);

export default Partner;
