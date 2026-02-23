import React, { useState } from 'react';
import { Search, Lock, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import Hero from '../components/Hero';

const Status = () => {
    const [formData, setFormData] = useState({
        receiptNumber: '',
        password: ''
    });
    const [isSearched, setIsSearched] = useState(false);
    const [statusData, setStatusData] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (!formData.receiptNumber || !formData.password) {
            alert('접수번호와 비밀번호를 모두 입력해주세요.');
            return;
        }

        // Simulate API call and response
        setIsSearched(true);

        // Mocking a successful response for demonstration (Initial State)
        const today = new Date();
        const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')} ${String(today.getHours()).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')}`;

        setStatusData({
            receiptNumber: formData.receiptNumber,
            date: formattedDate,
            type: '기타 인권침해',
            currentStep: 0, // 0: 접수, 1: 검토중, 2: 조사중, 3: 완료
            lawyerFeedback: '신고가 정상적으로 접수되었으며, 현재 담당 변호사 배정 및 초기 검토를 대기 중입니다. 검토가 시작되면 이곳에 변호사의 의견이 업데이트됩니다.'
        });
    };

    const steps = [
        { label: '접수 완료', desc: '신고가 정상 접수됨' },
        { label: '검토 중', desc: '변호사 1차 내용 확인' },
        { label: '조사/처리 중', desc: '사실 관계 파악 및 조치' },
        { label: '처리 완료', desc: '최종 결과 안내' },
    ];

    return (
        <div style={styles.container}>
            <Hero title="신고 확인" breadcrumb="신고 확인" />
            <div className="container" style={styles.contentWrapper}>
                <div style={styles.header}>
                    <h1 style={styles.title}>신고 결과 확인</h1>
                    <p style={styles.subtitle}>
                        신고 시 발급받은 접수번호와 설정하신 비밀번호를 입력하여
                        현재 진행 상황과 담당 변호사의 답변을 확인하세요.
                    </p>
                </div>

                {!isSearched ? (
                    <div style={styles.searchFormContainer}>
                        <div style={styles.searchIconWrapper}>
                            <Search size={32} color="var(--color-primary)" />
                        </div>
                        <form onSubmit={handleSearch} style={styles.form}>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>접수번호</label>
                                <div style={styles.inputWrapper}>
                                    <FileText size={20} color="var(--color-text-light)" style={styles.inputIcon} />
                                    <input
                                        type="text"
                                        name="receiptNumber"
                                        value={formData.receiptNumber}
                                        onChange={handleInputChange}
                                        style={{ ...styles.input, paddingLeft: '44px' }}
                                        placeholder="예: TY-2023-0123"
                                    />
                                </div>
                            </div>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>비밀번호</label>
                                <div style={styles.inputWrapper}>
                                    <Lock size={20} color="var(--color-text-light)" style={styles.inputIcon} />
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        style={{ ...styles.input, paddingLeft: '44px' }}
                                        placeholder="신고 시 설정한 비밀번호"
                                    />
                                </div>
                            </div>
                            <button type="submit" style={styles.submitButton} className="btn-hover-effect">
                                조회하기
                            </button>
                        </form>
                    </div>
                ) : (
                    <div style={styles.resultContainer} className="animate-fade-in">
                        {/* Summary Card */}
                        <div style={styles.summaryCard}>
                            <div style={styles.summaryHeader}>
                                <div>
                                    <span style={styles.badge}>{statusData.type}</span>
                                    <h2 style={styles.receiptText}>{statusData.receiptNumber}</h2>
                                </div>
                                <div style={styles.dateLabel}>접수일: {statusData.date}</div>
                            </div>
                        </div>

                        {/* Progress Stepper */}
                        <div style={styles.stepperContainer}>
                            <h3 style={styles.sectionTitle}>현재 진행 상황</h3>
                            <div style={styles.stepperList}>
                                {steps.map((step, index) => {
                                    const isActive = index === statusData.currentStep;
                                    const isCompleted = index < statusData.currentStep;

                                    return (
                                        <div key={index} style={styles.stepItem}>
                                            <div style={styles.stepConnector(isCompleted, index === steps.length - 1)}></div>
                                            <div style={styles.stepIconWrapper(isActive, isCompleted)}>
                                                {isCompleted ? <CheckCircle size={16} /> : <div style={styles.stepNumber}>{index + 1}</div>}
                                            </div>
                                            <div style={styles.stepTextContainer}>
                                                <div style={styles.stepLabel(isActive || isCompleted)}>{step.label}</div>
                                                <div style={styles.stepDesc}>{step.desc}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Lawyer Feedback */}
                        <div style={styles.feedbackContainer}>
                            <div style={styles.feedbackHeader}>
                                <AlertCircle size={20} color="var(--color-primary)" />
                                <h3 style={{ ...styles.sectionTitle, margin: 0, color: 'var(--color-primary)' }}>
                                    담당 변호사 검토 의견
                                </h3>
                            </div>
                            <div style={styles.feedbackContent}>
                                <p style={{ lineHeight: 1.6, color: 'var(--color-text-main)' }}>
                                    {statusData.lawyerFeedback}
                                </p>
                            </div>
                            <div style={styles.feedbackFooter}>
                                <Clock size={14} style={{ marginRight: '6px' }} />
                                최근 업데이트: 2023-11-05 09:15
                            </div>
                        </div>

                        <button
                            onClick={() => setIsSearched(false)}
                            style={styles.resetButton}
                        >
                            다른 접수번호 조회
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        paddingBottom: '100px',
    },
    contentWrapper: {
        paddingTop: '60px',
    },
    header: {
        marginBottom: '40px',
        textAlign: 'center',
    },
    title: {
        fontSize: '32px',
        fontWeight: 700,
        color: 'var(--color-text-main)',
        marginBottom: '16px',
    },
    subtitle: {
        fontSize: '16px',
        color: 'var(--color-text-muted)',
        lineHeight: 1.6,
    },
    searchFormContainer: {
        backgroundColor: 'var(--color-white)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-md)',
        padding: '48px',
        border: '1px solid var(--color-border)',
    },
    searchIconWrapper: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '32px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    label: {
        fontSize: '14px',
        fontWeight: 500,
        color: 'var(--color-text-main)',
    },
    inputWrapper: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    },
    inputIcon: {
        position: 'absolute',
        left: '16px',
    },
    input: {
        width: '100%',
        padding: '14px 16px',
        fontSize: '15px',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        outline: 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        backgroundColor: 'var(--color-bg-light)',
    },
    submitButton: {
        backgroundColor: 'var(--color-primary)',
        color: 'var(--color-white)',
        fontSize: '16px',
        fontWeight: 600,
        padding: '16px',
        borderRadius: 'var(--radius-md)',
        marginTop: '16px',
        transition: 'background-color 0.2s',
    },
    // Result Styles
    resultContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
    },
    summaryCard: {
        backgroundColor: 'var(--color-white)',
        padding: '24px',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
    },
    summaryHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    badge: {
        display: 'inline-block',
        backgroundColor: 'var(--color-accent)',
        color: 'var(--color-primary)',
        fontSize: '13px',
        fontWeight: 600,
        padding: '4px 12px',
        borderRadius: '20px',
        marginBottom: '12px',
    },
    receiptText: {
        fontSize: '24px',
        fontWeight: 700,
        margin: 0,
        color: 'var(--color-text-main)',
        letterSpacing: '1px',
    },
    dateLabel: {
        fontSize: '14px',
        color: 'var(--color-text-muted)',
    },
    stepperContainer: {
        backgroundColor: 'var(--color-white)',
        padding: '32px',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
    },
    sectionTitle: {
        fontSize: '18px',
        fontWeight: 600,
        marginBottom: '24px',
    },
    stepperList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
    },
    stepItem: {
        display: 'flex',
        position: 'relative',
        paddingBottom: '32px',
    },
    stepConnector: (isCompleted, isLast) => ({
        position: 'absolute',
        left: '15px',
        top: '32px',
        bottom: 0,
        width: '2px',
        backgroundColor: isCompleted ? 'var(--color-primary)' : 'var(--color-border)',
        display: isLast ? 'none' : 'block',
    }),
    stepIconWrapper: (isActive, isCompleted) => ({
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isActive || isCompleted ? 'var(--color-primary)' : 'var(--color-bg-light)',
        color: isActive || isCompleted ? 'var(--color-white)' : 'var(--color-text-light)',
        border: `2px solid ${isActive || isCompleted ? 'var(--color-primary)' : 'var(--color-border)'}`,
        zIndex: 1,
        flexShrink: 0,
    }),
    stepNumber: {
        fontSize: '14px',
        fontWeight: 600,
    },
    stepTextContainer: {
        marginLeft: '16px',
        paddingTop: '6px',
    },
    stepLabel: (isActiveOrCompleted) => ({
        fontSize: '16px',
        fontWeight: 600,
        color: isActiveOrCompleted ? 'var(--color-text-main)' : 'var(--color-text-light)',
        marginBottom: '4px',
    }),
    stepDesc: {
        fontSize: '14px',
        color: 'var(--color-text-muted)',
    },
    feedbackContainer: {
        backgroundColor: '#F8FAFC', // Slightly different blue-ish tint
        border: '1px solid #E2E8F0',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
    },
    feedbackHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '24px 24px 16px',
        borderBottom: '1px solid #E2E8F0',
    },
    feedbackContent: {
        padding: '24px',
        backgroundColor: 'var(--color-white)',
    },
    feedbackFooter: {
        display: 'flex',
        alignItems: 'center',
        padding: '12px 24px',
        backgroundColor: '#F8FAFC',
        fontSize: '13px',
        color: 'var(--color-text-muted)',
        borderTop: '1px solid #E2E8F0',
    },
    resetButton: {
        alignSelf: 'center',
        padding: '12px 24px',
        backgroundColor: 'transparent',
        color: 'var(--color-text-muted)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        fontSize: '14px',
        fontWeight: 500,
        marginTop: '16px',
    }
};

const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @media (max-width: 600px) {
    div[style*="padding: 48px"] {
      padding: 32px 24px !important;
    }
    div[style*="flex-direction: column"] > div[style*="paddingBottom: 32px"]:last-child {
      padding-bottom: 0 !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default Status;
