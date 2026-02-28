import React from 'react';
import Hero from '../components/Hero';
import { MapPin, Phone, Printer, Mail, Train, Bus, Car } from 'lucide-react';

const Contact = () => {
    return (
        <div style={styles.container}>
            <Hero title="사무실위치" bgImage="/hero_contact_v2.png" />

            <div className="container" style={styles.contentWrapper}>

                {/* LOCATION TITLE */}
                <div style={styles.sectionTitleWrapper}>
                    <span style={styles.sectionTitleEn}>LOCATION</span>
                    <span style={styles.sectionTitleSeparator}>/</span>
                    <span style={styles.sectionTitleKo}>사무실 위치</span>
                </div>

                {/* Map Section */}
                <div style={styles.mapContainer}>
                    <div style={styles.mapWrapper}>
                        <iframe
                            title="TY Lawyers Location Map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.344414603099!2d127.0289133!3d37.487994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca15bf481a511%3A0x6fb0d26bfd22fb41!2z7ISc7Jq47Yq567OE7IucIOyEnOy0iOq1rCDrgrjrj4Trj5kg6rCV64Ko64yA66GcIDI5MQ!5e0!3m2!1sko!2skr!4v1715000000000!5m2!1sko!2skr"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                    {/* Map Buttons */}
                    <div style={styles.mapButtons}>
                        <a href="https://map.naver.com/p/search/%EA%B0%95%EB%82%A8%EB%8C%80%EB%A1%9C%20291" target="_blank" rel="noopener noreferrer" style={styles.naverBtn}>
                            <span style={styles.btnIcon}>N</span> 네이버 지도
                        </a>
                        <a href="https://map.kakao.com/link/search/강남대로 291" target="_blank" rel="noopener noreferrer" style={styles.kakaoBtn}>
                            <span style={styles.btnIcon}>K</span> 카카오맵
                        </a>
                    </div>
                </div>

                {/* Contact Info Cards */}
                <div style={styles.contactCardsContainer}>
                    <div style={styles.contactCard}>
                        <div style={styles.cardIconWrapper}><MapPin size={24} color="#1e3a8a" /></div>
                        <h4 style={styles.cardTitle}>주소</h4>
                        <p style={styles.cardText}>서울 서초구 강남대로 291,<br />11층 (서초동, 남강빌딩)</p>
                    </div>
                    <div style={styles.contactCard}>
                        <div style={styles.cardIconWrapper}><Phone size={24} color="#1e3a8a" /></div>
                        <h4 style={styles.cardTitle}>대표전화</h4>
                        <p style={styles.cardText}>02-3481-0330</p>
                    </div>
                    <div style={styles.contactCard}>
                        <div style={styles.cardIconWrapper}><Printer size={24} color="#1e3a8a" /></div>
                        <h4 style={styles.cardTitle}>팩스</h4>
                        <p style={styles.cardText}>02-3481-2103</p>
                    </div>
                    <div style={styles.contactCard}>
                        <div style={styles.cardIconWrapper}><Mail size={24} color="#1e3a8a" /></div>
                        <h4 style={styles.cardTitle}>이메일</h4>
                        <p style={styles.cardText}>tylawyers@tylaw.co.kr</p>
                    </div>
                </div>

                {/* DIRECTIONS TITLE */}
                <div style={{ ...styles.sectionTitleWrapper, marginTop: '80px' }}>
                    <span style={styles.sectionTitleEn}>DIRECTIONS</span>
                    <span style={styles.sectionTitleSeparator}>/</span>
                    <span style={styles.sectionTitleKo}>오시는 길 안내</span>
                </div>

                {/* Directions List */}
                <div style={styles.directionsList}>
                    {/* Location Desc */}
                    <div style={styles.directionRow}>
                        <div style={styles.directionIconCol}>
                            <div style={styles.directionIconBox}><MapPin size={24} color="#475569" strokeWidth={1.5} /></div>
                            <span style={styles.directionLabel}>위치 설명</span>
                        </div>
                        <div style={styles.directionContentCol}>
                            <p style={styles.directionMainText}>강남역과 양재역 사이 뱅뱅사거리 기아자동차 건물 11층</p>
                            <p style={styles.directionSubText}>(남강빌딩, 기아 360 전시장 건물)</p>
                        </div>
                    </div>

                    {/* Subway */}
                    <div style={styles.directionRow}>
                        <div style={styles.directionIconCol}>
                            <div style={styles.directionIconBox}><Train size={24} color="#475569" strokeWidth={1.5} /></div>
                            <span style={styles.directionLabel}>지하철</span>
                        </div>
                        <div style={styles.directionContentCol}>
                            <div style={styles.transitLine}>
                                <span style={{ ...styles.badge, backgroundColor: '#00A84D' }}>2호선</span>
                                <span style={{ ...styles.badge, backgroundColor: '#D4003B' }}>신분당선</span>
                                <span style={styles.transitStation}>강남역 4번 출구</span>
                                <span style={styles.transitDesc}>(도보 약 15분, 뱅뱅사거리 방향)</span>
                            </div>
                            <div style={styles.transitLine}>
                                <span style={{ ...styles.badge, backgroundColor: '#FE7E00' }}>3호선</span>
                                <span style={{ ...styles.badge, backgroundColor: '#D4003B' }}>신분당선</span>
                                <span style={styles.transitStation}>양재역 3번 출구</span>
                                <span style={styles.transitDesc}>(도보 약 10분, 뱅뱅사거리 방향)</span>
                            </div>
                        </div>
                    </div>

                    {/* Bus */}
                    <div style={styles.directionRow}>
                        <div style={styles.directionIconCol}>
                            <div style={styles.directionIconBox}><Bus size={24} color="#475569" strokeWidth={1.5} /></div>
                            <span style={styles.directionLabel}>버스</span>
                        </div>
                        <div style={styles.directionContentCol}>
                            <p style={styles.directionMainText}>뱅뱅사거리(중) 정류장 하차</p>
                            <div style={{ marginTop: '12px', lineHeight: 1.7 }}>
                                <p style={styles.busText}><span style={{ color: '#1e3a8a', fontWeight: 600, marginRight: '8px' }}>간선</span> 140, 400, 402, 407, 420, 421, 440, 441, 462, 470, 471, 542</p>
                                <p style={styles.busText}><span style={{ color: '#E11D48', fontWeight: 600, marginRight: '8px' }}>광역</span> 9100, 9200, 9201, 9300, M4403</p>
                            </div>
                        </div>
                    </div>

                    {/* Car */}
                    <div style={styles.directionRow}>
                        <div style={styles.directionIconCol}>
                            <div style={styles.directionIconBox}><Car size={24} color="#475569" strokeWidth={1.5} /></div>
                            <span style={styles.directionLabel}>자가용 이용</span>
                        </div>
                        <div style={styles.directionContentCol}>
                            <p style={styles.directionMainText}>내비게이션 검색: <strong>'강남대로 291'</strong> 또는 <strong>'남강빌딩'</strong></p>
                            <p style={{ ...styles.directionSubText, marginTop: '8px' }}>※ 건물 내 주차장 이용 가능 (만차 시 인근 유료 주차장 이용)</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

const styles = {
    container: {
        paddingBottom: '100px',
        backgroundColor: '#fbfbfb', // Subtle off-white to match the screenshot
    },
    contentWrapper: {
        paddingTop: '60px',
    },
    sectionTitleWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        marginBottom: '24px',
        maxWidth: '960px',
        margin: '0 auto 24px auto',
    },
    sectionTitleEn: {
        color: '#1e3a8a', // Dark blue
        fontSize: '26px',
        fontWeight: 800,
        letterSpacing: '0.5px',
    },
    sectionTitleSeparator: {
        color: '#ccc',
        fontSize: '22px',
    },
    sectionTitleKo: {
        color: '#222',
        fontSize: '24px',
        fontWeight: 700,
    },
    mapContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '40px',
        width: '100%',
        maxWidth: '960px',
        margin: '0 auto 40px auto',
    },
    mapWrapper: {
        width: '100%',
        height: '400px',
        backgroundColor: '#eee',
        border: '1px solid #e1e1e1',
        borderRadius: '4px',
        overflow: 'hidden',
    },
    mapButtons: {
        display: 'flex',
        gap: '12px',
        justifyContent: 'center',
        marginTop: '20px',
    },
    naverBtn: {
        backgroundColor: '#03C75A',
        color: '#fff',
        padding: '14px 40px',
        borderRadius: '4px',
        textDecoration: 'none',
        fontWeight: 600,
        fontSize: '17px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        minWidth: '180px',
        justifyContent: 'center',
        transition: 'opacity 0.2s',
    },
    kakaoBtn: {
        backgroundColor: '#FEE500',
        color: '#191919',
        padding: '14px 40px',
        borderRadius: '4px',
        textDecoration: 'none',
        fontWeight: 600,
        fontSize: '17px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        minWidth: '180px',
        justifyContent: 'center',
        transition: 'opacity 0.2s',
    },
    btnIcon: {
        fontWeight: 'bold',
        fontSize: '18px',
    },
    contactCardsContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        maxWidth: '960px',
        margin: '0 auto',
    },
    contactCard: {
        backgroundColor: '#fff',
        border: '1px solid #e1e1e1',
        borderRadius: '8px',
        padding: '32px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
    },
    cardIconWrapper: {
        marginBottom: '16px',
        opacity: 0.9,
    },
    cardTitle: {
        fontSize: '18px',
        fontWeight: 700,
        color: '#222',
        marginBottom: '12px',
        margin: '0 0 12px 0',
    },
    cardText: {
        fontSize: '16px',
        color: '#555',
        lineHeight: 1.7,
        margin: 0,
        wordBreak: 'keep-all',
    },
    directionsList: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        borderTop: '2px solid #f1f5f9',
        maxWidth: '960px',
        margin: '0 auto',
    },
    directionRow: {
        display: 'flex',
        borderBottom: '1px solid #f1f5f9',
        padding: '32px 0',
        alignItems: 'flex-start',
    },
    directionIconCol: {
        flex: '0 0 200px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        paddingLeft: '32px',
    },
    directionIconBox: {
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        backgroundColor: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    directionLabel: {
        fontWeight: 700,
        fontSize: '17px',
        color: '#334155',
    },
    directionContentCol: {
        flex: '1',
        paddingRight: '32px',
        paddingTop: '6px',
    },
    directionMainText: {
        fontSize: '17px',
        fontWeight: 600,
        color: '#1e3a8a',
        margin: '0 0 8px 0',
    },
    directionSubText: {
        fontSize: '16px',
        color: '#64748b',
        margin: 0,
    },
    transitLine: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px',
        marginBottom: '10px',
    },
    badge: {
        color: '#fff',
        fontSize: '14px',
        fontWeight: 700,
        padding: '3px 8px',
        borderRadius: '4px',
        textAlign: 'center',
    },
    transitStation: {
        fontWeight: 700,
        fontSize: '16px',
        color: '#1e3a8a',
        marginLeft: '4px',
    },
    transitDesc: {
        fontSize: '16px',
        color: '#64748b',
    },
    busText: {
        margin: '0 0 6px 0',
        fontSize: '16px',
        color: '#334155',
    }
};

const styleSheet = document.createElement("style");
styleSheet.innerText = `
  .map-btn:hover {
    opacity: 0.9;
  }
  @media (max-width: 900px) {
    div[style*="repeat(4, 1fr)"] {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }
  @media (max-width: 600px) {
    div[style*="repeat(4, 1fr)"] {
      grid-template-columns: 1fr !important;
    }
    div[style*="flex: '0 0 200px'"] {
      flex: 0 0 auto !important;
      padding-left: 0 !important;
      margin-bottom: 16px;
    }
    div[style*="borderBottom: '1px solid #f1f5f9'"] {
      flex-direction: column !important;
      padding: 24px 16px !important;
    }
    div[style*="paddingRight: '32px'"] {
      padding-right: 0 !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default Contact;
