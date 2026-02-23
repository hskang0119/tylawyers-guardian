import React from 'react';
import Hero from '../components/Hero';

const Info = () => {
    return (
        <div style={styles.container}>
            <Hero title="신고 안내" breadcrumb="신고 안내" />
            {/* Service Intro */}
            <section style={styles.introSection}>
                <div className="container">
                    <div style={styles.introHeader}>
                        <h1 style={styles.title}>신고 안내</h1>
                        <p style={styles.subtitle}>
                            <strong>인권상담신고센터</strong>는 조직의 건강한 문화를 위해 외부 독립 기관(법무법인 티와이로이어스)이 운영하는 안전한 신고 채널입니다.<br />
                            누구나 안심하고 직장 내 발생하는 부조리를 신고할 수 있도록 철저한 익명성과 정보 보안을 최우선으로 합니다.
                        </p>
                    </div>

                    <div style={styles.featuresGrid}>
                        <FeatureCard
                            number="01"
                            title="독립적인 외부 기관 운영"
                            description="사내 부서가 아닌 법무법인 티와이로이어스가 직접 접수하고 1차 검토를 진행하여 공정성과 객관성을 확보합니다."
                        />
                        <FeatureCard
                            number="02"
                            title="철저한 신분 보장"
                            description="익명 신고 시스템 및 암호화 기술을 적용하여 신고자의 IP나 개인 식별 정보가 조직에 절대 유출되지 않습니다."
                        />
                        <FeatureCard
                            number="03"
                            title="전문 변호사의 직접 검토"
                            description="접수된 내용은 당 법무법인의 전문 변호사가 직접 법률적 관점에서 검토하고 안전한 처리 방향을 제시합니다."
                        />
                        <FeatureCard
                            number="04"
                            title="투명한 진행 절차"
                            description="신고자는 접수번호와 비밀번호를 통해 안전하게 진행 상황을 조회하고 담당 변호사의 피드백을 확인할 수 있습니다."
                        />
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" style={styles.faqSection}>
                <div className="container" style={styles.faqContainer}>
                    <h2 style={styles.sectionTitle}>자주 묻는 질문 (FAQ)</h2>
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
                            answer="신고 접수 -> 법무법인 티와이로이어스 변호사 1차 검토 -> 소속 기관의 감사/윤리 부서로 익명화된 내용 전달 -> 조사 진행 -> 결과 피드백 순으로 진행됩니다. 모든 진행 상황은 '신고 확인' 메뉴에서 조회 가능합니다."
                        />
                        <AccordionItem
                            question="어떤 내용을 신고할 수 있나요?"
                            answer="조직 내 부정비리(횡령, 배임, 금품 수수 등), 직장 내 괴롭힘, 성희롱 등 조직의 윤리 강령을 위반하거나 법적 문제가 될 수 있는 모든 사안을 신고할 수 있습니다."
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

// Sub-components
const FeatureCard = ({ number, title, description }) => (
    <div style={styles.featureCard}>
        <div style={styles.featureNumber}>{number}</div>
        <h3 style={styles.featureTitle}>{title}</h3>
        <p style={styles.featureDescription}>{description}</p>
    </div>
);

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
    // Intro Section
    introSection: {
        padding: '60px 0',
        backgroundColor: 'var(--color-white)',
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
    featuresGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '32px',
    },
    featureCard: {
        padding: '32px',
        backgroundColor: 'var(--color-bg-light)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
    },
    featureNumber: {
        fontSize: '48px',
        fontWeight: 700,
        color: 'var(--color-accent)',
        marginBottom: '16px',
        lineHeight: 1,
    },
    featureTitle: {
        fontSize: '20px',
        fontWeight: 600,
        marginBottom: '16px',
        color: 'var(--color-primary)',
    },
    featureDescription: {
        fontSize: '15px',
        color: 'var(--color-text-muted)',
        lineHeight: 1.6,
    },
    // FAQ Section
    faqSection: {
        padding: '80px 0',
        backgroundColor: 'var(--color-bg-light)',
    },
    faqContainer: {
        maxWidth: '800px',
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
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden',
        border: '1px solid var(--color-border)',
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
};

export default Info;
