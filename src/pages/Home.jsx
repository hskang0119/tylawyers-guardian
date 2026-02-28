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
                                <li>고객사와 업무관련성이 있는 영역에서의 인권침해 행위를 대상으로 합니다.</li>
                                <li>고객사(기관)을 입력해 주세요.</li>
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
                    <h2 className="section-title" style={{ textAlign: 'center', fontSize: '2.53rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '80px' }}>
                        인권상담센터의 3대 핵심 가치
                    </h2>

                    <div className="core-values-container" style={{ display: 'flex', flexDirection: 'column', gap: '150px', paddingTop: '40px' }}>
                        {/* Value 1 */}
                        <div className="core-value-row" style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                            <div className="core-value-image" style={{ width: '65%', height: '400px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)' }}>
                                <img src="/core_value_1.jpg" alt="완벽한 정보 보호 및 보안 체계" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div className="core-value-content-overlap" style={{ width: '45%', position: 'absolute', right: 0, padding: '50px 40px', background: 'var(--white)', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}>
                                <div style={{ fontSize: '1.01rem', color: '#64748b', marginBottom: '8px', fontWeight: 600 }}>Security & Confidentiality</div>
                                <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '20px', lineHeight: 1.3, letterSpacing: '-0.5px' }}>
                                    완벽한 정보 보호 및 보안 체계
                                </h3>
                                <p style={{ fontSize: '1.18rem', color: '#64748b', lineHeight: 1.7, wordBreak: 'keep-all', marginBottom: '16px' }}>
                                    단순한 익명을 넘어, 신고자가 안심하고 진실을 말할 수 있는 기술적 인프라를 제공합니다.
                                </p>
                                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: '#64748b', fontSize: '1.07rem', lineHeight: 1.7 }}>
                                    <li style={{ marginBottom: '8px' }}><strong>신고 방식의 자율성:</strong> 신고자의 의사에 따라 기명 또는 무기명(익명) 접수를 자유롭게 선택할 수 있습니다.</li>
                                    <li style={{ marginBottom: '8px' }}><strong>철저한 보안 기술 적용:</strong> IP 추적 방지 기술과 데이터 암호화(End-to-End Encryption) 프로세스를 통해 신고자의 접속 기록과 상담 내용이 외부로 유출되는 것을 원천 차단합니다.</li>
                                    <li><strong>접근 권한 제한:</strong> 지정된 담당자 외에는 누구도 신고 내용에 접근할 수 없도록 독립된 보안 서버에서 관리됩니다.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Value 2 (Reversed) */}
                        <div className="core-value-row reverse" style={{ display: 'flex', alignItems: 'center', position: 'relative', justifyContent: 'flex-end' }}>
                            <div className="core-value-image" style={{ width: '65%', height: '400px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)' }}>
                                <img src="/core_value_2.png" alt="법률 전문가의 심층적인 사건 분석" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85) grayscale(0.2)' }} />
                            </div>
                            <div className="core-value-content-overlap" style={{ width: '45%', position: 'absolute', left: 0, padding: '50px 40px', background: 'var(--white)', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}>
                                <div style={{ fontSize: '1.01rem', color: '#64748b', marginBottom: '8px', fontWeight: 600 }}>Expert Legal Analysis</div>
                                <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '20px', lineHeight: 1.3, letterSpacing: '-0.5px' }}>
                                    법률 전문가의 심층적인 사건 분석
                                </h3>
                                <p style={{ fontSize: '1.18rem', color: '#64748b', lineHeight: 1.7, wordBreak: 'keep-all', marginBottom: '16px' }}>
                                    단순한 접수 대행이 아닌, 실무 경험이 풍부한 변호사들이 전문적인 서비스를 제공합니다.
                                </p>
                                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: '#64748b', fontSize: '1.07rem', lineHeight: 1.7 }}>
                                    <li style={{ marginBottom: '8px' }}><strong>사실관계를 신속·정확하게 판별:</strong> 수사 및 인사·징계위원회 경력을 보유한 변호사들이 신속·정확하게 사실관계를 파악합니다.</li>
                                    <li style={{ marginBottom: '8px' }}><strong>법률적 성격 정밀 판단:</strong> 접수된 사안이 직장 내 괴롭힘, 성희롱 등 관련 법령상 어디에 해당되는지 법리적 관점에서 심층 검토합니다.</li>
                                    <li style={{ marginBottom: '8px' }}><strong>적법성 및 적정성 확보:</strong> 고도의 전문성을 바탕으로 적법성 확보는 물론 문제의 실질적인 해결을 위한 전문적인 자문을 제시합니다.</li>
                                    <li><strong>객관성 및 공정성 유지:</strong> 법무법인 TY의 이름을 걸고 중립적인 위치에서 사안을 분석하여 고객사와 신고자 모두가 신뢰할 수 있는 결과를 도출합니다.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Value 3 */}
                        <div className="core-value-row" style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                            <div className="core-value-image" style={{ width: '65%', height: '400px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)' }}>
                                <img src="/core_value_3.jpg" alt="공백 없는 상시 대응 및 관리 체계" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.8) contrast(1.1)' }} />
                            </div>
                            <div className="core-value-content-overlap" style={{ width: '45%', position: 'absolute', right: 0, padding: '50px 40px', background: 'var(--white)', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}>
                                <div style={{ fontSize: '1.01rem', color: '#64748b', marginBottom: '8px', fontWeight: 600 }}>24/7 Operational Excellence</div>
                                <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '20px', lineHeight: 1.3, letterSpacing: '-0.5px' }}>
                                    공백 없는 상시 대응 및 관리 체계
                                </h3>
                                <p style={{ fontSize: '1.18rem', color: '#64748b', lineHeight: 1.7, wordBreak: 'keep-all', marginBottom: '16px' }}>
                                    위기 상황에 즉각적으로 반응하고, 사건의 시작부터 종결까지 체계적으로 관리합니다.
                                </p>
                                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: '#64748b', fontSize: '1.07rem', lineHeight: 1.7 }}>
                                    <li style={{ marginBottom: '8px' }}><strong>365일 24시간 접수 시스템:</strong> 시간과 장소에 구애받지 않고 언제 어디서든 인권 침해 사실을 알릴 수 있는 상시 채널을 가동합니다.</li>
                                    <li style={{ marginBottom: '8px' }}><strong>긴급 사안 우선 대응:</strong> 피해 확산 방지가 필요한 긴급 사안의 경우, 변호사 즉시 호출 시스템을 통해 신속한 초기 대응 및 법적 조치를 지원합니다.</li>
                                    <li><strong>체계적인 사후 프로세스:</strong> 접수된 신고의 처리 현황을 실시간으로 모니터링하며, 조사 결과 통보 및 재발 방지 대책 수립까지 전 과정을 면밀히 관리합니다.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

// Sub-component moved from Info.jsx
const FeatureCard = ({ number, title, description }) => (
    <div style={{
        padding: '32px',
        backgroundColor: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid #f1f5f9',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    }}>
        <div style={{
            fontSize: '50px',
            fontWeight: 700,
            color: 'var(--color-accent)',
            marginBottom: '16px',
            lineHeight: 1,
        }}>{number}</div>
        <h3 style={{
            fontSize: '22px',
            fontWeight: 600,
            marginBottom: '16px',
            color: 'var(--color-primary)',
        }}>{title}</h3>
        <p style={{
            fontSize: '17px',
            color: 'var(--color-text-muted)',
            lineHeight: 1.7,
        }}>{description}</p>
    </div>
);
