import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Clock, AlertCircle } from 'lucide-react';
import { supabase } from '../../supabaseClient';

const AdminReportDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [report, setReport] = useState(null);
    const [status, setStatus] = useState('');
    const [feedback, setFeedback] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetchReportDetail();
    }, [id]);

    const fetchReportDetail = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('reports')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;

            setReport(data);
            setStatus(data.status || 'RECEIVED');
            setFeedback(data.lawyer_feedback || '');
        } catch (error) {
            console.error('Error fetching report details:', error.message);
            alert('상세 정보를 불러오는데 실패했습니다.');
            navigate('/ty-manage-desk/reports');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const { error } = await supabase
                .from('reports')
                .update({
                    status: status,
                    lawyer_feedback: feedback,
                    updated_at: new Date().toISOString()
                })
                .eq('id', id);

            if (error) throw error;
            alert('성공적으로 저장되었습니다.');
            fetchReportDetail(); // Refresh data
        } catch (error) {
            console.error('Error updating report:', error.message);
            alert('저장 중 오류가 발생했습니다.');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return <div style={{ padding: '40px' }}>불러오는 중...</div>;
    }

    if (!report) return null;

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => navigate('/ty-manage-desk/reports')} style={styles.backBtn}>
                    <ArrowLeft size={20} />
                    목록으로 돌아가기
                </button>
                <button
                    onClick={handleSave}
                    style={{ ...styles.saveBtn, opacity: isSaving ? 0.7 : 1 }}
                    disabled={isSaving}
                >
                    <Save size={18} />
                    {isSaving ? '저장 중...' : '변경사항 저장'}
                </button>
            </div>

            <div style={styles.contentGrid}>
                {/* Left Column: Report Details */}
                <div style={styles.leftCol}>
                    <div style={styles.card}>
                        <div style={styles.cardHeader}>
                            <h2 style={styles.sectionTitle}>신고 원문 보기</h2>
                            <span style={styles.ticketBadge}>{report.ticket_number}</span>
                        </div>

                        <div style={styles.infoGrid}>
                            <div style={styles.infoGroup}>
                                <label style={styles.label}>접수 일시</label>
                                <div style={styles.value}>{new Date(report.created_at).toLocaleString('ko-KR')}</div>
                            </div>
                            <div style={styles.infoGroup}>
                                <label style={styles.label}>고객사명</label>
                                <div style={styles.value}>{report.partner_name}</div>
                            </div>
                            <div style={styles.infoGroup}>
                                <label style={styles.label}>신고자 성명 (익명가능)</label>
                                <div style={styles.value}>{report.reporter_name || '익명'}</div>
                            </div>
                            <div style={styles.infoGroup}>
                                <label style={styles.label}>신고 유형</label>
                                <div style={styles.value}>{report.report_type}</div>
                            </div>
                            <div style={styles.infoGroup}>
                                <label style={styles.label}>연락처</label>
                                <div style={styles.value}>{report.reporter_phone || '미접수'}</div>
                            </div>
                            <div style={styles.infoGroup}>
                                <label style={styles.label}>이메일</label>
                                <div style={styles.value}>{report.reporter_email || '미접수'}</div>
                            </div>
                        </div>

                        <div style={styles.divider}></div>

                        <div style={styles.reportContent}>
                            <h3 style={styles.reportTitle}>{report.title}</h3>
                            {/* In a real app, safely render HTML from quill, here using dangerouslySetInnerHTML */}
                            <div
                                style={styles.reportBody}
                                dangerouslySetInnerHTML={{ __html: report.content }}
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column: Admin Actions */}
                <div style={styles.rightCol}>
                    <div style={styles.card}>
                        <h2 style={styles.sectionTitle}>진행 관리</h2>

                        <div style={styles.actionGroup}>
                            <label style={styles.label}>현재 상태</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                style={styles.select}
                            >
                                <option value="RECEIVED">신고접수완료</option>
                                <option value="BASIC_REVIEWING">기초조사 중</option>
                                <option value="BASIC_COMPLETED">기초조사 완료</option>
                                <option value="BASIC_REPORTED">기초조사 결과 보고</option>
                                <option value="DEEP_INVESTIGATING">심층조사 중</option>
                                <option value="DEEP_COMPLETED">심층조사 완료</option>
                                <option value="DEEP_REPORTED">심층조사 결과 보고</option>
                                <option value="COMPLETED">구제조치 완료</option>
                                {/* Keep legacy options hidden if not selected, but visible if currently selected */}
                                {status === 'REVIEWING' && <option value="REVIEWING">기초조사 중 (구버전)</option>}
                                {status === 'INVESTIGATING' && <option value="INVESTIGATING">심층조사 중 (구버전)</option>}
                            </select>
                        </div>

                        <div style={styles.actionGroup}>
                            <label style={styles.label}>
                                담당 변호사 코멘트
                                <span style={styles.labelDesc}>(신고자가 조회 시 볼 수 있습니다)</span>
                            </label>
                            <textarea
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                style={styles.textarea}
                                placeholder="신고자에게 전달할 진행 상황이나 피드백을 입력하세요."
                            />
                        </div>
                    </div>

                    {/* Metadata Card */}
                    <div style={{ ...styles.card, marginTop: '24px' }}>
                        <h2 style={styles.sectionTitle}>시스템 정보</h2>
                        <div style={styles.metaRow}>
                            <Clock size={16} color="#64748b" />
                            <span style={styles.metaText}>
                                마지막 업데이트: {new Date(report.updated_at).toLocaleString('ko-KR')}
                            </span>
                        </div>
                        <div style={styles.metaRow}>
                            <AlertCircle size={16} color="#64748b" />
                            <span style={styles.metaText}>
                                이 데이터는 열람 기록이 감사 로그에 남습니다.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '40px',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px',
    },
    backBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'none',
        border: 'none',
        fontSize: '16px',
        fontWeight: 600,
        color: '#475569',
        cursor: 'pointer',
        padding: '8px 0',
    },
    saveBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 24px',
        backgroundColor: '#1E3A8A',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: 700,
        color: '#fff',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },
    contentGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 400px',
        gap: '24px',
        alignItems: 'start',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        padding: '32px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px',
    },
    sectionTitle: {
        fontSize: '20px',
        fontWeight: 700,
        color: '#1e293b',
        margin: 0,
    },
    ticketBadge: {
        backgroundColor: '#f1f5f9',
        color: '#475569',
        padding: '6px 16px',
        borderRadius: '20px',
        fontSize: '15px',
        fontWeight: 600,
        border: '1px solid #cbd5e1',
    },
    infoGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '24px',
    },
    infoGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    },
    label: {
        fontSize: '14px',
        fontWeight: 600,
        color: '#64748b',
    },
    labelDesc: {
        fontSize: '13px',
        fontWeight: 400,
        color: '#94a3b8',
        marginLeft: '8px',
    },
    value: {
        fontSize: '16px',
        color: '#1e293b',
        padding: '12px 16px',
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
    },
    divider: {
        height: '1px',
        backgroundColor: '#e2e8f0',
        margin: '32px 0',
    },
    reportContent: {
        backgroundColor: '#fff',
    },
    reportTitle: {
        fontSize: '22px',
        fontWeight: 700,
        color: '#1e293b',
        marginBottom: '24px',
        marginTop: 0,
    },
    reportBody: {
        fontSize: '16px',
        lineHeight: 1.8,
        color: '#334155',
        minHeight: '200px',
        whiteSpace: 'pre-wrap', // Preserves basic formatting if HTML is stripped
        padding: '24px',
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
    },
    actionGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        marginBottom: '32px',
    },
    select: {
        padding: '14px 16px',
        borderRadius: '8px',
        border: '1px solid #cbd5e1',
        fontSize: '16px',
        color: '#1e293b',
        backgroundColor: '#fff',
        outline: 'none',
        cursor: 'pointer',
    },
    textarea: {
        padding: '16px',
        borderRadius: '8px',
        border: '1px solid #cbd5e1',
        fontSize: '16px',
        color: '#1e293b',
        backgroundColor: '#fff',
        outline: 'none',
        minHeight: '200px',
        resize: 'vertical',
        lineHeight: 1.6,
    },
    metaRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 0',
        borderBottom: '1px solid #f1f5f9',
        ':last-child': {
            borderBottom: 'none',
        }
    },
    metaText: {
        fontSize: '14px',
        color: '#64748b',
    }
};

export default AdminReportDetail;
