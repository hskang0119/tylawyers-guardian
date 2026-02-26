import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FileEdit, FileSearch, Users, ClipboardCheck, ShieldCheck, Shield, ChevronRight } from 'lucide-react';
import Hero from '../components/Hero';

const Info = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get('tab') || 'method';

    const handleTabChange = (tab) => {
        setSearchParams({ tab });
    };

    return (
        <div style={styles.container}>
            <Hero title="이용안내" breadcrumb="이용안내" />

            {/* Page Navigator */}
            <div style={styles.navigatorWrapper}>
                <div style={styles.navigatorContainer}>
                    <button
                        onClick={() => handleTabChange('method')}
                        style={{ ...styles.navButton, ...(activeTab === 'method' ? styles.navButtonActive : {}) }}
                    >
                        신고방법
                    </button>
                    <button
                        onClick={() => handleTabChange('procedure')}
                        style={{ ...styles.navButton, ...(activeTab === 'procedure' ? styles.navButtonActive : {}) }}
                    >
                        사건처리절차
                    </button>
                    <button
                        onClick={() => handleTabChange('faq')}
                        style={{ ...styles.navButton, ...(activeTab === 'faq' ? styles.navButtonActive : {}) }}
                    >
                        자주묻는질문
                    </button>
                </div>
            </div>

            {/* Service Intro (신고방법) - Moved to Home.jsx */}
            {activeTab === 'method' && (
                <section id="method" style={styles.introSection}>
                    <div className="container">
                        <div style={styles.introHeader}>
                            <h2 style={styles.title}>신고방법</h2>
                            <p style={styles.subtitle}>
                                메인 페이지 상단에서 등록된 <strong>고객사(기관)명</strong>을 검색하여 신고 접수를 진행하실 수 있습니다.
                            </p>
                        </div>
                    </div>
                </section>
            )}

            {/* Incident Processing Procedure Section (처리절차) */}
            {activeTab === 'procedure' && (
                <section id="procedure" style={styles.procedureSection}>
                    <div className="container" style={styles.procedureContainer}>
                        <div style={styles.procedureHeader}>
                            <h2 style={{ fontSize: '20px', color: 'var(--color-primary)', fontWeight: 600, marginBottom: '8px' }}>사건처리절차</h2>
                            <h3 style={styles.procedureMainTitle}>신고 접수된 사건은 다음과 같이 처리됩니다.</h3>
                            <p style={styles.procedureSubtitle}>
                                외부 독립 기관의 전문적인 대응으로 더욱 빠르고 공정한 처리가 가능합니다. 하단의 세부 진행 절차를 확인해 주세요.
                            </p>
                        </div>

                        {/* Procedure Flowchart */}
                        <div style={styles.flowchartWrapper}>
                            <div style={styles.flowchartRow}>
                                {[
                                    { id: 1, title: '신고접수', icon: <FileEdit size={36} color="var(--color-primary)" strokeWidth={1.8} /> },
                                    { id: 2, title: '기초조사', icon: <FileSearch size={36} color="var(--color-primary)" strokeWidth={1.8} /> },
                                    { id: 3, title: '심층조사', icon: <Users size={36} color="var(--color-primary)" strokeWidth={1.8} /> },
                                    { id: 4, title: '결과보고', icon: <ClipboardCheck size={36} color="var(--color-primary)" strokeWidth={1.8} /> },
                                    { id: 5, title: '구제조치', icon: <Shield size={32} color="var(--color-primary)" strokeWidth={1.8} /> },
                                ].map((step, index) => (
                                    <React.Fragment key={step.id}>
                                        <div style={styles.flowStep}>
                                            <div style={styles.flowIconBox}>
                                                {step.icon}
                                            </div>
                                            <span style={styles.flowStepTitle}>{step.title}</span>
                                        </div>
                                        {index < 4 && (
                                            <div style={styles.flowArrowBox}>
                                                <ChevronRight size={32} color="#0f172a" strokeWidth={2} />
                                            </div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        {/* Step Details */}
                        <div style={styles.stepDetailsGrid}>
                            {/* 1 */}
                            <div style={styles.stepDetailCard}>
                                <h3 style={styles.stepDetailTitle}>신고접수</h3>
                                <p style={styles.stepDetailText}>
                                    IP 추적 방지 및 암호화 기술을 통해 신고자의 익명성을 완벽히 보장합니다. 접수 즉시 고유 번호가 발급되며, 이를 통해 언제든 진행 상황을 안전하게 확인할 수 있습니다.
                                </p>
                            </div>
                            {/* 2 */}
                            <div style={styles.stepDetailCard}>
                                <h3 style={styles.stepDetailTitle}>기초조사</h3>
                                <p style={styles.stepDetailText}>
                                    전담 변호사가 접수된 내용을 바탕으로 신속하게 관련 법령 및 사내 규정 위반 여부를 1차 검토합니다. 추가 증거가 필요하거나 보완이 필요한 경우, 신고인과 안전하게 소통합니다. 기초조사결과 인권침해 신고가 아닌 일반 민원이거나, 신고내용 자체로 인권침해가 인정되지 않는 경우 신고인과 고객사에 통보 후 종결될 수 있습니다. 기초조사결과 심층조사가 필요하다고 인정되는 경우 신고인과 고객사에 통보 후 심층조사 절차를 진행합니다.
                                </p>
                            </div>
                            {/* 3 */}
                            <div style={styles.stepDetailCard}>
                                <h3 style={styles.stepDetailTitle}>심층조사</h3>
                                <p style={styles.stepDetailText}>
                                    전담변호사가 직접 관련자 문답 및 물적 증거 분석을 수행합니다. 조사 전 과정에서 피해자 보호를 최우선으로 하며, 피조사자의 방어권 또한 공정하게 보장합니다.
                                </p>
                            </div>
                            {/* 4 */}
                            <div style={styles.stepDetailCard}>
                                <h3 style={styles.stepDetailTitle}>결과보고</h3>
                                <p style={styles.stepDetailText}>
                                    수집된 증거와 진술을 종합하여 사건 성립 여부에 대한 최종 법률 의견서를 작성합니다. 작성된 보고서는 보안이 유지된 상태로 의사결정권자에게 전달되어 합리적인 판단의 근거가 됩니다.
                                </p>
                            </div>
                            {/* 5 */}
                            <div style={styles.stepDetailCard}>
                                <h3 style={styles.stepDetailTitle}>구제조치</h3>
                                <p style={styles.stepDetailText}>
                                    조사 결과를 바탕으로 가해자 처분 및 피해자 보호(근무장소 변경, 유급휴가 등)를 시행합니다. 사건 종결 후에도 사후 모니터링을 통해 재발 방지와 건강한 조직 문화를 만드는 데 끝까지 함께합니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* FAQ Section (자주묻는질문) */}
            {activeTab === 'faq' && (
                <section id="faq" style={styles.faqSection}>
                    <div className="container" style={styles.faqContainer}>
                        <h2 style={styles.sectionTitle}>Q&A (자주 묻는 질문)</h2>
                        <div style={styles.accordionContainer}>
                            <AccordionItem
                                question="정말 익명이 보장되나요?"
                                answer="네, 전면 보장됩니다. 본 시스템은 익명 제보를 기본으로 하며, 암호화된 통신을 사용합니다. 필요시 직접 연락처를 남기지 않는 한, 당 법무법인이나 귀하의 소속 기관에서 제보자를 추적할 수 없습니다."
                            />
                            <AccordionItem
                                question="신고로 인한 불이익은 없나요?"
                                answer="관련 법령 및 규정에 따라 신고자는 철저히 보호되며, 정당한 신고를 이유로 어떠한 인사상 불이익이나 차별 대우를 받지 않습니다. 당사 변호사가 이 부분에 대한 법률적 리스크도 함께 검토합니다."
                            />
                            <AccordionItem
                                question="어떤 절차로 조사가 진행되나요?"
                                answer="신고 접수 -> 법무법인 티와이로이어스 변호사 1차 검토 -> 소속 기관의 감사/윤리 부서로 익명화된 내용 전달 -> 조사 진행 -> 결과 피드백 순으로 진행됩니다. 모든 진행 상황은 '진행상황조회' 메뉴에서 조회 가능합니다."
                            />
                            <AccordionItem
                                question="어떤 내용을 신고할 수 있나요?"
                                answer="조직 내 부정비리(횡령, 배임, 금품 수수 등), 직장 내 괴롭힘, 성희롱 등 조직의 윤리 강령을 위반하거나 법적 문제가 될 수 있는 모든 사안을 신고할 수 있습니다."
                            />
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

// Sub-components

const AccordionItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div style={styles.accordionItem}>
            <button
                style={{ ...styles.accordionButton, color: isOpen ? 'var(--color-primary)' : 'var(--color-text-main)' }}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span style={styles.questionText}>{question}</span>
                <span style={{ ...styles.chevron, transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}>
                    ▼
                </span>
            </button>
            <div style={{
                ...styles.accordionContent,
                maxHeight: isOpen ? '500px' : '0',
                padding: isOpen ? '16px 24px 24px' : '0 24px',
                opacity: isOpen ? 1 : 0
            }}>
                {answer}
            </div>
        </div>
    );
};

const styles = {
    container: {
        paddingBottom: '80px',
    },
    // Page Navigator
    navigatorWrapper: {
        position: 'relative',
        zIndex: 10,
        marginTop: '-28px', // Overlaps Hero
        display: 'flex',
        justifyContent: 'center',
        padding: '0 20px',
    },
    navigatorContainer: {
        display: 'flex',
        gap: '24px', // Space between buttons
        width: '100%',
        maxWidth: '1200px', // Uniform container width
    },
    navButton: {
        flex: 1,
        padding: '24px 0',
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        fontSize: '20px',
        fontWeight: 600,
        color: '#64748b',
        cursor: 'pointer',
        transition: 'all 0.2s',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
    },
    navButtonActive: {
        backgroundColor: '#1e3a8a', // Dark navy
        color: '#ffffff',
        borderColor: '#1e3a8a',
        boxShadow: '0 10px 15px -3px rgba(30, 58, 138, 0.4)',
        transform: 'translateY(-2px)',
    },
    // Intro Section
    introSection: {
        padding: '60px 0',
        backgroundColor: '#f8fafc',
    },
    introHeader: {
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto 60px',
    },
    title: {
        fontSize: '36px',
        fontWeight: 700,
        color: 'var(--color-text-main)',
        marginBottom: '20px',
    },
    subtitle: {
        fontSize: '18px',
        color: 'var(--color-text-muted)',
        lineHeight: 1.6,
    },
    // FAQ Section
    faqSection: {
        padding: '80px 0',
        backgroundColor: '#f8fafc',
    },
    faqContainer: {
        width: '100%',
    },
    sectionTitle: {
        fontSize: '28px',
        fontWeight: 700,
        textAlign: 'center',
        marginBottom: '40px',
        color: 'var(--color-text-main)',
    },
    accordionContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    accordionItem: {
        backgroundColor: 'var(--color-white)',
        borderRadius: 'var(--radius-md)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden',
        border: '1px solid #f1f5f9',
        marginBottom: '8px',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    },
    accordionButton: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 24px',
        backgroundColor: 'transparent',
        fontWeight: 600,
        fontSize: '16px',
        transition: 'color 0.2s',
    },
    questionText: {
        textAlign: 'left',
        paddingRight: '16px',
    },
    chevron: {
        fontSize: '12px',
        transition: 'transform 0.3s ease',
    },
    accordionContent: {
        transition: 'all 0.3s ease-in-out',
        lineHeight: 1.6,
        color: 'var(--color-text-muted)',
        backgroundColor: 'var(--color-white)',
    },
    procedureSection: {
        padding: '80px 0',
        backgroundColor: '#f8fafc',
    },
    procedureContainer: {
        width: '100%',
        margin: '0 auto',
    },
    procedureHeader: {
        textAlign: 'center',
        marginBottom: '60px',
    },
    procedureMainTitle: {
        fontSize: '32px',
        fontWeight: 700,
        color: 'var(--color-text-main)',
        marginBottom: '16px',
        wordBreak: 'keep-all',
    },
    procedureSubtitle: {
        fontSize: '16px',
        color: 'var(--color-text-muted)',
        lineHeight: 1.6,
        wordBreak: 'keep-all',
    },
    flowchartWrapper: {
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '60px 40px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        marginBottom: '60px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    flowchartRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flexWrap: 'wrap',
        gap: '16px',
    },
    flowStep: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '160px',
    },
    flowArrowBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        marginTop: '34px', // align with the middle of the 100px icon box
    },
    flowIconBox: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        backgroundColor: '#f1f5f9', // Light navy background
        border: '4px solid var(--color-primary)', // Navy border matching the icon
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
    },
    flowStepTitle: {
        fontSize: '16px',
        fontWeight: 700,
        color: '#1e293b',
        textAlign: 'center',
        wordBreak: 'keep-all',
        lineHeight: 1.2,
        marginTop: '16px', // space between circle and title
    },
    stepDetailsGrid: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
    },
    stepDetailCard: {
        backgroundColor: '#ffffff',
        padding: '32px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        border: '1px solid #f1f5f9',
        borderLeft: '6px solid var(--color-primary)', // Match theme
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    },
    stepDetailTitle: {
        fontSize: '20px',
        fontWeight: 700,
        color: 'var(--color-primary)',
        marginBottom: '12px',
    },
    stepDetailText: {
        fontSize: '15.5px',
        color: '#374151',
        lineHeight: 1.7,
        wordBreak: 'keep-all',
    },
};

export default Info;
