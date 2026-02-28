import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { FileText, MessageSquare, PieChart, BarChart2, Activity } from 'lucide-react';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        reports: {
            total: 0,
            byStatus: {
                RECEIVED: 0,
                BASIC_REVIEWING: 0,
                BASIC_COMPLETED: 0,
                BASIC_REPORTED: 0,
                DEEP_INVESTIGATING: 0,
                DEEP_COMPLETED: 0,
                DEEP_REPORTED: 0,
                LEGACY_REVIEWING: 0, // Fallback for old data
                LEGACY_INVESTIGATING: 0, // Fallback for old data
                LEGACY_COMPLETED: 0 // Fallback for old data
            },
            byType: {
                sexualHarassment: 0,
                harassment: 0,
                corruption: 0,
                others: 0
            }
        },
        inquiries: {
            total: 0,
            unread: 0,
            read: 0
        }
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch reports data
                const { data: reportsData, error: reportsError } = await supabase
                    .from('reports')
                    .select('status, report_type');

                if (reportsError) throw reportsError;

                // Group reports
                let rStatus = {
                    RECEIVED: 0,
                    BASIC_REVIEWING: 0,
                    BASIC_COMPLETED: 0,
                    BASIC_REPORTED: 0,
                    DEEP_INVESTIGATING: 0,
                    DEEP_COMPLETED: 0,
                    DEEP_REPORTED: 0,
                    LEGACY_REVIEWING: 0,
                    LEGACY_INVESTIGATING: 0,
                    LEGACY_COMPLETED: 0
                };
                let rType = { sexualHarassment: 0, harassment: 0, corruption: 0, others: 0 };

                reportsData.forEach(r => {
                    // Exact status mapping
                    if (rStatus[r.status] !== undefined) {
                        rStatus[r.status]++;
                    } else if (r.status === 'REVIEWING') {
                        rStatus.LEGACY_REVIEWING++;
                    } else if (r.status === 'INVESTIGATING') {
                        rStatus.LEGACY_INVESTIGATING++;
                    } else if (r.status === 'COMPLETED') {
                        rStatus.LEGACY_COMPLETED++;
                    }

                    // Type grouping (handle both English legacy keys and Korean strings)
                    const type = r.report_type;
                    if (type === 'sexual_harassment' || type === '성희롱 / 성폭력' || type === '직장내 성희롱' || type === 'corruption') {
                        // Note: older bug saved sexual harassment as corruption for a while, so grouping all historical ones here as requested
                        rType.sexualHarassment++;
                    } else if (type === 'harassment' || type === '직장내 괴롭힘' || type === '직장 내 괴롭힘') {
                        rType.harassment++;
                    } else if (type === '기타 인권침해' || type === '부패 / 비리') {
                        rType.corruption++;
                    } else {
                        rType.others++;
                    }
                });

                // Fetch inquiries data
                const { data: inquiriesData, error: inquiriesError } = await supabase
                    .from('inquiries')
                    .select('status');

                if (inquiriesError) throw inquiriesError;

                let iUnread = 0;
                let iRead = 0;

                inquiriesData.forEach(i => {
                    if (i.status === 'UNREAD') iUnread++;
                    else iRead++;
                });

                setStats({
                    reports: {
                        total: reportsData.length,
                        byStatus: rStatus,
                        byType: rType
                    },
                    inquiries: {
                        total: inquiriesData.length,
                        unread: iUnread,
                        read: iRead
                    }
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>관리자 대시보드</h1>
                <p style={styles.subtitle}>TY Lawyers Guardian 시스템 운영 개요</p>
            </div>

            {/* Reports Section */}
            <div style={styles.section}>
                <div style={styles.sectionHeader}>
                    <FileText size={20} color="#1e3a8a" />
                    <h2 style={styles.sectionTitle}>신고 접수 현황 (총 {stats.reports.total}건)</h2>
                </div>

                <div style={styles.reportsGrid}>
                    {/* Status Breakdown */}
                    <div style={styles.card}>
                        <div style={styles.cardHeader}>
                            <Activity size={18} color="#64748b" />
                            <h3 style={styles.cardTitle}>진행단계별</h3>
                        </div>
                        {/* First Row of 3 Steps */}
                        <div style={{ ...styles.statsRow, marginBottom: '16px' }}>
                            <div style={styles.statItem}>
                                <span style={styles.statLabel}>신고접수 완료</span>
                                <span style={{ ...styles.statValue, color: '#b45309' }}>{stats.reports.byStatus.RECEIVED}</span>
                            </div>
                            <div style={styles.statItem}>
                                <span style={styles.statLabel}>기초조사 중</span>
                                <span style={{ ...styles.statValue, color: '#1d4ed8' }}>{stats.reports.byStatus.BASIC_REVIEWING + stats.reports.byStatus.LEGACY_REVIEWING}</span>
                            </div>
                            <div style={styles.statItem}>
                                <span style={styles.statLabel}>기초조사 완료</span>
                                <span style={{ ...styles.statValue, color: '#1d4ed8' }}>{stats.reports.byStatus.BASIC_COMPLETED}</span>
                            </div>
                        </div>
                        {/* Second Row of 4 Steps */}
                        <div style={styles.statsRow}>
                            <div style={styles.statItem}>
                                <span style={styles.statLabel}>기초조사 결과 보고</span>
                                <span style={{ ...styles.statValue, color: '#1d4ed8' }}>{stats.reports.byStatus.BASIC_REPORTED}</span>
                            </div>
                            <div style={styles.statItem}>
                                <span style={styles.statLabel}>심층조사 중</span>
                                <span style={{ ...styles.statValue, color: '#6d28d9' }}>{stats.reports.byStatus.DEEP_INVESTIGATING + stats.reports.byStatus.LEGACY_INVESTIGATING}</span>
                            </div>
                            <div style={styles.statItem}>
                                <span style={styles.statLabel}>심층조사 완료</span>
                                <span style={{ ...styles.statValue, color: '#6d28d9' }}>{stats.reports.byStatus.DEEP_COMPLETED}</span>
                            </div>
                            <div style={styles.statItem}>
                                <span style={styles.statLabel}>심층조사 결과 보고</span>
                                <span style={{ ...styles.statValue, color: '#15803d' }}>{stats.reports.byStatus.DEEP_REPORTED + stats.reports.byStatus.LEGACY_COMPLETED}</span>
                            </div>
                        </div>
                    </div>

                    {/* Type Breakdown */}
                    <div style={styles.card}>
                        <div style={styles.cardHeader}>
                            <PieChart size={18} color="#64748b" />
                            <h3 style={styles.cardTitle}>신고유형별</h3>
                        </div>
                        <div style={styles.statsRow}>
                            <div style={styles.statItem}>
                                <span style={styles.statLabel}>직장내 성희롱</span>
                                <span style={styles.statValue}>{stats.reports.byType.sexualHarassment}</span>
                            </div>
                            <div style={styles.statItem}>
                                <span style={styles.statLabel}>직장내 괴롭힘</span>
                                <span style={styles.statValue}>{stats.reports.byType.harassment}</span>
                            </div>
                            <div style={styles.statItem}>
                                <span style={styles.statLabel}>기타 인권침해</span>
                                <span style={styles.statValue}>{stats.reports.byType.corruption}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Inquiries Section */}
            <div style={styles.section}>
                <div style={styles.sectionHeader}>
                    <MessageSquare size={20} color="#1e3a8a" />
                    <h2 style={styles.sectionTitle}>도입 문의 현황 (총 {stats.inquiries.total}건)</h2>
                </div>

                <div style={styles.card}>
                    <div style={styles.statsRow}>
                        <div style={styles.statItem}>
                            <span style={styles.statLabel}>신규 문의 (미확인)</span>
                            <span style={{ ...styles.statValue, color: '#b91c1c' }}>{stats.inquiries.unread}</span>
                        </div>
                        <div style={styles.statItem}>
                            <span style={styles.statLabel}>확인 완료</span>
                            <span style={{ ...styles.statValue, color: '#475569' }}>{stats.inquiries.read}</span>
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
        backgroundColor: '#f8fafc',
        minHeight: '100%',
    },
    header: {
        marginBottom: '40px',
    },
    title: {
        fontSize: '28px',
        fontWeight: 700,
        color: '#1e293b',
        margin: '0 0 8px 0',
    },
    subtitle: {
        fontSize: '16px',
        color: '#64748b',
        margin: 0,
    },
    section: {
        marginBottom: '40px',
    },
    sectionHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '20px',
        borderBottom: '2px solid #e2e8f0',
        paddingBottom: '12px',
    },
    sectionTitle: {
        fontSize: '20px',
        fontWeight: 700,
        color: '#1e3a8a',
        margin: 0,
    },
    reportsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '24px',
    },
    card: {
        backgroundColor: '#fff',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
        border: '1px solid #e2e8f0',
    },
    cardHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '20px',
    },
    cardTitle: {
        fontSize: '16px',
        color: '#334155',
        fontWeight: 600,
        margin: 0,
    },
    statsRow: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
    },
    statItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        minWidth: '100px',
        backgroundColor: '#f8fafc',
        padding: '16px',
        borderRadius: '8px',
        border: '1px solid #f1f5f9',
    },
    statLabel: {
        fontSize: '14px',
        color: '#64748b',
        fontWeight: 500,
        marginBottom: '8px',
        textAlign: 'center',
    },
    statValue: {
        fontSize: '32px',
        fontWeight: 700,
        color: '#0f172a',
        margin: 0,
    }
};

export default AdminDashboard;
