import React from 'react';
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
                        외부 전문기관 법무법인 티와이로이어스가 신고 접수 및 조사를 통해<br />고객사 임직원의 인권을 보호합니다.
                    </p>
                    <div className="hero-buttons">
                        <button className="btn-primary" onClick={() => navigate('/report')}>
                            신고서 작성하기 <ArrowRight size={20} style={{ display: 'inline', marginLeft: '8px', verticalAlign: 'text-bottom' }} />
                        </button>
                        <button className="btn-secondary" onClick={() => navigate('/info')}>
                            신고안내 보기
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
