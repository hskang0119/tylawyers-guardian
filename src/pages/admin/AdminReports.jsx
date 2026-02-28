import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, MoreHorizontal } from 'lucide-react';
import { supabase } from '../../supabaseClient';

const AdminReports = () => {
    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        setIsLoading(true);
        try {
            // Using a simple select for now. Assumes the admin has RLS permissions
            const { data, error } = await supabase
                .from('reports')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setReports(data || []);
        } catch (error) {
            console.error('Error fetching reports:', error.message);
            alert('데이터를 불러오는데 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusText = (status) => {
        const statusMap = {
            'RECEIVED': '신고접수완료',
            'BASIC_REVIEWING': '기초조사 중',
            'BASIC_COMPLETED': '기초조사 완료',
            'BASIC_REPORTED': '기초조사 결과 보고',
            'DEEP_INVESTIGATING': '심층조사 중',
            'DEEP_COMPLETED': '심층조사 완료',
            'DEEP_REPORTED': '심층조사 결과 보고',
            'COMPLETED': '구제조치 완료',
            'REVIEWING': '기초조사 중', // Legacy fallback
            'INVESTIGATING': '심층조사 중' // Legacy fallback
        };
        return statusMap[status] || status;
    };

    const getStatusStyle = (status) => {
        const styles = {
            'RECEIVED': { bg: '#fef08a', color: '#854d0e' },
            'BASIC_REVIEWING': { bg: '#bfdbfe', color: '#1e40af' },
            'BASIC_COMPLETED': { bg: '#93c5fd', color: '#1e3a8a' },
            'BASIC_REPORTED': { bg: '#ddd6fe', color: '#5b21b6' },
            'DEEP_INVESTIGATING': { bg: '#fed7aa', color: '#9a3412' },
            'DEEP_COMPLETED': { bg: '#fdba74', color: '#7c2d12' },
            'DEEP_REPORTED': { bg: '#e9d5ff', color: '#6b21a8' },
            'COMPLETED': { bg: '#bbf7d0', color: '#166534' },
            'REVIEWING': { bg: '#bfdbfe', color: '#1e40af' },
            'INVESTIGATING': { bg: '#fed7aa', color: '#9a3412' }
        };
        return styles[status] || { bg: '#f1f5f9', color: '#475569' };
    };

    const getTypeLabel = (type) => {
        // Fallback mapping for older reports saved with English keys
        const typeMap = {
            'corruption': '직장내 성희롱', // Historical bug fallback
            'harassment': '직장내 괴롭힘',
            'sexual_harassment': '기타 인권침해'
        };
        return typeMap[type] || type;
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>신고 내역 관리</h1>
                    <p style={styles.subtitle}>접수된 모든 신고 내역을 확인하고 진행 상태를 업데이트합니다.</p>
                </div>
                <div style={styles.headerActions}>
                    <button style={styles.iconBtn}><Filter size={18} /> 필터</button>
                    <button style={styles.actionBtn}>내보내기</button>
                </div>
            </div>

            <div style={styles.tableCard}>
                <div style={styles.tableToolbar}>
                    <div style={styles.searchBox}>
                        <Search size={18} color="#94a3b8" />
                        <input type="text" placeholder="접수번호, 제목, 담당자 검색..." style={styles.searchInput} />
                    </div>
                </div>

                <div style={styles.tableWrapper}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>접수일시</th>
                                <th style={styles.th}>접수번호</th>
                                <th style={styles.th}>유형</th>
                                <th style={styles.th}>고객사명</th>
                                <th style={styles.th}>상태</th>
                                <th style={styles.th}>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan="6" style={styles.emptyState}>데이터를 불러오는 중입니다...</td>
                                </tr>
                            ) : reports.length === 0 ? (
                                <tr>
                                    <td colSpan="6" style={styles.emptyState}>접수된 신고 내역이 없습니다.</td>
                                </tr>
                            ) : (
                                reports.map((report) => (
                                    <tr key={report.id} style={styles.tr}>
                                        <td style={styles.td}>
                                            {new Date(report.created_at).toLocaleDateString('ko-KR')}
                                        </td>
                                        <td style={{ ...styles.td, fontWeight: 600 }}>
                                            {report.ticket_number}
                                        </td>
                                        <td style={styles.td}>
                                            <span style={styles.typeLabel}>{getTypeLabel(report.report_type)}</span>
                                        </td>
                                        <td style={styles.td}>{report.partner_name}</td>
                                        <td style={styles.td}>
                                            <span style={{
                                                ...styles.statusBadge,
                                                backgroundColor: getStatusStyle(report.status).bg,
                                                color: getStatusStyle(report.status).color
                                            }}>
                                                {getStatusText(report.status)}
                                            </span>
                                        </td>
                                        <td style={styles.td}>
                                            <button
                                                style={styles.detailBtn}
                                                onClick={() => navigate(`/ty-manage-desk/reports/${report.id}`)}
                                            >
                                                상세보기
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '40px',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px',
    },
    title: {
        fontSize: '28px',
        fontWeight: 700,
        color: '#1e293b',
        margin: '0 0 8px 0',
    },
    subtitle: {
        fontSize: '15px',
        color: '#64748b',
        margin: 0,
    },
    headerActions: {
        display: 'flex',
        gap: '12px',
    },
    iconBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 16px',
        backgroundColor: '#fff',
        border: '1px solid #cbd5e1',
        borderRadius: '8px',
        fontSize: '15px',
        fontWeight: 500,
        color: '#475569',
        cursor: 'pointer',
    },
    actionBtn: {
        padding: '10px 20px',
        backgroundColor: '#1E3A8A',
        border: 'none',
        borderRadius: '8px',
        fontSize: '15px',
        fontWeight: 600,
        color: '#fff',
        cursor: 'pointer',
    },
    tableCard: {
        backgroundColor: '#fff',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        overflow: 'hidden',
    },
    tableToolbar: {
        padding: '20px',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    searchBox: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 16px',
        backgroundColor: '#f8fafc',
        border: '1px solid #cbd5e1',
        borderRadius: '8px',
        width: '320px',
    },
    searchInput: {
        border: 'none',
        backgroundColor: 'transparent',
        outline: 'none',
        fontSize: '15px',
        width: '100%',
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        textAlign: 'left',
    },
    th: {
        padding: '16px 20px',
        backgroundColor: '#f8fafc',
        color: '#64748b',
        fontSize: '14px',
        fontWeight: 600,
        borderBottom: '1px solid #e2e8f0',
    },
    tr: {
        borderBottom: '1px solid #e2e8f0',
        transition: 'background-color 0.2s',
        ':hover': {
            backgroundColor: '#f8fafc',
        }
    },
    td: {
        padding: '20px',
        fontSize: '15px',
        color: '#334155',
        verticalAlign: 'middle',
    },
    typeLabel: {
        color: '#475569',
        fontSize: '14px',
    },
    statusBadge: {
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '13px',
        fontWeight: 600,
        display: 'inline-block',
    },
    detailBtn: {
        padding: '8px 16px',
        backgroundColor: 'transparent',
        border: '1px solid #cbd5e1',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: 500,
        color: '#1e293b',
        cursor: 'pointer',
        transition: 'all 0.2s',
    },
    emptyState: {
        padding: '60px',
        textAlign: 'center',
        color: '#94a3b8',
        fontSize: '16px',
    }
};

export default AdminReports;
