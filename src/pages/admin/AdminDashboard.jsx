import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        newReports: 0,
        reviewingReports: 0,
        newInquiries: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch new reports count
                const { count: newReportsCount } = await supabase
                    .from('reports')
                    .select('*', { count: 'exact', head: true })
                    .eq('status', 'RECEIVED');

                // Fetch reviewing reports count
                const { count: reviewingCount } = await supabase
                    .from('reports')
                    .select('*', { count: 'exact', head: true })
                    .in('status', ['REVIEWING', 'INVESTIGATING']);

                // Fetch new inquiries count
                const { count: newInquiriesCount } = await supabase
                    .from('inquiries')
                    .select('*', { count: 'exact', head: true })
                    .eq('status', 'UNREAD');

                setStats({
                    newReports: newReportsCount || 0,
                    reviewingReports: reviewingCount || 0,
                    newInquiries: newInquiriesCount || 0
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

            <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                    <h3 style={styles.cardTitle}>신규 접수</h3>
                    <p style={styles.cardNumber}>{stats.newReports}</p>
                </div>
                <div style={styles.statCard}>
                    <h3 style={styles.cardTitle}>검토 및 조사 중</h3>
                    <p style={styles.cardNumber}>{stats.reviewingReports}</p>
                </div>
                <div style={styles.statCard}>
                    <h3 style={styles.cardTitle}>신규 문의</h3>
                    <p style={styles.cardNumber}>{stats.newInquiries}</p>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '40px',
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
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px',
    },
    statCard: {
        backgroundColor: '#fff',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0',
    },
    cardTitle: {
        fontSize: '15px',
        color: '#64748b',
        fontWeight: 600,
        margin: '0 0 12px 0',
    },
    cardNumber: {
        fontSize: '36px',
        fontWeight: 700,
        color: '#1e3a8a',
        margin: 0,
    }
};

export default AdminDashboard;
