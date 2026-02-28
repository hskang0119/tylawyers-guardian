import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Lock, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import Hero from '../components/Hero';
import { supabase } from '../supabaseClient';

const Status = () => {
    const location = useLocation();

    const [formData, setFormData] = useState({
        receiptNumber: location.state?.receiptNumber || '',
        password: location.state?.password || ''
    });
    const [isSearched, setIsSearched] = useState(false);
    const [statusData, setStatusData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrorMsg(''); // clear error when typing
    };

    const performSearch = async (receiptNum, pw) => {
        if (!receiptNum || !pw) {
            alert('접수번호와 비밀번호를 모두 입력해주세요.');
            return;
        }

        setIsLoading(true);
        setErrorMsg('');

        try {
            // Query Supabase for the specific ticket and password
            const { data, error } = await supabase
                .from('reports')
                .select('*')
                .eq('ticket_number', receiptNum)
                .eq('password_hash', pw)
                .single();

            if (error || !data) {
                console.error('Search error:', error);
                setErrorMsg('일치하는 신고 내역이 없거나 비밀번호가 틀렸습니다.');
                setIsSearched(false);
                return;
            }

            // Map database status to flowchart step index (0 to 4)
            let stepIndex = 0;
            switch (data.status) {
                case 'RECEIVED': stepIndex = 0; break;
                case 'BASIC_REVIEWING':
                case 'BASIC_COMPLETED':
                case 'REVIEWING': // Legacy
                    stepIndex = 1; break;
                case 'DEEP_INVESTIGATING':
                case 'DEEP_COMPLETED':
                case 'INVESTIGATING': // Legacy
                    stepIndex = 2; break;
                case 'BASIC_REPORTED':
                case 'DEEP_REPORTED':
                    stepIndex = 3; break;
                case 'COMPLETED': stepIndex = 4; break;
                default: stepIndex = 0; break;
            }

            const statusMap = {
                'RECEIVED': '신고접수완료',
                'BASIC_REVIEWING': '기초조사 중',
                'BASIC_COMPLETED': '기초조사 완료',
                'BASIC_REPORTED': '기초조사 결과 보고',
                'DEEP_INVESTIGATING': '심층조사 중',
                'DEEP_COMPLETED': '심층조사 완료',
                'DEEP_REPORTED': '심층조사 결과 보고',
                'COMPLETED': '구제조치 완료',
                'REVIEWING': '기초조사 중', // Legacy
                'INVESTIGATING': '심층조사 중' // Legacy
            };
            const detailedStatusText = statusMap[data.status] || data.status;

            // Format date
            const createdDate = new Date(data.created_at);
            const formattedDate = `${createdDate.getFullYear()}-${String(createdDate.getMonth() + 1).padStart(2, '0')}-${String(createdDate.getDate()).padStart(2, '0')} ${String(createdDate.getHours()).padStart(2, '0')}:${String(createdDate.getMinutes()).padStart(2, '0')}`;

            const updatedDate = new Date(data.updated_at);
            const formattedUpdatedDate = `${updatedDate.getFullYear()}-${String(updatedDate.getMonth() + 1).padStart(2, '0')}-${String(updatedDate.getDate()).padStart(2, '0')} ${String(updatedDate.getHours()).padStart(2, '0')}:${String(updatedDate.getMinutes()).padStart(2, '0')}`;

            let displayType = '기타 인권침해';
            if (data.report_type === 'sexual_harassment' || data.report_type === '성희롱 / 성폭력') {
                displayType = '직장내 성희롱';
            } else if (data.report_type === 'harassment' || data.report_type === '직장내 괴롭힘' || data.report_type === '직장 내 괴롭힘') {
                displayType = '직장내 괴롭힘';
            } else if (data.report_type === 'corruption' || data.report_type === '부패 / 비리' || data.report_type === '기타 인권침해') {
                displayType = '기타 인권침해';
            } else if (data.report_type === '직장내 성희롱') {
                displayType = '직장내 성희롱';
            }

            setStatusData({
                receiptNumber: data.ticket_number,
                date: formattedDate,
                updatedDate: formattedUpdatedDate,
                type: displayType,
                detailedStatus: detailedStatusText,
                currentStep: stepIndex, // 0 to 4
                lawyerFeedback: data.lawyer_feedback || '신고가 정상적으로 접수되었으며, 현재 담당 변호사 배정 및 초기 검토를 대기 중입니다. 검토가 시작되면 이곳에 변호사의 의견이 업데이트됩니다.'
            });

            setIsSearched(true);
        } catch (err) {
            console.error('Unexpected search error:', err);
            setErrorMsg('조회 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
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
        { label: '신고접수', desc: '신고사항 파악' },
        { label: '기초조사', desc: '기초 사실관계 조사' },
        { label: '심층조사', desc: '상세 진술 및 증거 확보' },
        { label: '결과보고', desc: '조사 결과 점검/보고' },
        { label: '구제조치', desc: '최종 조치 및 결과 안내' },
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
                            <button type="submit" style={styles.submitButton} disabled={isLoading}>
                                {isLoading ? '조회중...' : '확인'}
                            </button>
                        </form>

                        {errorMsg && (
                            <div style={{ color: '#fca5a5', marginTop: '16px', fontSize: '16px' }}>
                                <AlertCircle size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} />
                                {errorMsg}
                            </div>
                        )}

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
                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                        <span style={styles.typeBadge}>{statusData.type}</span>
                                        <span style={styles.statusBadge}>{statusData.detailedStatus}</span>
                                    </div>
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
                                <div style={{ lineHeight: 1.7, color: 'var(--color-text-main)' }} dangerouslySetInnerHTML={{ __html: statusData.lawyerFeedback?.replace(/\n/g, '<br/>') }}>
                                </div>
                            </div>
                            <div style={styles.feedbackFooter}>
                                <Clock size={14} style={{ marginRight: '6px' }} />
                                최근 업데이트: {statusData.updatedDate}
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
        fontSize: '34px',
        fontWeight: 700,
        color: 'var(--color-text-main)',
        marginBottom: '16px',
    },
    subtitle: {
        fontSize: '18px',
        color: 'var(--color-text-muted)',
        lineHeight: 1.7,
    },
    searchFormContainer: {
        backgroundColor: '#3b82f6', // Bright blue matching Home page
        borderRadius: '16px',
        padding: '50px 40px', // Scaled down to match Report.jsx
        maxWidth: '960px', // Updated to match the global 960px rule
        margin: '0 auto',
        boxShadow: 'var(--shadow-lg)',
        color: 'var(--color-white)',
        textAlign: 'center',
    },
    cardTitle: {
        fontSize: '30px', // Scaled down to match Report.jsx
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
        fontSize: '20px',
        border: 'none',
        borderBottom: '1px solid #e5e7eb',
        outline: 'none',
        color: 'var(--color-text-main)',
    },
    inputBottom: {
        width: '100%',
        height: '60px',
        padding: '0 24px',
        fontSize: '20px',
        border: 'none',
        outline: 'none',
        color: 'var(--color-text-main)',
    },
    submitButton: {
        flex: 1, // Slightly narrower than inputs, but takes remaining space
        backgroundColor: '#172554', // Dark navy
        color: 'var(--color-white)',
        fontSize: '24px',
        fontWeight: 700,
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },
    cardInfoText: {
        fontSize: '18px',
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
        maxWidth: '960px',
        margin: '0 auto',
        width: '100%',
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
    typeBadge: {
        display: 'inline-block',
        backgroundColor: '#e0e7ff',
        color: '#4f46e5',
        fontSize: '15px',
        fontWeight: 600,
        padding: '6px 14px',
        borderRadius: '20px',
        marginBottom: '12px',
    },
    statusBadge: {
        display: 'inline-block',
        backgroundColor: 'var(--color-accent)',
        color: 'var(--color-primary)',
        fontSize: '15px',
        fontWeight: 600,
        padding: '6px 14px',
        borderRadius: '20px',
        marginBottom: '12px',
    },
    receiptText: {
        fontSize: '26px',
        fontWeight: 700,
        margin: 0,
        color: 'var(--color-text-main)',
        letterSpacing: '1px',
    },
    dateLabel: {
        fontSize: '16px',
        color: 'var(--color-text-muted)',
    },
    stepperContainer: {
        backgroundColor: 'var(--color-white)',
        padding: '32px',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
    },
    sectionTitle: {
        fontSize: '20px',
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
        fontSize: '16px',
        fontWeight: 600,
    },
    stepTextContainer: {
        marginLeft: '16px',
        paddingTop: '6px',
    },
    stepLabel: (isActiveOrCompleted) => ({
        fontSize: '18px',
        fontWeight: 600,
        color: isActiveOrCompleted ? 'var(--color-text-main)' : 'var(--color-text-light)',
        marginBottom: '4px',
    }),
    stepDesc: {
        fontSize: '16px',
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
        fontSize: '15px',
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
        fontSize: '16px',
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
