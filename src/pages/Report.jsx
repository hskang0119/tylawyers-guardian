import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Shield, Upload, AlertCircle, CheckCircle2, AlertTriangle, ChevronDown, ChevronUp, ChevronRight, Search } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css'; // Implements standard Quill theme
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import { supabase } from '../supabaseClient';

const Report = () => {
    const [reportType, setReportType] = useState('성희롱 / 성폭력'); // 성희롱, 괴롭힘, 기타
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [ticketNumber, setTicketNumber] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Define mock partner list for autocomplete functionality
    const PARTNER_LIST = [
        '서울주택도시공사',
        '서울주택도시복지공사',
        '테스트 컴퍼니 주식회사',
        'TY 파트너스 그룹',
        '한국도로공사',
        '한국전력공사',
        '삼성디스플레이',
        'LG전자',
        '현대자동차',
        '기아자동차'
    ];

    // Partner verification states
    const [isVerified, setIsVerified] = useState(false);
    const [partnerName, setPartnerName] = useState(''); // Store verified partner name

    // Step 2 state
    const [step2Consent, setStep2Consent] = useState(false);

    // Autocomplete search states
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [focusedSuggestionIndex, setFocusedSuggestionIndex] = useState(-1);

    // Initialize state from Home page navigation
    useEffect(() => {
        if (location.state?.initialPartner) {
            const query = location.state.initialPartner;

            // If it's an exact match from Home autocomplete, move to step 2 automatically
            if (PARTNER_LIST.includes(query)) {
                handlePartnerSelect(query);
            } else {
                // Otherwise, populate the search box and show suggestions
                setSearchTerm(query);
                const filtered = PARTNER_LIST.filter(p => p.toLowerCase().includes(query.toLowerCase()));
                setSuggestions(filtered);
                if (filtered.length > 0) {
                    setShowSuggestions(true);
                }
            }
        }
    }, [location.state]);

    // Form states (in a real app, use a library like react-hook-form)
    const [formData, setFormData] = useState({
        targetName: '',
        targetEmail: '',
        targetPhone: '',
        title: '',
        content: '',
        password: '',
        passwordConfirm: '',
        agreeCollection: null, // "yes" or "no"
        agreeProvision: null // "yes" or "no"
    });

    // Accordion state for consent forms
    const [expandedCollection, setExpandedCollection] = useState(false);
    const [expandedProvision, setExpandedProvision] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Auto-collapse when user agrees
        if (name === 'agreeCollection' && value === 'yes') {
            setExpandedCollection(false);
        }
        if (name === 'agreeProvision' && value === 'yes') {
            setExpandedProvision(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;

        // Validation for required fields
        if (!formData.title || !formData.content || formData.content === '<p><br></p>') {
            alert('필수 입력 항목(제목, 내용)을 모두 확인해주세요.');
            return;
        }

        if (formData.agreeCollection !== 'yes') {
            alert('개인정보 수집 및 이용에 동의해야 신고가 가능합니다.');
            return;
        }

        if (formData.agreeProvision !== 'yes') {
            alert('개인정보 제3자 제공에 동의해야 신고가 가능합니다.');
            return;
        }
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()[\]_\-+=~`|\\:;"'<>,.?/{}]).{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            alert('비밀번호는 영문, 숫자, 특수문자를 모두 포함하여 8자 이상이어야 합니다.');
            return;
        }

        if (formData.password !== formData.passwordConfirm) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        setIsSubmitting(true);

        try {
            // Generate dynamic ticket number: TY-YYYY-XXXX
            const currentYear = new Date().getFullYear();
            const randomSuffix = Math.floor(1000 + Math.random() * 9000);
            const generatedTicket = `TY-${currentYear}-${randomSuffix}`;
            setTicketNumber(generatedTicket);

            // Supabase Insert
            const { data, error } = await supabase
                .from('reports')
                .insert([
                    {
                        ticket_number: generatedTicket,
                        partner_name: partnerName,
                        reporter_name: formData.targetName || null,
                        reporter_phone: formData.targetPhone || null,
                        reporter_email: formData.targetEmail || null,
                        report_type: reportType,
                        title: formData.title,
                        content: formData.content,
                        password_hash: formData.password, // IMPORTANT: In a real prod app, hash this before sending or via Edge Function
                    }
                ]);

            if (error) {
                console.error('Supabase insert error:', error);
                alert('신고 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
                setIsSubmitting(false);
                return;
            }

            // Success
            setCurrentStep(4);
            window.scrollTo(0, 0);

        } catch (err) {
            console.error('Unexpected error during submission:', err);
            alert('요청을 처리하는 중 문제가 발생했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchTerm(query);
        setFocusedSuggestionIndex(-1);
        if (query.length > 0) {
            const filtered = PARTNER_LIST.filter(p => p.toLowerCase().includes(query.toLowerCase()));
            setSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handlePartnerSelect = (partner) => {
        setPartnerName(partner);
        setSearchTerm(partner); // Keep the selected name visible
        setShowSuggestions(false);
    };

    const handleNextStep = () => {
        if (currentStep === 1) {
            if (!searchTerm) {
                alert('고객사(기관)명을 입력해주세요.');
                return;
            }
            if (!PARTNER_LIST.includes(searchTerm)) {
                alert('등록되지 않은 고객사(기관)입니다. 정확한 이름을 선택해주세요.');
                return;
            }
            if (!step2Consent) {
                alert('유의사항을 확인하고 안내에 동의해 주세요.');
                return;
            }
            setPartnerName(searchTerm);
        }

        setCurrentStep(prev => Math.min(prev + 1, 4));
        window.scrollTo(0, 0); // Scroll to top on step change
    };

    const handlePrevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
        window.scrollTo(0, 0);
    };

    if (currentStep === 4) {
        // Step 4 is handled within the main render now
    }

    return (
        <>
            <div style={styles.container}>
                <Hero title="신고하기" breadcrumb="신고하기" />
                <div className="container" style={styles.contentWrapper}>

                    {/* Progress Stepper - Redesigned */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '48px', width: '100%', maxWidth: '960px', margin: '0 auto 48px auto' }}>
                        {[
                            { step: 1, label: '고객사 선택' },
                            { step: 2, label: '개인정보 수집 · 이용 동의' },
                            { step: 3, label: '신고서 작성' },
                            { step: 4, label: '접수 완료' }
                        ].map((s, idx) => {
                            const isCurrent = currentStep === s.step;
                            // The reference image treats inactive steps identically (solid gray background, no border)
                            const isActive = isCurrent;

                            return (
                                <div key={s.step} style={{ display: 'flex', alignItems: 'flex-start', flex: idx < 3 ? 1 : 'none' }}>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        width: '180px',
                                    }}>
                                        {/* Circle Container */}
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '110px',
                                            height: '110px',
                                            borderRadius: '50%',
                                            backgroundColor: isActive ? 'var(--color-primary)' : '#ffffff', // Solid navy for active
                                            border: isActive ? '2px solid var(--color-primary)' : '1px solid #e2e8f0', // Bold border for active
                                            transition: 'all 0.3s ease',
                                            flexShrink: 0,
                                            marginBottom: '16px',
                                            boxShadow: isActive ? '0 4px 6px -1px rgba(15, 44, 89, 0.2)' : 'none' // Add subtle shadow when active
                                        }}>
                                            <span style={{
                                                fontSize: '18px',
                                                fontWeight: 800,
                                                color: isActive ? '#ffffff' : '#475569', // White text when active
                                                letterSpacing: '0.5px'
                                            }}>
                                                STEP {s.step}
                                            </span>
                                        </div>

                                        {/* Label Container (Outside Circle) */}
                                        <span style={{
                                            fontSize: '17px',
                                            fontWeight: isActive ? 800 : 500, // Very bold when active
                                            color: isActive ? 'var(--color-primary)' : '#64748b', // Navy text when active
                                            textAlign: 'center',
                                            wordBreak: 'keep-all',
                                            padding: '0 4px',
                                            lineHeight: '1.4'
                                        }}>
                                            {s.label}
                                        </span>
                                    </div>

                                    {idx < 3 && (
                                        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', marginTop: '41px' }}>
                                            <ChevronRight size={28} color="#cbd5e1" strokeWidth={1.5} />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {currentStep === 1 && (
                        <div style={styles.verifyContainer}>
                            <div style={{ width: '100%', maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <h2 style={{ ...styles.cardTitle, color: '#1e293b', fontSize: '26px', fontWeight: 'bold' }}>1단계 : 고객사(기관) 선택</h2>
                                <div style={styles.verifyBox}>
                                    <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }} style={{ ...styles.searchForm, marginBottom: 0 }}>
                                        <div style={styles.searchInputWrapper}>
                                            <input
                                                type="text"
                                                value={searchTerm}
                                                onChange={handleSearchChange}
                                                onFocus={() => { if (searchTerm.length > 0) setShowSuggestions(true); }}
                                                onBlur={() => {
                                                    setTimeout(() => {
                                                        setShowSuggestions(false);
                                                        setFocusedSuggestionIndex(-1);
                                                    }, 200);
                                                }}
                                                onKeyDown={(e) => {
                                                    if (!showSuggestions || suggestions.length === 0) return;

                                                    if (e.key === 'ArrowDown') {
                                                        e.preventDefault();
                                                        setFocusedSuggestionIndex(prev => Math.min(prev + 1, suggestions.length - 1));
                                                    } else if (e.key === 'ArrowUp') {
                                                        e.preventDefault();
                                                        setFocusedSuggestionIndex(prev => Math.max(prev - 1, 0));
                                                    } else if (e.key === 'Enter') {
                                                        if (focusedSuggestionIndex >= 0 && focusedSuggestionIndex < suggestions.length) {
                                                            e.preventDefault();
                                                            handlePartnerSelect(suggestions[focusedSuggestionIndex]);
                                                        }
                                                    } else if (e.key === 'Escape') {
                                                        setShowSuggestions(false);
                                                        setFocusedSuggestionIndex(-1);
                                                    }
                                                }}
                                                placeholder="고객사(기관)명 입력"
                                                style={styles.pillInput}
                                            />
                                            {showSuggestions && suggestions.length > 0 && (
                                                <ul style={{
                                                    position: 'absolute',
                                                    top: '100%',
                                                    left: 0,
                                                    width: '100%',
                                                    backgroundColor: 'var(--color-white)',
                                                    border: '1px solid var(--color-border)',
                                                    borderTop: 'none',
                                                    borderRadius: '0 0 var(--radius-md) var(--radius-md)',
                                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                                    listStyle: 'none',
                                                    padding: 0,
                                                    margin: 0,
                                                    maxHeight: '250px',
                                                    overflowY: 'auto',
                                                    zIndex: 10,
                                                    textAlign: 'left'
                                                }}>
                                                    {suggestions.map((partner, index) => (
                                                        <li
                                                            key={index}
                                                            style={{
                                                                padding: '16px 24px',
                                                                cursor: 'pointer',
                                                                color: 'var(--color-text-main)',
                                                                backgroundColor: index === focusedSuggestionIndex ? '#e2e8f0' : 'transparent',
                                                                fontSize: '18px',
                                                                fontWeight: 500,
                                                                transition: 'background-color 0.2s'
                                                            }}
                                                            onMouseDown={() => handlePartnerSelect(partner)}
                                                            onMouseEnter={() => setFocusedSuggestionIndex(index)}
                                                            onMouseLeave={() => setFocusedSuggestionIndex(-1)}
                                                        >
                                                            {partner}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                            {showSuggestions && suggestions.length === 0 && searchTerm.length > 0 && (
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '100%',
                                                    left: 0,
                                                    width: '100%',
                                                    backgroundColor: 'var(--color-white)',
                                                    border: '1px solid var(--color-border)',
                                                    borderRadius: '24px',
                                                    marginTop: '12px',
                                                    padding: '20px 24px',
                                                    color: 'var(--color-text-muted)',
                                                    fontSize: '17px',
                                                    zIndex: 10,
                                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                                }}>
                                                    검색 결과가 없습니다.
                                                </div>
                                            )}
                                        </div>
                                    </form>
                                </div>
                                <ul style={{ ...styles.cardInfoList, color: '#475569', marginTop: '24px', paddingLeft: '12px', boxSizing: 'border-box' }}>
                                    <li style={styles.cardInfoListItem}>
                                        <span style={{ position: 'absolute', left: 0, top: 0, fontWeight: 'bold' }}>&middot;</span>
                                        고객사(기관)의 통제 범위 내에 있거나 업무관련성이 있는 영역에서의 인권침해 행위를 대상으로 합니다.
                                    </li>
                                    <li style={styles.cardInfoListItem}>
                                        <span style={{ position: 'absolute', left: 0, top: 0, fontWeight: 'bold' }}>&middot;</span>
                                        고객사(기관)을 입력해 주세요.
                                    </li>
                                </ul>

                                {/* Guidelines Section (Merged from Step 3) */}
                                <div style={{ ...styles.guidelineSection, width: '100%', marginTop: '32px' }}>
                                    <h3 style={styles.guidelineTitle}>
                                        <AlertTriangle size={20} color="#b91c1c" />
                                        신고서 작성 유의사항
                                    </h3>
                                    <ul className="guideline-list" style={styles.guidelineList}>
                                        <li>익명신고의 경우 제목·내용·첨부문서 등에 신고자의 신분이 노출되지 않도록 주의하시기 바랍니다.</li>
                                        <li>신고대상이 아니거나 인권침해에 해당하지 않음이 명백한 경우 각하될 수 있습니다.</li>
                                        <li>허위사실이나 비방, 음해 등의 내용은 민·형사상 책임의 대상이 될 수 있습니다.</li>
                                        <li>신고 내용은 가능한 자세히 작성할수록 보다 실질적이고 구체적인 사건 조사가 가능합니다.</li>
                                        <li>신고내용이 불명확하거나 사실확인이 필요한 경우 신고자에 대한 조사가 실시될 수 있습니다.</li>
                                        <li>익명신고의 경우 신고자 조사가 어려워 사전조사 단계에서 사건이 기각될 수 있으므로, 신고내용을 구체적이고 상세하게 작성하여 주셔야 합니다.</li>
                                        <li>별도로 연락이 가능한 연락처가 기재되지 않는 경우 신고 처리 현황 및 결과 통지는 인권상담신고센터 홈페이지를 통해서만 확인이 가능합니다.</li>
                                        <li>인권상담센터를 통한 진행상황조회는 신고접수시 배정된 접수번호와 입력한 비밀번호를 통해서만 확인이 가능합니다.</li>
                                        <li>접수번호·비밀번호는 재발행되지 않으니 분실하지 않도록 잘 관리하시기 바랍니다.</li>
                                    </ul>
                                </div>
                                <div style={{
                                    width: '100%',
                                    padding: '20px',
                                    backgroundColor: '#f8fafc',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    marginTop: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '12px'
                                }}>
                                    <input
                                        type="checkbox"
                                        id="step2-consent-yes"
                                        name="step2-consent"
                                        checked={step2Consent}
                                        onChange={(e) => setStep2Consent(e.target.checked)}
                                        style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#1e3a8a' }}
                                    />
                                    <label htmlFor="step2-consent-yes" style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b', cursor: 'pointer' }}>
                                        유의사항을 확인했습니다.
                                    </label>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', gap: '16px', width: '100%' }}>
                                    <button
                                        onClick={handleNextStep}
                                        style={{
                                            ...styles.submitButton,
                                            width: '200px',
                                            padding: '16px 32px',
                                            backgroundColor: step2Consent && searchTerm && PARTNER_LIST.includes(searchTerm) ? '#1e3a8a' : '#9ca3af',
                                            cursor: step2Consent && searchTerm && PARTNER_LIST.includes(searchTerm) ? 'pointer' : 'not-allowed'
                                        }}
                                    >
                                        다음 단계로
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {currentStep === 3 && (
                        <div style={{ ...styles.formContainerWrapper, maxWidth: '960px' }}>
                            <h2 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '16px', color: 'var(--color-text-main)', textAlign: 'center' }}>
                                3단계 : 신고서 작성
                            </h2>
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <div style={styles.formContainer}>

                                    <div style={styles.form}>
                                        {/* Section 1: Target Info */}
                                        <div style={styles.formSection}>
                                            <div style={styles.inputGrid}>
                                                {/* Merged Partner Name into Section Header */}
                                                <div style={{ ...styles.inputGroup, gridColumn: '1 / -1' }}>
                                                    <SectionBoxHeader title="고객사(기관)" required>
                                                        <span style={{ marginLeft: '16px', fontSize: '20px', fontWeight: 500, color: '#475569' }}>
                                                            {partnerName}
                                                        </span>
                                                    </SectionBoxHeader>
                                                </div>

                                                {/* Add Personal Info Section Title */}
                                                <div style={{ gridColumn: '1 / -1', marginTop: '16px' }}>
                                                    <SectionBoxHeader title="인적사항" />
                                                </div>
                                                <div style={{ display: 'flex', gap: '16px', gridColumn: '1 / -1' }}>
                                                    <input
                                                        type="text"
                                                        name="targetName"
                                                        value={formData.targetName}
                                                        onChange={handleInputChange}
                                                        style={{ ...styles.input, textAlign: 'center', flex: 1 }}
                                                        placeholder="이름"
                                                    />
                                                    <input
                                                        type="tel"
                                                        name="targetPhone"
                                                        value={formData.targetPhone}
                                                        onChange={handleInputChange}
                                                        style={{ ...styles.input, textAlign: 'center', flex: 1 }}
                                                        placeholder="휴대전화 번호 (ex. 010-1234-1234)"
                                                    />
                                                    <input
                                                        type="email"
                                                        name="targetEmail"
                                                        value={formData.targetEmail}
                                                        onChange={handleInputChange}
                                                        style={{ ...styles.input, textAlign: 'center', flex: 1 }}
                                                        placeholder="이메일 (ex. abc@naver.com)"
                                                    />
                                                </div>
                                                <div style={{ gridColumn: '1 / -1', marginTop: '-12px' }}>
                                                    <p style={{ fontSize: '15px', color: '#ef4444' }}>
                                                        * 익명 신고 시 기재하지 않을 수 있습니다.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Section 2: Incident Details */}
                                        <div style={styles.formSection}>
                                            <div style={{ ...styles.inputGroup, marginTop: '12px', gridColumn: '1 / -1' }}>
                                                <SectionBoxHeader title="신고유형" required />
                                                <div style={{ display: 'flex', gap: '20px', marginTop: '4px', flexWrap: 'wrap' }}>
                                                    <label className="hover-radio-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', cursor: 'pointer', fontSize: '18px', fontWeight: 600, color: reportType === '성희롱 / 성폭력' ? 'var(--color-primary)' : '#475569', backgroundColor: reportType === '성희롱 / 성폭력' ? '#eff6ff' : '#f8fafc', border: reportType === '성희롱 / 성폭력' ? '2px solid var(--color-primary)' : '1px solid #cbd5e1', borderRadius: '8px', padding: '16px 0', flex: 1, transition: 'all 0.2s' }}>
                                                        <input type="radio" name="reportType" value="성희롱 / 성폭력" checked={reportType === '성희롱 / 성폭력'} onChange={(e) => setReportType(e.target.value)} style={{ width: '22px', height: '22px', accentColor: 'var(--color-primary)' }} /> 성희롱/성폭력
                                                    </label>
                                                    <label className="hover-radio-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', cursor: 'pointer', fontSize: '18px', fontWeight: 600, color: reportType === '직장내 괴롭힘' ? 'var(--color-primary)' : '#475569', backgroundColor: reportType === '직장내 괴롭힘' ? '#eff6ff' : '#f8fafc', border: reportType === '직장내 괴롭힘' ? '2px solid var(--color-primary)' : '1px solid #cbd5e1', borderRadius: '8px', padding: '16px 0', flex: 1, transition: 'all 0.2s' }}>
                                                        <input type="radio" name="reportType" value="직장내 괴롭힘" checked={reportType === '직장내 괴롭힘'} onChange={(e) => setReportType(e.target.value)} style={{ width: '22px', height: '22px', accentColor: 'var(--color-primary)' }} /> 직장내 괴롭힘
                                                    </label>
                                                    <label className="hover-radio-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', cursor: 'pointer', fontSize: '18px', fontWeight: 600, color: reportType === '기타 인권침해' ? 'var(--color-primary)' : '#475569', backgroundColor: reportType === '기타 인권침해' ? '#eff6ff' : '#f8fafc', border: reportType === '기타 인권침해' ? '2px solid var(--color-primary)' : '1px solid #cbd5e1', borderRadius: '8px', padding: '16px 0', flex: 1, transition: 'all 0.2s' }}>
                                                        <input type="radio" name="reportType" value="기타 인권침해" checked={reportType === '기타 인권침해'} onChange={(e) => setReportType(e.target.value)} style={{ width: '22px', height: '22px', accentColor: 'var(--color-primary)' }} /> 기타 인권침해
                                                    </label>
                                                </div>
                                            </div>

                                            <div style={{ ...styles.inputGroup, marginTop: '20px' }}>
                                                <SectionBoxHeader title="제목" required />
                                                <input
                                                    type="text"
                                                    name="title"
                                                    value={formData.title}
                                                    onChange={handleInputChange}
                                                    style={styles.input}
                                                    placeholder="신고 내용을 요약할 수 있는 제목"
                                                    required
                                                />
                                            </div>

                                            <div style={{ ...styles.inputGroup, marginTop: '20px' }}>
                                                <SectionBoxHeader title="신고내용" required />
                                                <div style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', overflow: 'hidden', marginTop: '4px' }}>
                                                    <ReactQuill
                                                        theme="snow"
                                                        value={formData.content}
                                                        onChange={(content) => setFormData({ ...formData, content })}
                                                        placeholder="언제, 어디서, 누가, 어떻게 등 구체적인 사실 관계를 바탕으로 작성해 주세요."
                                                        style={{ height: '300px', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' }}
                                                    />
                                                </div>
                                                {/* Padding to account for the absolute positioning of the Quill editor content box if necessary, usually resolved by div wrapping. Added 50px bottom margin padding to account for toolbar overhead. */}
                                                <div style={{ height: '50px' }}></div>
                                            </div>
                                        </div>

                                        {/* Section 3: Evidence */}
                                        <div style={styles.formSection}>
                                            <SectionBoxHeader title="자료첨부" />
                                            <p style={{ fontSize: '16px', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                                                문서, 사진, 녹취 파일 등 사건을 파악할 수 있는 자료를 첨부해 주세요. (최대 50MB)
                                            </p>
                                            <div style={styles.fileUploadBox}>
                                                <Upload size={24} color="var(--color-text-light)" style={{ marginBottom: '8px' }} />
                                                <span style={{ color: 'var(--color-text-main)', fontWeight: 500 }}>클릭하여 파일 선택</span>
                                                <span style={{ color: 'var(--color-text-light)', fontSize: '15px', marginTop: '4px' }}>또는 이곳으로 파일을 드래그 하세요</span>
                                                <input type="file" multiple style={styles.hiddenFileInput} />
                                            </div>
                                        </div>

                                        {/* Section 4: Security */}
                                        <div style={{ ...styles.formSection, backgroundColor: '#fef2f2', padding: '32px 40px', border: '1px solid #fecaca', borderLeft: '4px solid #ef4444', boxShadow: 'none' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                                                <Shield size={24} color="#ef4444" />
                                                <h3 style={{ fontSize: '22px', fontWeight: 800, margin: 0, color: '#b91c1c' }}>진행상황조회용 비밀번호 설정</h3>
                                            </div>
                                            <p style={{ fontSize: '17px', color: '#7f1d1d', marginBottom: '24px', lineHeight: 1.6 }}>
                                                추후 진행 상황 및 변호사 답변을 확인하기 위해 사용할 비밀번호입니다.
                                                <strong style={{ color: '#ef4444', fontWeight: 800 }}> 분실 시 찾을 수 없으므로 반드시 기억해 주세요.</strong>
                                            </p>

                                            <div style={styles.inputGrid}>
                                                <div style={styles.inputGroup}>
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        value={formData.password}
                                                        onChange={handleInputChange}
                                                        style={{ ...styles.input, backgroundColor: 'var(--color-white)' }}
                                                        placeholder="비밀번호 (영문, 숫자, 특수문자 포함 8자 이상)"
                                                        required
                                                    />
                                                </div>
                                                <div style={styles.inputGroup}>
                                                    <input
                                                        type="password"
                                                        name="passwordConfirm"
                                                        value={formData.passwordConfirm}
                                                        onChange={handleInputChange}
                                                        style={{
                                                            ...styles.input,
                                                            backgroundColor: 'var(--color-white)',
                                                            borderColor: formData.passwordConfirm && formData.password !== formData.passwordConfirm ? '#ef4444' : 'var(--color-border)'
                                                        }}
                                                        placeholder="비밀번호 확인"
                                                        required
                                                    />
                                                    {formData.passwordConfirm && formData.password !== formData.passwordConfirm && (
                                                        <span style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>비밀번호가 일치하지 않습니다.</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px', marginBottom: '20px', gap: '16px' }}>
                                    <button type="button" onClick={handlePrevStep} style={{ ...styles.submitButton, backgroundColor: 'var(--color-bg-light)', color: 'var(--color-text-main)', width: 'auto', padding: '16px 32px', maxWidth: 'none' }}>
                                        이전
                                    </button>
                                    <button type="submit" style={{ ...styles.submitButton, width: 'auto', padding: '16px 32px', maxWidth: 'none' }} className="btn-hover-effect">
                                        신고서 최종 제출하기
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div style={{ ...styles.formContainerWrapper, maxWidth: '960px' }}>
                            <h2 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '16px', color: 'var(--color-text-main)', textAlign: 'center' }}>
                                2단계 : 개인정보 수집 · 이용 동의
                            </h2>
                            {/* Consent Sections */}
                            <div style={styles.consentContainer}>
                                {/* Collection Consent */}
                                <div style={styles.consentBox}>
                                    <div style={{ ...styles.consentHeader, cursor: 'default' }}>
                                        <h3 style={styles.consentTitle}>[개인정보 수집 · 이용 동의서]</h3>
                                    </div>
                                    <div style={styles.consentBody}>
                                        <p style={styles.consentIntro}>법무법인 티와이로이어스는 온라인 내부 신고 시스템 운영을 위해 다음과 같이 개인정보를 수집하고 있습니다.</p>

                                        <div style={styles.consentInnerBox}>
                                            <div style={styles.consentItem}>
                                                <div style={styles.consentItemTitle}>수집하고자 하는 항목</div>
                                                <div style={styles.consentItemText}>성명, 전화번호, 이메일, 소속 부서</div>
                                            </div>
                                            <div style={styles.consentItem}>
                                                <div style={styles.consentItemTitle}>개인정보 수집 목적</div>
                                                <div style={styles.consentItemText}>
                                                    1. 신고사건의 접수 및 조사<br />
                                                    2. 신고인의 실명 공개 여부에 대한 의사 확인<br />
                                                    3. 사안에 따라 신고인에게 결과 통지를 할 목적<br />
                                                    4. 신고 및 조사 자료의 보존 및 관리
                                                </div>
                                            </div>
                                            <div style={styles.consentItem}>
                                                <div style={styles.consentItemTitle}>보유 및 이용기간</div>
                                                <div style={styles.consentItemText}>상담신고센터 운영대행용역 종료시까지</div>
                                            </div>
                                        </div>

                                        <ul style={styles.consentNoticeList}>
                                            <li>※ 위의 개인정보 수집에 대한 동의를 거부할 권리가 있습니다. 그러나 동의를 거부할 경우 신고 사건의 접수가 제한됩니다.</li>
                                            <li>※ 본 동의는 기재하신 개인정보에 한정된 것이며, 익명성은 본 동의와 별도로 당연히 보장됩니다.</li>
                                        </ul>
                                    </div>

                                    <div style={{ ...styles.radioGroupWrapper, borderTop: '1px dotted #d1d5db', paddingTop: '24px' }}>
                                        <span style={{ ...styles.radioQuestion, fontSize: '18px', fontWeight: 'bold' }}>위 개인정보 수집 이용에 동의하십니까? <span style={styles.required}>*</span></span>
                                        <div style={styles.radioOptions}>
                                            <label className="consent-radio-label" style={{ ...styles.radioLabel, backgroundColor: formData.agreeCollection === 'yes' ? '#eff6ff' : '#f8fafc', borderColor: formData.agreeCollection === 'yes' ? 'var(--color-primary)' : '#e2e8f0' }}>
                                                <input
                                                    type="radio"
                                                    name="agreeCollection"
                                                    value="yes"
                                                    checked={formData.agreeCollection === 'yes'}
                                                    onChange={handleInputChange}
                                                    style={styles.radioInput}
                                                />
                                                동의함
                                            </label>
                                            <label className="consent-radio-label" style={{ ...styles.radioLabel, backgroundColor: formData.agreeCollection === 'no' ? '#fef2f2' : '#f8fafc', borderColor: formData.agreeCollection === 'no' ? '#ef4444' : '#e2e8f0' }}>
                                                <input
                                                    type="radio"
                                                    name="agreeCollection"
                                                    value="no"
                                                    checked={formData.agreeCollection === 'no'}
                                                    onChange={handleInputChange}
                                                    style={styles.radioInput}
                                                />
                                                동의하지 않음
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Provision Consent */}
                                <div style={styles.consentBox}>
                                    <div style={{ ...styles.consentHeader, cursor: 'default' }}>
                                        <h3 style={styles.consentTitle}>[개인정보 제3자 제공에 관한 별도 동의서]</h3>
                                    </div>
                                    <div style={styles.consentBody}>
                                        <div style={styles.consentInnerBox}>
                                            <div style={styles.consentItem}>
                                                <div style={styles.consentItemTitle}>개인정보를 제공받는 제3자</div>
                                                <div style={styles.consentItemText}>
                                                    {partnerName || '해당 파트너사'}
                                                </div>
                                            </div>
                                            <div style={styles.consentItem}>
                                                <div style={styles.consentItemTitle}>제3자의 개인정보 이용 목적</div>
                                                <div style={styles.consentItemText}>
                                                    1. 신고대상 사건 : 사전조사 결과보고 및 심층 조사결과 보고<br />
                                                    2. 신고대상 외 사건 : 고객사 담당 부서 업무 범위 외 사건 이관
                                                </div>
                                            </div>
                                            <div style={styles.consentItem}>
                                                <div style={styles.consentItemTitle}>제공 항목</div>
                                                <div style={styles.consentItemText}>성명, 전화번호, 이메일, 소속부서</div>
                                            </div>
                                            <div style={styles.consentItem}>
                                                <div style={styles.consentItemTitle}>보유 및 이용기간</div>
                                                <div style={styles.consentItemText}>
                                                    사건 처리 종료시까지
                                                </div>
                                            </div>
                                        </div>

                                        <ul style={styles.consentNoticeList}>
                                            <li>※ 위의 개인정보 수집에 대한 동의를 거부할 권리가 있습니다. 그러나 동의를 거부할 경우 신고 사건의 접수가 제한됩니다.</li>
                                        </ul>
                                    </div>

                                    <div style={{ ...styles.radioGroupWrapper, borderTop: '1px dotted #d1d5db', paddingTop: '24px' }}>
                                        <span style={{ ...styles.radioQuestion, fontSize: '18px', fontWeight: 'bold' }}>위 개인정보 제3자 제공에 동의하십니까? <span style={styles.required}>*</span></span>
                                        <div style={styles.radioOptions}>
                                            <label className="consent-radio-label" style={{ ...styles.radioLabel, backgroundColor: formData.agreeProvision === 'yes' ? '#eff6ff' : '#f8fafc', borderColor: formData.agreeProvision === 'yes' ? 'var(--color-primary)' : '#e2e8f0' }}>
                                                <input
                                                    type="radio"
                                                    name="agreeProvision"
                                                    value="yes"
                                                    checked={formData.agreeProvision === 'yes'}
                                                    onChange={handleInputChange}
                                                    style={styles.radioInput}
                                                />
                                                동의함
                                            </label>
                                            <label className="consent-radio-label" style={{ ...styles.radioLabel, backgroundColor: formData.agreeProvision === 'no' ? '#fef2f2' : '#f8fafc', borderColor: formData.agreeProvision === 'no' ? '#ef4444' : '#e2e8f0' }}>
                                                <input
                                                    type="radio"
                                                    name="agreeProvision"
                                                    value="no"
                                                    checked={formData.agreeProvision === 'no'}
                                                    onChange={handleInputChange}
                                                    style={styles.radioInput}
                                                />
                                                동의하지 않음
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', gap: '16px' }}>
                                <button onClick={handlePrevStep} style={{ ...styles.submitButton, backgroundColor: 'var(--color-bg-light)', color: 'var(--color-text-main)', width: 'auto', padding: '16px 32px' }}>
                                    이전
                                </button>
                                <button
                                    onClick={() => {
                                        if (formData.agreeCollection !== 'yes' || formData.agreeProvision !== 'yes') {
                                            alert('모든 필수 항목에 동의하셔야 다음 단계로 진행할 수 있습니다.');
                                            return;
                                        }
                                        handleNextStep();
                                    }}
                                    style={{
                                        ...styles.submitButton,
                                        width: 'auto',
                                        padding: '16px 32px',
                                        opacity: (formData.agreeCollection === 'yes' && formData.agreeProvision === 'yes') ? 1 : 0.5,
                                        cursor: (formData.agreeCollection === 'yes' && formData.agreeProvision === 'yes') ? 'pointer' : 'not-allowed'
                                    }}>
                                    다음 단계로
                                </button>
                            </div>
                        </div>
                    )
                    }

                    {
                        currentStep === 4 && (
                            <div style={styles.formContainerWrapper}>
                                <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', textAlign: 'center', paddingTop: '40px', paddingBottom: '40px' }}>
                                    <CheckCircle2 size={64} color="var(--color-primary)" style={{ marginBottom: '24px' }} />
                                    <h1 style={{ fontSize: '34px', marginBottom: '16px', color: 'var(--color-text-main)' }}>신고가 정상적으로 접수되었습니다.</h1>
                                    <div style={{ backgroundColor: 'var(--color-bg-paper)', padding: '32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', width: '100%', maxWidth: '500px', marginBottom: '32px' }}>
                                        <p style={{ fontSize: '18px', color: 'var(--color-text-muted)', marginBottom: '8px' }}>귀하의 접수번호</p>
                                        <p style={{ fontSize: '34px', fontWeight: 700, color: 'var(--color-primary)', letterSpacing: '2px' }}>{ticketNumber || `TY-${new Date().getFullYear()}-0891`}</p>
                                        <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#FEF3C7', color: '#92400E', borderRadius: 'var(--radius-sm)', fontSize: '16px', textAlign: 'left' }}>
                                            <strong>주의:</strong> 위 접수번호와 설정하신 비밀번호를 반드시 메모해 두십시오. 신고 진행 상황 조회 및 변호사 피드백 확인에 필요합니다.
                                        </div>
                                    </div>
                                    <button onClick={() => window.location.href = '/status'} style={{ ...styles.submitButton, width: 'auto', padding: '16px 32px' }}>
                                        진행 상황 확인하러 가기
                                    </button>
                                </div>
                            </div>
                        )}

                </div>
            </div>
            <Footer />
        </>
    );
};

// Helper Components
const TabButton = ({ active, onClick, label }) => (
    <button
        onClick={onClick}
        type="button"
        style={{
            ...styles.tabButton,
            backgroundColor: active ? 'var(--color-primary)' : 'transparent',
            color: active ? 'var(--color-white)' : 'var(--color-text-muted)',
            borderBottom: active ? 'none' : '1px solid var(--color-border)',
            borderColor: active ? 'var(--color-primary)' : 'var(--color-border)'
        }}
    >
        {label}
    </button>
);

const SectionBoxHeader = ({ title, required, children }) => (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        paddingBottom: '8px', // Tighter padding
        borderBottom: '2px solid #e2e8f0',
        marginBottom: '4px', // Tighter margin to pull inputs closer
        width: '100%',
        boxSizing: 'border-box'
    }}>
        <div style={{
            width: '4px',
            height: '20px',
            backgroundColor: 'var(--color-primary)',
            borderRadius: '2px',
            marginRight: '12px'
        }}></div>
        <span style={{ fontSize: '20px', fontWeight: 800, color: '#1e293b' }}>
            {title}
        </span>
        {required && <span style={{ color: '#ef4444', marginLeft: '6px', fontSize: '20px', fontWeight: 800 }}>*</span>}
        {children}
    </div>
);

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
    formContainerWrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        animation: 'fadeIn 0.5s ease-out',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
    },
    guidelineSection: {
        backgroundColor: '#fef2f2', // Very subtle red for warning
        border: '1px solid #fecaca', // Soft red border
        borderLeft: '4px solid #b91c1c', // Strong dark red left accent
        borderRadius: 'var(--radius-md)',
        padding: '30px',
    },
    guidelineTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '20px',
        fontWeight: 700,
        color: '#b91c1c', // Deep red for warning title
        marginBottom: '20px',
    },
    guidelineList: {
        listStyle: 'none',
        padding: 0,
        margin: '0 0 20px 0',
        fontSize: '17px',
        color: '#1e293b', // Very dark slate for strong readability against subtle red
        lineHeight: 1.7,
    },
    rejectionBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: '16px',
        borderRadius: '8px',
        fontSize: '16px',
        color: '#b91c1c', // Red tone
        lineHeight: 1.7,
    },
    formContainer: {
        backgroundColor: 'transparent',
        padding: '0',
        animation: 'fadeIn 0.5s ease-out',
    },
    verifyContainer: {
        display: 'flex',
        justifyContent: 'center',
        padding: '20px 0 60px 0',
    },
    verifyBox: {
        backgroundColor: '#1e3a8a', // Dark navy
        color: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
        border: 'none',
        padding: '40px', // Adjusted after moving elements out
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center align
        textAlign: 'center',
        animation: 'fadeIn 0.5s ease-out',
    },
    cardTitle: {
        fontSize: '30px', // 1.75rem
        fontWeight: 700,
        marginBottom: '24px',
        color: '#ffffff', // White text
    },
    searchForm: {
        width: '100%',
        marginBottom: '30px',
    },
    searchInputWrapper: {
        position: 'relative',
        width: '100%',
    },
    pillInput: {
        width: '100%',
        height: '60px', // Increased height
        borderRadius: '8px',
        border: 'none',
        padding: '0 24px', // Increased padding
        fontSize: '18px', // Increased font size
        color: '#333',
        outline: 'none',
        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
        backgroundColor: '#ffffff',
    },
    cardInfoList: {
        listStyle: 'none',
        padding: 0,
        margin: '10px 0 0 0',
        fontSize: '17px', // 0.95rem
        color: 'rgba(255, 255, 255, 0.9)',
        lineHeight: 1.7,
        textAlign: 'left',
        width: '100%',
    },
    cardInfoListItem: {
        position: 'relative',
        paddingLeft: '12px',
        marginBottom: '4px',
    },
    tabsMenu: {
        display: 'flex',
        width: '100%',
    },
    tabButton: {
        flex: 1,
        padding: '20px 0',
        fontSize: '18px',
        fontWeight: 600,
        transition: 'all 0.2s',
    },
    form: {
        padding: '0',
    },
    formSection: {
        marginBottom: '20px',
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0', // Crisp border
        boxShadow: '0 4px 15px -3px rgba(15, 44, 89, 0.05)',
        borderRadius: '12px',
        padding: '24px 32px', // Tighter layout
    },
    sectionTitle: {
        fontSize: '22px',
        fontWeight: 700,
        color: 'var(--color-primary)',
        margin: 0,
    },
    inputGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '16px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px', // Tighter gap
    },
    label: {
        fontSize: '16px',
        fontWeight: 500,
        color: 'var(--color-text-main)',
    },
    required: {
        color: '#E11D48',
    },
    input: {
        width: '100%',
        padding: '14px 16px', // Reduced padding
        fontSize: '17px',
        border: '1px solid #cbd5e1',
        borderRadius: '8px',
        outline: 'none',
        transition: 'all 0.2s ease',
        fontFamily: 'inherit',
        backgroundColor: '#f8fafc', // Very light background to contrast with white section
        color: '#1e293b',
    },
    textarea: {
        width: '100%',
        minHeight: '200px',
        padding: '16px',
        fontSize: '17px',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        outline: 'none',
        transition: 'border-color 0.2s',
        fontFamily: 'inherit',
        resize: 'vertical',
        backgroundColor: 'var(--color-bg-light)',
    },
    fileUploadBox: {
        border: '2px dashed #cbd5e1',
        borderRadius: '8px',
        padding: '28px', // Reduced padding
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8fafc', // match input background
        cursor: 'pointer',
        position: 'relative',
        transition: 'all 0.2s ease',
    },
    hiddenFileInput: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0,
        cursor: 'pointer',
    },
    consentContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    consentBox: {
        backgroundColor: '#ffffff',
        border: '1px solid #cbd5e1', // Stronger, crisper border
        borderRadius: '8px',
        padding: '24px 32px', // Tightened space
        boxShadow: '0 4px 15px -3px rgba(15, 44, 89, 0.05)',
    },
    consentHeader: {
        display: 'flex',
        justifyContent: 'center', // Center the title
        alignItems: 'center',
        paddingBottom: '12px',
        borderBottom: '2px solid var(--color-primary)', // Brand color underline
        marginBottom: '16px',
    },
    consentTitle: {
        fontSize: '22px', // Larger title
        fontWeight: 800,
        color: '#1e293b', // Dark slate
        margin: 0,
    },
    consentBody: {
        animation: 'fadeIn 0.3s ease-out',
        paddingTop: '8px',
    },
    consentIntro: {
        fontSize: '17px', // slightly smaller relative to inner items
        color: '#475569',
        marginBottom: '16px', // Reduced from 24px
        lineHeight: 1.5, // tighter line height
    },
    consentInnerBox: {
        backgroundColor: '#f8fafc', // Very light blue-gray
        border: '1px solid #e2e8f0', // Slightly darker border for inner box
        borderLeft: '4px solid #94a3b8', // Subtle left accent line for inner content
        borderRadius: '8px',
        padding: '24px 32px', // Reduced top/bottom padding
        marginBottom: '20px', // Reduced from 32px
        display: 'flex',
        flexDirection: 'column',
        gap: '16px', // Reduced from 24px for tighter item stacking
    },
    consentItemTitle: {
        fontSize: '17px',
        fontWeight: 700,
        color: 'var(--color-primary)', // Use brand primary for item headers
        marginBottom: '4px', // Reduced from 8px to keep title closer to text
    },
    consentItemText: {
        fontSize: '16px',
        color: '#475569',
        lineHeight: 1.6, // Tighter line height
    },
    consentTableWrapper: {
        overflowX: 'auto',
        marginBottom: '24px',
    },
    consentTable: {
        width: '100%',
        borderCollapse: 'collapse',
        borderTop: '2px solid #374151',
        borderBottom: '1px solid #e5e7eb',
        fontSize: '16px',
        color: '#4b5563',
    },
    consentNoticeList: {
        listStyle: 'none',
        padding: 0,
        margin: '0 0 24px 0', // Reduced from 32px
        fontSize: '16px', // slightly smaller
        color: '#64748b', // Lighter for secondary info
        lineHeight: 1.6, // Tighter line height
        display: 'flex',
        flexDirection: 'column',
        gap: '8px', // Reduced from 12px
    },
    radioGroupWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px', // slightly smaller gap
        paddingTop: '24px', // Reduced from 32px
        borderTop: '1px solid #e2e8f0',
    },
    radioQuestion: {
        fontSize: '20px', // Larger prominent question
        fontWeight: 800,
        color: '#1e293b',
    },
    radioOptions: {
        display: 'flex',
        gap: '32px', // Wider gap
    },
    radioLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px', // More space between button and text
        fontSize: '18px', // Larger text
        fontWeight: 600,
        color: '#334155',
        cursor: 'pointer',
        padding: '12px 24px', // Add padding for a "button" feel
        borderRadius: '8px',
        backgroundColor: '#f8fafc', // Light background
        border: '1px solid #e2e8f0',
        transition: 'all 0.2s',
    },
    radioInput: {
        width: '24px', // Larger radio
        height: '24px',
        accentColor: 'var(--color-primary)',
        cursor: 'pointer',
    },
    submitButton: {
        backgroundColor: 'var(--color-primary)',
        color: 'var(--color-white)',
        fontSize: '20px',
        fontWeight: 600,
        padding: '18px 32px',
        borderRadius: 'var(--radius-md)',
        width: '100%',
        transition: 'background-color 0.2s, transform 0.1s',
    },
};

const styleSheet = document.createElement("style");
styleSheet.innerText = `
            @keyframes fadeIn {
                from {opacity: 0; transform: translateY(10px); }
            to {opacity: 1; transform: translateY(0); }
}
            input[type="text"]:focus, input[type="password"]:focus, input[type="datetime-local"]:focus, input[type="tel"]:focus, input[type="email"]:focus, textarea:focus, .ql-container.ql-snow:focus-within {
                border: 2px solid var(--color-primary) !important;
            box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.15) !important;
            background-color: var(--color-white) !important;
            outline: none !important;
}
            .custom-checkbox {
                width: 20px;
            height: 20px;
            accent-color: var(--color-primary);
}
            .consent-radio-label:hover, .hover-radio-card:hover {
                background - color: #f1f5f9 !important;
            border-color: #cbd5e1 !important;
}
            .btn-hover-effect:active {
                transform: scale(0.98);
}
            .rejection-box ul {
                list - style: none;
            padding: 0;
            margin: 8px 0 0 0;
}
            .guideline-list li {
                position: relative;
            padding-left: 12px;
            margin-bottom: 8px;
}
            .guideline-list li::before {
                content: "·";
            position: absolute;
            left: 0;
            font-weight: bold;
}
            .consent-table th, .consent-table td {
                padding: 16px;
            border: 1px solid #e5e7eb;
            text-align: center;
            vertical-align: middle;
}
            .consent-table th {
                background - color: #f9fafb;
            font-weight: 700;
}
            @media (min-width: 600px) {
                div[style *= "borderTop: '1px dotted #d1d5db'"] { /* Target radio group */
                flex - direction: row !important;
    }
}
            @media (max-width: 600px) {
                div[style *= "padding: 40px"] {
                padding: 24px !important;
    }
            div[style*="padding: 50px 40px"] { /* For verify box */
                padding: 30px 20px !important;
    }
            div[style*="padding: 30px"] { /* For guidelines */
                padding: 24px !important;
    }
            div[style*="padding: 32px"] { /* For consent box */
                padding: 20px !important;
    }
}
            `;
document.head.appendChild(styleSheet);

export default Report;
