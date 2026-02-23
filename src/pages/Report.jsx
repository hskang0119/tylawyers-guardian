import React, { useState } from 'react';
import { Shield, Upload, AlertCircle, CheckCircle2, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import Hero from '../components/Hero';

const Report = () => {
    const [reportType, setReportType] = useState('corruption'); // corruption, harassment, sexual_harassment
    const [isAgreed, setIsAgreed] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

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

    // Autocomplete search states
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Form states (in a real app, use a library like react-hook-form)
    const [formData, setFormData] = useState({
        targetName: '',
        targetDept: '',
        targetEmail: '',
        targetPhone: '',
        incidentDate: '',
        incidentPlace: '',
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

    const handleSubmit = (e) => {
        e.preventDefault();

        // New validation for required fields
        if (!formData.targetName || !formData.targetDept || !formData.incidentDate || !formData.incidentPlace || !formData.title || !formData.content) {
            alert('필수 입력 항목을 모두 확인해주세요.');
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
        if (formData.password !== formData.passwordConfirm) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        // Simulate API call, now including partner information
        console.log('Submitting report:', {
            partnerName: partnerName,
            type: reportType,
            ...formData
        });
        setIsSubmitted(true);
        window.scrollTo(0, 0);
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchTerm(query);
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
        setIsVerified(true);
        setSearchTerm('');
        setShowSuggestions(false);
    };

    if (isSubmitted) {
        return <SubmissionSuccess />;
    }

    return (
        <div style={styles.container}>
            <Hero title="신고하기" breadcrumb="신고하기" />
            <div className="container" style={styles.contentWrapper}>
                <div style={styles.header}>
                    <h1 style={styles.title}>신고하기</h1>
                    <p style={styles.subtitle}>
                        안전하고 독립적인 채널을 통해 귀하의 제보를 접수합니다.
                        모든 내용은 철저히 암호화되어 법무법인 티와이로이어스 변호사에게 직접 전달됩니다.
                    </p>
                </div>

                {!isVerified ? (
                    // Verification Step
                    <div style={styles.verifyContainer}>
                        <div style={styles.verifyBox}>
                            <Shield size={48} color="var(--color-primary)" style={{ marginBottom: '24px' }} />
                            <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px', color: 'var(--color-text-main)' }}>
                                파트너사 선택
                            </h2>
                            <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', marginBottom: '32px', lineHeight: 1.6 }}>
                                신고를 진행하기 위해 소속 기관(기업)의<br />
                                <strong>이름을 검색하고 선택</strong>해 주세요.
                            </p>

                            <div style={{ width: '100%', position: 'relative' }}>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    onFocus={() => { if (searchTerm.length > 0) setShowSuggestions(true); }}
                                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                    placeholder="파트너사 이름 입력 (예: 서울주택)"
                                    style={{
                                        ...styles.input,
                                        fontSize: '16px',
                                        padding: '16px',
                                        borderColor: 'var(--color-border)',
                                        textAlign: 'center'
                                    }}
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
                                                    padding: '16px 20px',
                                                    cursor: 'pointer',
                                                    borderBottom: index < suggestions.length - 1 ? '1px solid var(--color-bg-light)' : 'none',
                                                    color: 'var(--color-text-main)',
                                                    fontSize: '15px',
                                                    fontWeight: 500,
                                                    transition: 'background-color 0.1s'
                                                }}
                                                onMouseDown={() => handlePartnerSelect(partner)}
                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-bg-light)'}
                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
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
                                        borderTop: 'none',
                                        borderRadius: '0 0 var(--radius-md) var(--radius-md)',
                                        padding: '16px',
                                        color: 'var(--color-text-muted)',
                                        fontSize: '14px',
                                        zIndex: 10
                                    }}>
                                        검색 결과가 없습니다.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    // Main Reporting Form (Shown after verification)
                    <div style={styles.formContainerWrapper}>
                        {/* Guidelines Section */}
                        <div style={styles.guidelineSection}>
                            <h3 style={styles.guidelineTitle}>
                                <AlertTriangle size={20} color="#b45309" />
                                신고서 작성 유의사항
                            </h3>
                            <ul className="guideline-list" style={styles.guidelineList}>
                                <li>익명으로 인권침해 등 신고가 가능하며, 익명은 계속적으로 보장됩니다. 신고와 조사는 외부 전문기관(법무법인 티와이로이어스)에서 실시합니다.</li>
                                <li>신고 내용은 가능한 자세히 작성할수록 보다 실질적이고 구체적인 사건 조사가 가능합니다.</li>
                                <li>익명으로 신고 하시더라도 연락이 가능한 별도 연락처를 기재해 주셔야 신고 처리 현황 및 결과의 통지가 가능하며, 연락처를 기재하지 않으시는 경우에는 신고확인 메뉴를 통하여만 통지를 받으실 수 있습니다.</li>
                                <li>신고 내용에 따라 신고가 각하되거나 기각될 수 있습니다.</li>
                                <li>인권 침해 신고가 아닌 일반 민원 등은 각하될 수 있습니다.</li>
                            </ul>
                            <div className="rejection-box" style={styles.rejectionBox}>
                                <strong>* 각하 대상</strong>
                                <ul>
                                    <li>- 귀사의 업무와 무관한 것이거나 업무/규정 위반에 해당하지 않음이 명백한 경우</li>
                                    <li>- 당사자 간의 채권적 권리 관계 또는 계약상 의무 이행 여부가 문제되는 경우</li>
                                    <li>- 회사 업무 진행에 관한 문의·질의</li>
                                    <li>- 특정 행위자가 존재하지 않는 포괄적이거나 주관적인 불편사항 등 단순 민원으로 분류되는 업무</li>
                                </ul>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <div style={styles.formContainer}>
                                {/* Custom Tabs */}
                                <div style={styles.tabsMenu}>
                                    <TabButton
                                        active={reportType === 'corruption'}
                                        onClick={() => setReportType('corruption')}
                                        label="성희롱 성폭력"
                                    />
                                    <TabButton
                                        active={reportType === 'harassment'}
                                        onClick={() => setReportType('harassment')}
                                        label="직장내괴롭힘"
                                    />
                                    <TabButton
                                        active={reportType === 'sexual_harassment'}
                                        onClick={() => setReportType('sexual_harassment')}
                                        label="기타 인권침해"
                                    />
                                </div>

                                <div style={styles.form}>
                                    {/* Section 1: Target Info */}
                                    <div style={styles.formSection}>
                                        <h3 style={styles.sectionTitle}>신고 대상자 정보</h3>
                                        <div style={styles.inputGrid}>
                                            {/* Auto-filled, read-only Partner Name */}
                                            <div style={{ ...styles.inputGroup, gridColumn: '1 / -1' }}>
                                                <label style={styles.label}>소속 기관 (파트너사) <span style={styles.required}>*</span></label>
                                                <input
                                                    type="text"
                                                    value={partnerName}
                                                    style={{ ...styles.input, backgroundColor: '#f1f5f9', color: '#64748b', fontWeight: 600, cursor: 'not-allowed' }}
                                                    readOnly
                                                />
                                                <p style={{ fontSize: '13px', color: 'var(--color-text-light)', marginTop: '4px' }}>인증된 파트너사 정보가 자동으로 입력됩니다.</p>
                                            </div>

                                            <div style={styles.inputGroup}>
                                                <label style={styles.label}>이름</label>
                                                <input
                                                    type="text"
                                                    name="targetName"
                                                    value={formData.targetName}
                                                    onChange={handleInputChange}
                                                    style={styles.input}
                                                    placeholder="예) 홍길동"
                                                />
                                            </div>
                                            <div style={styles.inputGroup}>
                                                <label style={styles.label}>부서/직급</label>
                                                <input
                                                    type="text"
                                                    name="targetDept"
                                                    value={formData.targetDept}
                                                    onChange={handleInputChange}
                                                    style={styles.input}
                                                    placeholder="예) 영업본부 1팀 직장"
                                                />
                                            </div>
                                            <div style={styles.inputGroup}>
                                                <label style={styles.label}>휴대전화번호</label>
                                                <input
                                                    type="tel"
                                                    name="targetPhone"
                                                    value={formData.targetPhone}
                                                    onChange={handleInputChange}
                                                    style={styles.input}
                                                    placeholder="예) 010-1234-5678"
                                                />
                                            </div>
                                            <div style={styles.inputGroup}>
                                                <label style={styles.label}>이메일</label>
                                                <input
                                                    type="email"
                                                    name="targetEmail"
                                                    value={formData.targetEmail}
                                                    onChange={handleInputChange}
                                                    style={styles.input}
                                                    placeholder="예) hong@example.com"
                                                />
                                            </div>
                                            <div style={{ gridColumn: '1 / -1', marginTop: '-12px' }}>
                                                <p style={{ fontSize: '13px', color: 'var(--color-text-light)' }}>
                                                    * 익명 신고 시 기재하지 않을 수 있습니다. 다만 익명으로 신고 하시더라도 연락이 가능한 별도 연락처를 기재해 주셔야 신고 처리 현황 및 결과의 통지가 가능하며, 연락처를 기재하지 않으시는 경우에는 신고확인 메뉴를 통하여만 통지를 받으실 수 있습니다.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section 2: Incident Details */}
                                    <div style={styles.formSection}>
                                        <h3 style={styles.sectionTitle}>발생 내용</h3>
                                        <div style={styles.inputGrid}>
                                            <div style={styles.inputGroup}>
                                                <label style={styles.label}>발생 일시 <span style={styles.required}>*</span></label>
                                                <input
                                                    type="datetime-local"
                                                    name="incidentDate"
                                                    value={formData.incidentDate}
                                                    onChange={handleInputChange}
                                                    style={styles.input}
                                                    required
                                                />
                                            </div>
                                            <div style={styles.inputGroup}>
                                                <label style={styles.label}>발생 장소 <span style={styles.required}>*</span></label>
                                                <input
                                                    type="text"
                                                    name="incidentPlace"
                                                    value={formData.incidentPlace}
                                                    onChange={handleInputChange}
                                                    style={styles.input}
                                                    placeholder="구체적인 장소 입력"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div style={{ ...styles.inputGroup, marginTop: '20px' }}>
                                            <label style={styles.label}>신고 제목 <span style={styles.required}>*</span></label>
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
                                            <label style={styles.label}>구체적 신고 내용 <span style={styles.required}>*</span></label>
                                            <textarea
                                                name="content"
                                                value={formData.content}
                                                onChange={handleInputChange}
                                                style={styles.textarea}
                                                placeholder="언제, 어디서, 누가, 어떻게 등 구체적인 사실 관계를 바탕으로 작성해 주세요."
                                                required
                                            ></textarea>
                                        </div>
                                    </div>

                                    {/* Section 3: Evidence */}
                                    <div style={styles.formSection}>
                                        <h3 style={styles.sectionTitle}>증거 자료 첨부</h3>
                                        <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                                            문서, 사진, 녹취 파일 등 사건을 파악할 수 있는 자료를 첨부해 주세요. (최대 50MB)
                                        </p>
                                        <div style={styles.fileUploadBox}>
                                            <Upload size={24} color="var(--color-text-light)" style={{ marginBottom: '8px' }} />
                                            <span style={{ color: 'var(--color-text-main)', fontWeight: 500 }}>클릭하여 파일 선택</span>
                                            <span style={{ color: 'var(--color-text-light)', fontSize: '13px', marginTop: '4px' }}>또는 이곳으로 파일을 드래그 하세요</span>
                                            <input type="file" multiple style={styles.hiddenFileInput} />
                                        </div>
                                    </div>

                                    {/* Section 4: Security */}
                                    <div style={{ ...styles.formSection, backgroundColor: 'var(--color-accent)', padding: '24px', borderRadius: 'var(--radius-md)', border: 'none' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                                            <Shield size={20} color="var(--color-primary)" />
                                            <h3 style={{ ...styles.sectionTitle, margin: 0, color: 'var(--color-primary)' }}>결과 확인용 비밀번호 설정</h3>
                                        </div>
                                        <p style={{ fontSize: '14px', color: 'var(--color-text-main)', marginBottom: '16px' }}>
                                            추후 진행 상황 및 변호사 답변을 확인하기 위해 사용할 비밀번호입니다.
                                            <strong style={{ color: '#d97706' }}> 분실 시 찾을 수 없으므로 반드시 기억해 주세요.</strong>
                                        </p>

                                        <div style={styles.inputGrid}>
                                            <div style={styles.inputGroup}>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleInputChange}
                                                    style={{ ...styles.input, backgroundColor: 'var(--color-white)' }}
                                                    placeholder="비밀번호 (영문, 숫자 포함 8자 이상)"
                                                    required
                                                />
                                            </div>
                                            <div style={styles.inputGroup}>
                                                <input
                                                    type="password"
                                                    name="passwordConfirm"
                                                    value={formData.passwordConfirm}
                                                    onChange={handleInputChange}
                                                    style={{ ...styles.input, backgroundColor: 'var(--color-white)' }}
                                                    placeholder="비밀번호 확인"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* Consent Sections */}
                            <div style={styles.consentContainer}>
                                {/* Collection Consent */}
                                <div style={styles.consentBox}>
                                    <div
                                        style={styles.consentHeader}
                                        onClick={() => setExpandedCollection(!expandedCollection)}
                                    >
                                        <h3 style={styles.consentTitle}>[개인정보 수집 · 이용 동의서]</h3>
                                        {expandedCollection ? <ChevronUp size={24} color="#6b7280" /> : <ChevronDown size={24} color="#6b7280" />}
                                    </div>

                                    {expandedCollection && (
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
                                                <li>※ 위의 개인정보 수집에 대한 동의를 거부할 권리가 있습니다. 그러나 동의를 거부할 경우 신고 사건의 조사 및 처리에 제한을 받을 수 있습니다.</li>
                                                <li>※ 본 동의는 기재하신 개인정보에 한정된 것이며, 익명성은 본 동의와 별도로 당연히 보장됩니다.</li>
                                            </ul>
                                        </div>
                                    )}

                                    <div style={{ ...styles.radioGroupWrapper, borderTop: expandedCollection ? '1px dotted #d1d5db' : 'none', paddingTop: expandedCollection ? '24px' : '0' }}>
                                        <span style={styles.radioQuestion}>위 개인정보 수집 이용에 동의하십니까?</span>
                                        <div style={styles.radioOptions}>
                                            <label style={styles.radioLabel}>
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
                                            <label style={styles.radioLabel}>
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
                                    <div
                                        style={styles.consentHeader}
                                        onClick={() => setExpandedProvision(!expandedProvision)}
                                    >
                                        <h3 style={styles.consentTitle}>[개인정보 제3자 제공에 관한 별도 동의서]</h3>
                                        {expandedProvision ? <ChevronUp size={24} color="#6b7280" /> : <ChevronDown size={24} color="#6b7280" />}
                                    </div>

                                    {expandedProvision && (
                                        <div style={styles.consentBody}>
                                            <div style={styles.consentTableWrapper}>
                                                <table style={styles.consentTable}>
                                                    <thead>
                                                        <tr>
                                                            <th>개인정보를 제공받는 제3자</th>
                                                            <th>제3자의 개인정보<br />이용 목적</th>
                                                            <th>제공 항목</th>
                                                            <th>보유 및 이용기간</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>{partnerName || '해당 파트너사'}<br />인권센터</td>
                                                            <td>인권침해구제위원회 심의<br />및 의결</td>
                                                            <td>성명, 전화번호, 이메일,<br />소속부서</td>
                                                            <td>인권침해 구제절차<br />종료시까지</td>
                                                        </tr>
                                                        <tr>
                                                            <td>{partnerName || '해당 파트너사'}</td>
                                                            <td>상담신고센터 업무 범위 외<br />사건 이관</td>
                                                            <td>성명, 전화번호, 이메일,<br />소속부서</td>
                                                            <td>사건 처리 종료시까지</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <ul style={styles.consentNoticeList}>
                                                <li>※ 위의 개인정보 수집에 대한 동의를 거부할 권리가 있습니다. 그러나 동의를 거부할 경우 신고 사건의 조사에 제한을 받을 수 있습니다.</li>
                                            </ul>
                                        </div>
                                    )}

                                    <div style={{ ...styles.radioGroupWrapper, borderTop: expandedProvision ? '1px dotted #d1d5db' : 'none', paddingTop: expandedProvision ? '24px' : '0' }}>
                                        <span style={styles.radioQuestion}>위 개인정보 제3자 제공에 동의하십니까?</span>
                                        <div style={styles.radioOptions}>
                                            <label style={styles.radioLabel}>
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
                                            <label style={styles.radioLabel}>
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

                            {/* Submit Button */}
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px', marginBottom: '20px' }}>
                                <button type="submit" style={{ ...styles.submitButton, maxWidth: '400px', padding: '16px', fontSize: '18px' }} className="btn-hover-effect">
                                    신고서 최종 제출하기
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

const SubmissionSuccess = () => (
    <div style={styles.container}>
        <Hero title="신고 완료" breadcrumb="신고하기" />
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center', paddingTop: '60px' }}>
            <CheckCircle2 size={64} color="var(--color-primary)" style={{ marginBottom: '24px' }} />
            <h1 style={{ fontSize: '32px', marginBottom: '16px', color: 'var(--color-text-main)' }}>신고가 정상적으로 접수되었습니다.</h1>
            <div style={{ backgroundColor: 'var(--color-bg-paper)', padding: '32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', width: '100%', maxWidth: '500px', marginBottom: '32px' }}>
                <p style={{ fontSize: '16px', color: 'var(--color-text-muted)', marginBottom: '8px' }}>귀하의 접수번호</p>
                <p style={{ fontSize: '32px', fontWeight: 700, color: 'var(--color-primary)', letterSpacing: '2px' }}>TY-2023-0891</p>
                <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#FEF3C7', color: '#92400E', borderRadius: 'var(--radius-sm)', fontSize: '14px', textAlign: 'left' }}>
                    <strong>주의:</strong> 위 접수번호와 설정하신 비밀번호를 반드시 메모해 두십시오. 신고 진행 상황 조회 및 변호사 피드백 확인에 필요합니다.
                </div>
            </div>
            <button onClick={() => window.location.href = '/status'} style={styles.submitButton}>
                진행 상황 확인하러 가기
            </button>
        </div>
    </div>
);

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
    formContainerWrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        animation: 'fadeIn 0.5s ease-out',
    },
    guidelineSection: {
        backgroundColor: '#fffbeb', // Light amber background
        border: '1px solid #fcd34d',
        borderRadius: 'var(--radius-lg)',
        padding: '30px',
    },
    guidelineTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '18px',
        fontWeight: 700,
        color: '#92400e', // Dark amber text
        marginBottom: '20px',
    },
    guidelineList: {
        listStyle: 'none',
        padding: 0,
        margin: '0 0 20px 0',
        fontSize: '15px',
        color: '#451a03', // Very dark amber
        lineHeight: 1.6,
    },
    rejectionBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        padding: '16px',
        borderRadius: '8px',
        fontSize: '14px',
        color: '#451a03',
        lineHeight: 1.6,
    },
    formContainer: {
        backgroundColor: 'var(--color-white)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-md)',
        overflow: 'hidden',
        border: '1px solid var(--color-border)',
        animation: 'fadeIn 0.5s ease-out',
    },
    verifyContainer: {
        display: 'flex',
        justifyContent: 'center',
        padding: '20px 0 60px 0',
    },
    verifyBox: {
        backgroundColor: 'var(--color-white)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-md)',
        border: '1px solid var(--color-border)',
        padding: '50px 40px',
        width: '100%',
        maxWidth: '500px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        animation: 'fadeIn 0.5s ease-out',
    },
    tabsMenu: {
        display: 'flex',
        width: '100%',
    },
    tabButton: {
        flex: 1,
        padding: '20px 0',
        fontSize: '16px',
        fontWeight: 600,
        transition: 'all 0.2s',
    },
    form: {
        padding: '32px',
    },
    formSection: {
        marginBottom: '24px',
        paddingBottom: '24px',
        borderBottom: '1px solid var(--color-border)',
    },
    sectionTitle: {
        fontSize: '20px',
        fontWeight: 600,
        color: 'var(--color-text-main)',
        marginBottom: '24px',
    },
    inputGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '16px',
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
    required: {
        color: '#E11D48',
    },
    input: {
        width: '100%',
        padding: '12px 16px',
        fontSize: '15px',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        outline: 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        fontFamily: 'inherit',
        backgroundColor: 'var(--color-bg-light)',
    },
    textarea: {
        width: '100%',
        minHeight: '200px',
        padding: '16px',
        fontSize: '15px',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        outline: 'none',
        transition: 'border-color 0.2s',
        fontFamily: 'inherit',
        resize: 'vertical',
        backgroundColor: 'var(--color-bg-light)',
    },
    fileUploadBox: {
        border: '2px dashed var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-bg-light)',
        cursor: 'pointer',
        position: 'relative',
        transition: 'border-color 0.2s, background-color 0.2s',
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
        gap: '24px',
    },
    consentBox: {
        backgroundColor: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '24px 32px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
    },
    consentHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
        paddingBottom: '16px',
    },
    consentTitle: {
        fontSize: '18px',
        fontWeight: 700,
        color: '#1f2937',
        margin: 0,
    },
    consentBody: {
        animation: 'fadeIn 0.3s ease-out',
        paddingTop: '8px',
    },
    consentIntro: {
        fontSize: '15px',
        color: '#4b5563',
        marginBottom: '20px',
    },
    consentInnerBox: {
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
        padding: '24px',
        marginBottom: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    consentItemTitle: {
        fontSize: '15px',
        fontWeight: 700,
        color: '#4b5563',
        marginBottom: '4px',
    },
    consentItemText: {
        fontSize: '14px',
        color: '#4b5563',
        lineHeight: 1.6,
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
        fontSize: '14px',
        color: '#4b5563',
    },
    consentNoticeList: {
        listStyle: 'none',
        padding: 0,
        margin: '0 0 24px 0',
        fontSize: '14px',
        color: '#4b5563',
        lineHeight: 1.6,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    radioGroupWrapper: {
        display: 'flex',
        flexDirection: 'column', // Stack on mobile
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        paddingTop: '24px',
        borderTop: '1px dotted #d1d5db',
    },
    radioQuestion: {
        fontSize: '15px',
        color: '#4b5563',
    },
    radioOptions: {
        display: 'flex',
        gap: '24px',
    },
    radioLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '15px',
        color: '#4b5563',
        cursor: 'pointer',
    },
    radioInput: {
        width: '20px',
        height: '20px',
        accentColor: '#1f2937',
        cursor: 'pointer',
    },
    submitButton: {
        backgroundColor: 'var(--color-primary)',
        color: 'var(--color-white)',
        fontSize: '18px',
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
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  input[type="text"]:focus, input[type="password"]:focus, input[type="datetime-local"]:focus, textarea:focus {
    border-color: var(--color-primary) !important;
    box-shadow: 0 0 0 3px rgba(15, 44, 89, 0.1) !important;
    background-color: var(--color-white) !important;
  }
  .custom-checkbox {
    width: 20px;
    height: 20px;
    accent-color: var(--color-primary);
  }
  .btn-hover-effect:active {
    transform: scale(0.98);
  }
  .rejection-box ul {
    list-style: none;
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
    background-color: #f9fafb;
    font-weight: 700;
  }
  @media (min-width: 600px) {
    div[style*="borderTop: '1px dotted #d1d5db'"] { /* Target radio group */
        flex-direction: row !important;
    }
  }
  @media (max-width: 600px) {
    div[style*="padding: 40px"] {
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
