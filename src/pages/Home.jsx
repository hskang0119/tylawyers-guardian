import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Shield, UserCheck, Clock,
    MessageSquareWarning, Search, Scale, FileCheck,
    Building2, Users, Laptop, Gavel,
    Phone, MessageCircle, ArrowRight
} from 'lucide-react';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            {/* Background abstract elements */}
            <div className="floating-circle fc-1"></div>
            <div className="floating-circle fc-2"></div>

            {/* Section 1: Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-headline">
                        법무법인 티와이로이어스 인권상담신고센터
                    </h1>
                    <p className="hero-subheadline">
                        철저한 익명 보장과 전문 변호사의 1:1 밀착 대응으로<br />당신의 일상을 보호합니다.
                    </p>
                    <div className="hero-buttons">
                        <button className="btn-primary" onClick={() => navigate('/report')}>
                            지금 바로 상담하기 <ArrowRight size={20} style={{ display: 'inline', marginLeft: '8px', verticalAlign: 'text-bottom' }} />
                        </button>
                        <button className="btn-secondary" onClick={() => navigate('/info')}>
                            서비스 안내 보기
                        </button>
                    </div>
                </div>
                <img src="/hero-icon.png" alt="TY Lawyers Guardian Shield" className="hero-visual" />
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
                    <h2 className="process-title" style={{ color: "var(--white)" }}>TY Lawyers Guardian 프로세스</h2>
                    <div className="process-steps">
                        <div className="step-card">
                            <div className="step-number"><MessageSquareWarning size={28} color="white" /></div>
                            <h3 className="step-title" style={{ color: "var(--white)" }}>익명 상담 접수</h3>
                            <p className="step-desc">간편한 인터페이스로 흔적 없이<br />안전하게 접수합니다.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number"><Search size={28} color="white" /></div>
                            <h3 className="step-title" style={{ color: "var(--white)" }}>상황 분석 및 배정</h3>
                            <p className="step-desc">사안의 경중을 파악하고<br />최적의 전담 변호사를 배정합니다.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number"><Scale size={28} color="white" /></div>
                            <h3 className="step-title" style={{ color: "var(--white)" }}>맞춤형 전략 수립</h3>
                            <p className="step-desc">의뢰인의 피해를 최소화하는<br />맞춤형 법률 대응 전략을 세웁니다.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number"><FileCheck size={28} color="white" /></div>
                            <h3 className="step-title" style={{ color: "var(--white)" }}>진행 상황 보고 완료</h3>
                            <p className="step-desc">실시간으로 결과를 확인하고<br />안전하게 사후 케어를 받습니다.</p>
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
                            <div className="area-icon"><Building2 size={28} /></div>
                            <div className="area-info">
                                <h3>조직 내 부정비리</h3>
                                <p>횡령, 배임, 금품 수수 등 기업 및 기관 내 주요 비위 행위 대응</p>
                            </div>
                        </div>
                        <div className="area-item">
                            <div className="area-icon"><Users size={28} /></div>
                            <div className="area-info">
                                <h3>직장 내 괴롭힘 & 성희롱</h3>
                                <p>조직 문화 훼손 행위에 대한 익명 제보 및 안전한 진상 조사</p>
                            </div>
                        </div>
                        <div className="area-item">
                            <div className="area-icon"><Laptop size={28} /></div>
                            <div className="area-info">
                                <h3>디지털 범죄 및 정보 유출</h3>
                                <p>영업 비밀 누설 및 디지털 기술을 이용한 신종 범죄 대응 체계</p>
                            </div>
                        </div>
                        <div className="area-item">
                            <div className="area-icon"><Gavel size={28} /></div>
                            <div className="area-info">
                                <h3>일반 민사/형사 법률 분쟁</h3>
                                <p>개인 간의 갈등 및 법적 분쟁을 통합적으로 관리하고 보호</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 5: Final CTA */}
            <section className="cta-section">
                <div className="cta-box">
                    <h2 className="cta-headline">혼자 고민하지 마세요.<br />TY Lawyers Guardian이 함께합니다.</h2>
                    <div className="cta-actions">
                        <button className="btn-white" onClick={() => window.location.href = "tel:02-1234-5678"}>
                            <Phone size={20} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />
                            긴급 보호 요청
                        </button>
                        <button className="btn-outline-white" onClick={() => navigate('/report')}>
                            <MessageCircle size={20} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />
                            온라인 익명 상담
                        </button>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;
