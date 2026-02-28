import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../../supabaseClient';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setIsLoading(true);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) {
                console.error('Login error:', error.message);
                if (error.message.includes('Invalid login credentials')) {
                    setErrorMsg('이메일 또는 비밀번호가 올바르지 않습니다.');
                } else {
                    setErrorMsg('로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
                }
                return;
            }

            if (data.session) {
                // Login successful
                navigate('/ty-manage-desk');
            }
        } catch (err) {
            console.error('Unexpected login error:', err);
            setErrorMsg('서버와 통신하는 중 문제가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.loginBox}>
                <div style={styles.header}>
                    <Shield size={48} color="var(--color-primary)" style={{ marginBottom: '16px' }} />
                    <h1 style={styles.title}>관리자 로그인</h1>
                    <p style={styles.subtitle}>TY Lawyers Guardian 시스템 관리자 전용</p>
                </div>

                {errorMsg && (
                    <div style={styles.errorBox}>
                        <Lock size={16} />
                        <span>{errorMsg}</span>
                    </div>
                )}

                <form onSubmit={handleLogin} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>이메일</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                            placeholder="admin@example.com"
                            required
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>비밀번호</label>
                        <div style={styles.passwordWrapper}>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={styles.passwordInput}
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={styles.eyeButton}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        style={{ ...styles.submitBtn, opacity: isLoading ? 0.7 : 1 }}
                        disabled={isLoading}
                    >
                        {isLoading ? '로그인 중...' : '접속하기'}
                    </button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f1f5f9', // Light slate background
        padding: '20px',
    },
    loginBox: {
        backgroundColor: '#fff',
        borderRadius: '16px',
        padding: '48px 40px',
        width: '100%',
        maxWidth: '480px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    },
    header: {
        textAlign: 'center',
        marginBottom: '40px',
    },
    title: {
        fontSize: '28px',
        fontWeight: 800,
        color: '#1e293b',
        margin: '0 0 8px 0',
    },
    subtitle: {
        fontSize: '15px',
        color: '#64748b',
        margin: 0,
    },
    errorBox: {
        backgroundColor: '#fef2f2',
        border: '1px solid #fecaca',
        color: '#ef4444',
        padding: '12px 16px',
        borderRadius: '8px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '15px',
        fontWeight: 500,
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
        fontSize: '15px',
        fontWeight: 600,
        color: '#334155',
    },
    input: {
        padding: '14px 16px',
        borderRadius: '8px',
        border: '1px solid #cbd5e1',
        fontSize: '16px',
        outline: 'none',
        transition: 'border-color 0.2s',
        backgroundColor: '#f8fafc',
    },
    passwordWrapper: {
        position: 'relative',
        display: 'flex',
    },
    passwordInput: {
        flex: 1,
        padding: '14px 48px 14px 16px',
        borderRadius: '8px',
        border: '1px solid #cbd5e1',
        fontSize: '16px',
        outline: 'none',
        transition: 'border-color 0.2s',
        backgroundColor: '#f8fafc',
    },
    eyeButton: {
        position: 'absolute',
        right: '4px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'none',
        border: 'none',
        color: '#94a3b8',
        cursor: 'pointer',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitBtn: {
        backgroundColor: '#1E3A8A', // Brand primary Blue
        color: '#fff',
        padding: '16px',
        borderRadius: '8px',
        fontSize: '18px',
        fontWeight: 700,
        border: 'none',
        cursor: 'pointer',
        marginTop: '8px',
        transition: 'background-color 0.2s',
    },
};

export default AdminLogin;
