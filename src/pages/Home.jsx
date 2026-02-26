import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Shield, UserCheck, Clock,
    MessageSquareWarning, Search, Scale, FileCheck,
    Building2, Users, Laptop, Gavel,
    Phone, MessageCircle, ArrowRight,
    PenTool, ShieldAlert, ClipboardList
} from 'lucide-react';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [focusedSuggestionIndex, setFocusedSuggestionIndex] = useState(-1);
    const [receiptNumber, setReceiptNumber] = useState('');
    const [password, setPassword] = useState('');
    const [checkMethod, setCheckMethod] = useState('password');

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

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
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
        setSearchQuery(partner);
        setSuggestions([]);
        setShowSuggestions(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();

        if (!searchQuery) {
            alert('고객사(기관)명을 입력해주세요.');
            return;
        }

        if (!PARTNER_LIST.includes(searchQuery)) {
            alert('등록되지 않은 고객사(기관)입니다. 정확한 이름을 선택해주세요.');
            return;
        }

        navigate('/report', { state: { initialPartner: searchQuery } });
    };

    const handleStatusCheck = (e) => {
        e.preventDefault();
        if (receiptNumber && password) {
            navigate('/status', { state: { receiptNumber, password } });
        } else {
            navigate('/status');
        }
    };

    return (
        <div className="home-container">
            {/* Section 1: Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-headline">
                        법무법인 티와이로이어스 인권상담신고센터
                    </h1>
                    <p className="hero-subheadline">
                        법무법인 티와이로이어스 인권상담신고센터는 고객사 임직원의 인권보호를 위해 제공되는 독립된 신고시스템입니다.<br />
                        신고하신 내용은 철저한 보안 프로세스를 통해 접수되어 처리됩니다.
                    </p>
                </div>
            </section>

            {/* Section 1.5: Action Blocks */}
            <section className="action-blocks-section">
                <div className="action-blocks-wrapper">
                    {/* Report Block */}
                    <div className="action-block block-report">
                        <div className="action-block-content">
                            <h2 className="action-title">신고하기</h2>

                            <form onSubmit={handleSearch} className="action-search-form">
                                <div className="search-input-wrapper">
                                    <input
                                        type="text"
                                        className="action-input search-input"
                                        placeholder="고객사(기관)명 입력"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                        onFocus={() => {
                                            if (searchQuery.length > 0 && suggestions.length > 0) setShowSuggestions(true);
                                        }}
                                        onBlur={() => {
                                            // Delay hiding suggestions so click event can fire
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
                                    />
                                    <button type="submit" className="search-icon-button">
                                        <Search size={24} color="#3b82f6" />
                                    </button>

                                    {showSuggestions && suggestions.length > 0 && (
                                        <ul style={{
                                            position: 'absolute',
                                            top: '100%',
                                            left: 0,
                                            width: '100%',
                                            backgroundColor: 'var(--color-white)',
                                            border: '1px solid var(--color-border)',
                                            borderRadius: 'var(--radius-md)',
                                            marginTop: '4px',
                                            padding: '0',
                                            listStyle: 'none',
                                            maxHeight: '200px',
                                            overflowY: 'auto',
                                            zIndex: 10,
                                            boxShadow: 'var(--shadow-md)'
                                        }}>
                                            {suggestions.map((suggestion, index) => (
                                                <li
                                                    key={index}
                                                    style={{
                                                        padding: '12px 16px',
                                                        cursor: 'pointer',
                                                        borderBottom: index < suggestions.length - 1 ? '1px solid var(--color-bg-light)' : 'none',
                                                        color: 'var(--color-text-main)',
                                                        backgroundColor: index === focusedSuggestionIndex ? '#e2e8f0' : 'transparent',
                                                        transition: 'background-color 0.2s',
                                                        textAlign: 'left'
                                                    }}
                                                    onMouseDown={() => handlePartnerSelect(suggestion)}
                                                    onMouseEnter={() => setFocusedSuggestionIndex(index)}
                                                    onMouseLeave={() => setFocusedSuggestionIndex(-1)}
                                                >
                                                    {suggestion}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </form>
                            <ul className="action-subtitle-bottom">
                                <li>고객사(기관) 임직원에게 제공되는 서비스입니다.</li>
                                <li>고객사(기관)을 검색해 주세요.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Status Check Block */}
                    <div className="action-block block-status">
                        <div className="action-block-content">
                            <h2 className="action-title">진행상황조회</h2>

                            <form onSubmit={handleStatusCheck} className="action-status-form">
                                <div className="status-inputs">
                                    <input
                                        type="text"
                                        className="action-input"
                                        placeholder="접수번호 입력"
                                        value={receiptNumber}
                                        onChange={(e) => setReceiptNumber(e.target.value)}
                                    />
                                    <input
                                        type="password"
                                        className="action-input"
                                        placeholder="비밀번호 입력"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="status-submit-btn">확인</button>
                            </form>
                            <ul className="action-subtitle-bottom">
                                <li>신고서 제출 시 할당된 접수번호와 비밀번호를 입력해 주세요.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Core Values */}
            <section className="section bg-white" style={{ position: 'relative', zIndex: 3 }}>
                <div className="section-wrapper">
                    <h2 className="section-title">가장 확실하고 안전한 보호 시스템</h2>
                    <div className="values-grid">
                        <div className="value-card">
                            <div className="value-icon"><Shield size={32} /></div>
                            <h3 className="value-title">철저한 익명성</h3>
                            <p className="value-desc">어떠한 기록도 남지 않는 안전한 소통 창구입니다. 당신의 신분을 누구도 알 수 없게 철저히 보호합니다.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon"><UserCheck size={32} /></div>
                            <h3 className="value-title">전문 변호사 직접 대응</h3>
                            <p className="value-desc">AI가 아닌 실제 전문 변호사의 정밀 분석을 통해 실질적이고 정확한 법률 조력을 제공합니다.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon"><Clock size={32} /></div>
                            <h3 className="value-title">24/7 실시간 모니터링</h3>
                            <p className="value-desc">위기 상황 발생 시 즉각적인 법적 조치를 위한 상시 시스템이 가동됩니다.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3: Service Process */}
            <section className="process-section">
                <div className="section-wrapper">
                    <h2 className="process-title" style={{ color: "var(--white)" }}>신고 처리 과정</h2>
                    <div className="process-steps">
                        <div className="step-card">
                            <div className="step-number"><PenTool size={28} color="white" /></div>
                            <h3 className="step-title" style={{ color: "var(--white)" }}>신고접수</h3>
                            <p className="step-desc">안전한 채널을 통한 익명<br />신고 내용 접수</p>
                        </div>

                        <div className="step-card">
                            <div className="step-number"><ShieldAlert size={28} color="white" /></div>
                            <h3 className="step-title" style={{ color: "var(--white)" }}>기초조사</h3>
                            <p className="step-desc">피해자 임시 보호 조치 및<br />기초 사실관계 파악</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number"><ClipboardList size={28} color="white" /></div>
                            <h3 className="step-title" style={{ color: "var(--white)" }}>심층조사</h3>
                            <p className="step-desc">관련자 심층 면담 및<br />객관적 증거 수집</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number"><FileCheck size={28} color="white" /></div>
                            <h3 className="step-title" style={{ color: "var(--white)" }}>결과보고</h3>
                            <p className="step-desc">조사 내용 기반의<br />종합적인 결과 보고서 작성</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number"><Scale size={28} color="white" /></div>
                            <h3 className="step-title" style={{ color: "var(--white)" }}>구제조치</h3>
                            <p className="step-desc">징계 등 후속 조치 및<br />피해 회복 지원</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 4: Practice Areas */}
            <section className="section bg-light">
                <div className="section-wrapper">
                    <h2 className="section-title">주요 보호 영역</h2>
                    <div className="areas-grid">
                        <div className="area-item">
                            <div className="area-icon"><Users size={28} /></div>
                            <div className="area-info">
                                <h3>직장내성희롱&성폭행</h3>
                                <p>조직 내 발생할 수 있는 성적 굴욕감, 혐오감 유발 행위 및 성범죄 피해 구제</p>
                            </div>
                        </div>
                        <div className="area-item">
                            <div className="area-icon"><MessageSquareWarning size={28} /></div>
                            <div className="area-info">
                                <h3>직장내괴롭힘</h3>
                                <p>지위나 관계의 우위를 이용한 신체적, 정신적 고통 유발 행위 조사 및 대응</p>
                            </div>
                        </div>
                        <div className="area-item">
                            <div className="area-icon"><Scale size={28} /></div>
                            <div className="area-info">
                                <h3>기타인권침해</h3>
                                <p>부당 인사, 차별 대우 등 기타 부조리 및 조직 내 인권 침해 사안 전반 처리</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;
