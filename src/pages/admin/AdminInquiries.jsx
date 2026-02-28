import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { Search, ChevronDown, ChevronUp, CheckCircle, Clock } from 'lucide-react';

const AdminInquiries = () => {
    const [inquiries, setInquiries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('inquiries')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setInquiries(data || []);
        } catch (error) {
            console.error('Error fetching inquiries:', error.message);
            alert('문의 내역을 불러오는데 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    const toggleStatus = async (id, currentStatus, event) => {
        event.stopPropagation(); // Prevent accordion from toggling
        const newStatus = currentStatus === 'UNREAD' ? 'READ' : 'UNREAD';

        try {
            const { error } = await supabase
                .from('inquiries')
                .update({ status: newStatus })
                .eq('id', id);

            if (error) throw error;

            // Update local state without re-fetching everything
            setInquiries(inquiries.map(inq =>
                inq.id === id ? { ...inq, status: newStatus } : inq
            ));
        } catch (error) {
            console.error('Error updating status:', error.message);
            alert('상태 변경에 실패했습니다.');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>도입 문의 관리</h1>
                    <p style={styles.subtitle}>새롭게 접수된 서비스 도입 문의를 확인하고 연락을 진행합니다.</p>
                </div>
            </div>

            <div style={styles.listCard}>
                <div style={styles.toolbar}>
                    <div style={styles.searchBox}>
                        <Search size={18} color="#94a3b8" />
                        <input type="text" placeholder="고객사명, 담당자 이름 검색..." style={styles.searchInput} />
                    </div>
                </div>

                <div style={styles.inquiryList}>
                    {isLoading ? (
                        <div style={styles.emptyState}>데이터를 불러오는 중입니다...</div>
                    ) : inquiries.length === 0 ? (
                        <div style={styles.emptyState}>접수된 문의 내역이 없습니다.</div>
                    ) : (
                        inquiries.map((inquiry) => (
                            <div
                                key={inquiry.id}
                                style={{
                                    ...styles.inquiryItem,
                                    borderColor: expandedId === inquiry.id ? '#3b82f6' : '#e2e8f0',
                                    backgroundColor: inquiry.status === 'UNREAD' ? '#fff' : '#f8fafc'
                                }}
                            >
                                {/* Item Header (Clickable for accordion) */}
                                <div
                                    style={styles.itemHeader}
                                    onClick={() => setExpandedId(expandedId === inquiry.id ? null : inquiry.id)}
                                >
                                    <div style={styles.itemInfo}>
                                        <div style={styles.primaryInfo}>
                                            {inquiry.status === 'UNREAD' && <span style={styles.newDot}></span>}
                                            <span style={styles.companyName}>{inquiry.company_name}</span>
                                            <span style={styles.contactName}>{inquiry.contact_name} ({inquiry.department})</span>
                                        </div>
                                        <div style={styles.secondaryInfo}>
                                            <span style={styles.date}>{new Date(inquiry.created_at).toLocaleString('ko-KR')}</span>
                                        </div>
                                    </div>

                                    <div style={styles.itemActions}>
                                        <button
                                            style={{
                                                ...styles.statusBtn,
                                                backgroundColor: inquiry.status === 'UNREAD' ? '#fff' : '#f0fdf4',
                                                color: inquiry.status === 'UNREAD' ? '#64748b' : '#16a34a',
                                                border: inquiry.status === 'UNREAD' ? '1px solid #cbd5e1' : '1px solid #bbf7d0',
                                            }}
                                            onClick={(e) => toggleStatus(inquiry.id, inquiry.status, e)}
                                        >
                                            {inquiry.status === 'UNREAD' ? (
                                                <><Clock size={16} /> 확인 대기</>
                                            ) : (
                                                <><CheckCircle size={16} /> 확인 완료</>
                                            )}
                                        </button>
                                        <div style={styles.expandIcon}>
                                            {expandedId === inquiry.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded Content */}
                                {expandedId === inquiry.id && (
                                    <div style={styles.contentArea}>
                                        <div style={styles.contactDetails}>
                                            <div style={styles.contactItem}>
                                                <span style={styles.contactLabel}>연락처</span>
                                                <span style={styles.contactValue}>{inquiry.phone}</span>
                                            </div>
                                            <div style={styles.contactItem}>
                                                <span style={styles.contactLabel}>이메일</span>
                                                <span style={styles.contactValue}>{inquiry.email}</span>
                                            </div>
                                        </div>
                                        <div style={styles.messageBox}>
                                            <span style={styles.messageLabel}>문의 내용</span>
                                            <p style={styles.messageText}>{inquiry.content}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '40px',
        maxWidth: '1000px',
        margin: '0 auto',
        width: '100%',
    },
    header: {
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
    listCard: {
        backgroundColor: '#fff',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        overflow: 'hidden',
    },
    toolbar: {
        padding: '20px',
        borderBottom: '1px solid #e2e8f0',
        backgroundColor: '#f8fafc',
    },
    searchBox: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 16px',
        backgroundColor: '#fff',
        border: '1px solid #cbd5e1',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '400px',
    },
    searchInput: {
        border: 'none',
        backgroundColor: 'transparent',
        outline: 'none',
        fontSize: '15px',
        width: '100%',
    },
    inquiryList: {
        display: 'flex',
        flexDirection: 'column',
    },
    inquiryItem: {
        borderBottom: '1px solid #e2e8f0',
        transition: 'all 0.2s',
        borderLeft: '4px solid transparent', // For active state
        ':last-child': {
            borderBottom: 'none'
        }
    },
    itemHeader: {
        padding: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
    },
    itemInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    primaryInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    newDot: {
        width: '8px',
        height: '8px',
        backgroundColor: '#ef4444',
        borderRadius: '50%',
    },
    companyName: {
        fontSize: '18px',
        fontWeight: 700,
        color: '#1e293b',
    },
    contactName: {
        fontSize: '15px',
        color: '#64748b',
        fontWeight: 500,
    },
    secondaryInfo: {
        paddingLeft: '20px', // Align with text if dot exists
    },
    date: {
        fontSize: '14px',
        color: '#94a3b8',
    },
    itemActions: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
    },
    statusBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 16px',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s',
    },
    expandIcon: {
        color: '#94a3b8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        backgroundColor: '#f1f5f9',
    },
    contentArea: {
        padding: '0 24px 32px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
    },
    contactDetails: {
        display: 'flex',
        gap: '48px',
        padding: '20px',
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
    },
    contactItem: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    contactLabel: {
        fontSize: '13px',
        color: '#64748b',
        fontWeight: 600,
    },
    contactValue: {
        fontSize: '16px',
        color: '#1e293b',
        fontWeight: 500,
    },
    messageBox: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    messageLabel: {
        fontSize: '15px',
        fontWeight: 600,
        color: '#334155',
    },
    messageText: {
        fontSize: '16px',
        lineHeight: 1.6,
        color: '#334155',
        margin: 0,
        whiteSpace: 'pre-wrap',
        backgroundColor: '#fff',
        padding: '24px',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
    },
    emptyState: {
        padding: '60px',
        textAlign: 'center',
        color: '#94a3b8',
        fontSize: '16px',
    }
};

export default AdminInquiries;
