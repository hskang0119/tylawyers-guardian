import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Lock, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import Hero from '../components/Hero';

const Status = () => {
    const location = useLocation();

    const [formData, setFormData] = useState({
        receiptNumber: location.state?.receiptNumber || '',
        password: location.state?.password || ''
    });
    const [isSearched, setIsSearched] = useState(false);
    const [statusData, setStatusData] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const performSearch = (receiptNum, pw) => {
        if (!receiptNum || !pw) {
            alert('접수번호와 비밀번호를 모두 입력해주세요.');
            return;
        }

        // Simulate API call and response
        setIsSearched(true);

        // Mocking a successful response for demonstration (Initial State)
        const today = new Date();
        const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')} ${String(today.getHours()).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')}`;

        setStatusData({
            receiptNumber: receiptNum,
            date: formattedDate,
            type: '기타 인권침해',
            currentStep: 0, // 0: 접수, 1: 검토중, 2: 조사중, 3: 완료
            lawyerFeedback: '신고가 정상적으로 접수되었으며, 현재 담당 변호사 배정 및 초기 검토를 대기 중입니다. 검토가 시작되면 이곳에 변호사의 의견이 업데이트됩니다.'
        });
    };

    useEffect(() => {
        if (location.state?.receiptNumber && location.state?.password) {
            performSearch(location.state.receiptNumber, location.state.password);
        }
    }, [location.state]);

    const handleSearch = (e) => {
        e.preventDefault();
        performSearch(formData.receiptNumber, formData.password);
    };

    const steps = [
        { label: '접수 완료', desc: '신고가 정상 접수됨' },
        { label: '검토 중', desc: '변호사 1차 내용 확인' },
        { label: '조사/처리 중', desc: '사실 관계 파악 및 조치' },
        { label: '처리 완료', desc: '최종 결과 안내' },
    ];

    return (
        <div style={styles.container}>
            <Hero title="진행상황조회" breadcrumb="진행상황조회" />
            <div className="container" style={styles.contentWrapper}>
                {!isSearched ? (
                    <div style={styles.searchFormContainer}>
                        <h2 style={styles.cardTitle}>진행상황조회</h2>
                        <form onSubmit={handleSearch} style={styles.form}>
                            <div style={styles.inputArea}>
                                <input
                                    type="text"
                                    name="receiptNumber"
                                    value={formData.receiptNumber}
                                    onChange={handleInputChange}
                                    style={styles.inputTop}
                                    placeholder="접수번호 입력"
                                />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    style={styles.inputBottom}
                                    placeholder="비밀번호 입력"
                                />
                            </div>
                            <button type="submit" style={styles.submitButton}>
                                확인
                            </button>
                        </form>
                        <p style={styles.cardInfoText}>
                            · 신고서 제출 시 할당된 접수번호와 비밀번호를 입력해 주세요.
                        </p>
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
        backgroundColor: '#3b82f6', // Bright blue matching Home page
        borderRadius: '16px',
        padding: '50px 40px', // Scaled down to match Report.jsx
        maxWidth: '600px', // Scaled down to match Report.jsx
        margin: '0 auto',
        boxShadow: 'var(--shadow-lg)',
        color: 'var(--color-white)',
        textAlign: 'center',
    },
    cardTitle: {
        fontSize: '28px', // Scaled down to match Report.jsx
        fontWeight: 700,
        marginBottom: '40px',
        color: 'var(--color-white)',
    },
    form: {
        display: 'flex',
        height: '120px', // Total height for two stacked inputs (60px each)
        backgroundColor: 'var(--color-white)',
        borderRadius: '4px',
        overflow: 'hidden',
        marginBottom: '30px',
    },
    inputArea: {
        display: 'flex',
        flexDirection: 'column',
        flex: 2,
    },
    inputTop: {
        width: '100%',
        height: '60px',
        padding: '0 24px',
        fontSize: '18px',
        border: 'none',
        borderBottom: '1px solid #e5e7eb',
        outline: 'none',
        color: 'var(--color-text-main)',
    },
    inputBottom: {
        width: '100%',
        height: '60px',
        padding: '0 24px',
        fontSize: '18px',
        border: 'none',
        outline: 'none',
        color: 'var(--color-text-main)',
    },
    submitButton: {
        flex: 1, // Slightly narrower than inputs, but takes remaining space
        backgroundColor: '#172554', // Dark navy
        color: 'var(--color-white)',
        fontSize: '22px',
        fontWeight: 700,
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },
    cardInfoText: {
        fontSize: '16px',
        color: 'var(--color-white)',
        opacity: 0.9,
        textAlign: 'left',
        paddingLeft: '10px',
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
