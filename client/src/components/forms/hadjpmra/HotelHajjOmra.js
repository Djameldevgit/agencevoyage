import React from 'react';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const HotelHajjOmra = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation('categories');
    const isRTL = i18n.language === 'ar';

    // Hoteles en La Meca organizados por zona
    const hotelesMeca = [
        {
            grupo: t('primeraLineaMeca', 'Primera Línea - Vista Directa'),
            hoteles: [
                { value: 'abraj_al_bait', label: '🏨 Abraj Al Bait (Makkah Clock Royal Tower)' },
                { value: 'fairmont_makkah', label: '🏨 Fairmont Makkah Clock Royal Tower' },
                { value: 'swissotel_makkah', label: '🏨 Swissotel Makkah' },
                { value: 'movenpick_hotel_clock', label: '🏨 Mövenpick Hotel & Residence Clock Tower' },
                { value: 'rafal_royal', label: '🏨 Rafal Royal Hotel' }
            ]
        },
        {
            grupo: t('zonaCentralMeca', 'Zona Central - A poca distancia'),
            hoteles: [
                { value: 'intercontinental_makkah', label: '🏨 InterContinental Makkah' },
                { value: 'conrad_makkah', label: '🏨 Conrad Makkah' },
                { value: 'hyatt_regency_makkah', label: '🏨 Hyatt Regency Makkah' },
                { value: 'hilton_makkah', label: '🏨 Hilton Makkah Convention' },
                { value: 'marriott_makkah', label: '🏨 Makkah Marriott Hotel' },
                { value: 'pullman_zamzam', label: '🏨 Pullman ZamZam Makkah' }
            ]
        },
        {
            grupo: t('zonaAjyadMeca', 'Zona Ajyad - Cercana'),
            hoteles: [
                { value: 'shaza_makkah', label: '🏨 Shaza Makkah' },
                { value: 'dar_al_tawhid', label: '🏨 Dar Al Tawhid InterContinental' },
                { value: 'makkah_chambers', label: '🏨 Makkah Chambers Hotel' },
                { value: 'ibis_makkah', label: '🏨 Ibis Makkah Hotel' }
            ]
        },
        {
            grupo: t('hotelesEconomicosMeca', 'Hoteles Económicos'),
            hoteles: [
                { value: 'holiday_inn_makkah', label: '🏨 Holiday Inn Makkah' },
                { value: 'al_bait_makkah', label: '🏨 Al Bait Hotel' },
                { value: 'makkah_hotel', label: '🏨 Makkah Hotel' },
                { value: 'safwah_royal', label: '🏨 Safwah Royal Hotel' }
            ]
        }
    ];

    // Hoteles en Medina organizados por zona
    const hotelesMedina = [
        {
            grupo: t('primeraLineaMedina', 'Primera Línea - Vista Directa'),
            hoteles: [
                { value: 'anwar_al_madinah', label: '🏨 Anwar Al Madinah Mövenpick' },
                { value: 'darf_taqwa', label: '🏨 Dar Al Taqwa Hotel' },
                { value: 'al_majeedi_royal', label: '🏨 Al Majeedi Royal Hotel' },
                { value: 'shaza_al_madinah', label: '🏨 Shaza Al Madinah' }
            ]
        },
        {
            grupo: t('zonaCentralMedina', 'Zona Central - A poca distancia'),
            hoteles: [
                { value: 'intercontinental_medina', label: '🏨 InterContinental Medina' },
                { value: 'pullman_medina', label: '🏨 Pullman Medina' },
                { value: 'radisson_blu_medina', label: '🏨 Radisson Blu Medina' },
                { value: 'hilton_medina', label: '🏨 Hilton Medina' },
                { value: 'hyatt_medina', label: '🏨 Hyatt Regency Medina' }
            ]
        },
        {
            grupo: t('zonaOesteMedina', 'Zona Oeste - Cercana'),
            hoteles: [
                { value: 'marriott_medina', label: '🏨 Medina Marriott Hotel' },
                { value: 'sofara_medina', label: '🏨 Sofara Al Hijrah Hotel' },
                { value: 'al_masa', label: '🏨 Al Masa Hotel' },
                { value: 'diyar_medina', label: '🏨 Diyar Al Medina Hotel' }
            ]
        },
        {
            grupo: t('hotelesEconomicosMedina', 'Hoteles Económicos'),
            hoteles: [
                { value: 'holiday_inn_medina', label: '🏨 Holiday Inn Medina' },
                { value: 'al_ansar_royal', label: '🏨 Al Ansar Royal Hotel' },
                { value: 'qasr_al_ain', label: '🏨 Qasr Al Ain Hotel' },
                { value: 'al_haram_hotel', label: '🏨 Al Haram Hotel Medina' }
            ]
        }
    ];

    return (
        <Card className="mb-4">
            <Card.Header  >
                <h5 className="mb-0">
                    🏨 {t('hotelesHajjOmra', 'Hoteles para Hajj & Omra')}
                </h5>
            </Card.Header>
            <Card.Body>
                <Row className={`${isRTL ? 'rtl-direction' : ''} g-3`}>
                    
                    {/* Hotel en La Meca - Mitad izquierda */}
                    <Col xs={12} md={6}>
                        <Form.Group className="h-100">
                            <Form.Label className={`fw-bold ${isRTL ? 'text-end d-block' : ''}`}>
                                🕋 {t('hotelMeca', 'Hotel en La Meca')} *
                            </Form.Label>
                            <Form.Select
                                name="hotelMeca"
                                value={postData.hotelMeca || ''}
                                onChange={handleChangeInput}
                                required
                                className={`w-100 ${isRTL ? 'text-end' : ''}`}
                                dir={isRTL ? 'rtl' : 'ltr'}
                                size="lg"
                            >
                                <option value="">{t('selectHotelMeca', 'Seleccione hotel en La Meca')}</option>
                                {hotelesMeca.map((grupo, index) => (
                                    <optgroup key={index} label={grupo.grupo}>
                                        {grupo.hoteles.map((hotel, hotelIndex) => (
                                            <option key={hotelIndex} value={hotel.value}>
                                                {hotel.label}
                                            </option>
                                        ))}
                                    </optgroup>
                                ))}
                            </Form.Select>
                         
                        </Form.Group>
                    </Col>

                    {/* Hotel en Medina - Mitad derecha */}
                    <Col xs={12} md={6}>
                        <Form.Group className="h-100">
                            <Form.Label className={`fw-bold ${isRTL ? 'text-end d-block' : ''}`}>
                                🕌 {t('hotelMedina', 'Hotel en Medina')} *
                            </Form.Label>
                            <Form.Select
                                name="hotelMedina"
                                value={postData.hotelMedina || ''}
                                onChange={handleChangeInput}
                                required
                                className={`w-100 ${isRTL ? 'text-end' : ''}`}
                                dir={isRTL ? 'rtl' : 'ltr'}
                                size="lg"
                            >
                                <option value="">{t('selectHotelMedina', 'Seleccione hotel en Medina')}</option>
                                {hotelesMedina.map((grupo, index) => (
                                    <optgroup key={index} label={grupo.grupo}>
                                        {grupo.hoteles.map((hotel, hotelIndex) => (
                                            <option key={hotelIndex} value={hotel.value}>
                                                {hotel.label}
                                            </option>
                                        ))}
                                    </optgroup>
                                ))}
                            </Form.Select>
                            
                        </Form.Group>
                    </Col>

                </Row>

                
 
            </Card.Body>
        </Card>
    );
};

export default HotelHajjOmra;