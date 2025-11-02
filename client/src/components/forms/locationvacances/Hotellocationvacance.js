import React from 'react';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Hotellocationvacance = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation('categories');
    const isRTL = i18n.language === 'ar';

    const tiposPropiedades = [
        { value: 'villa', label: '🏠 ' + t('villa', 'Villa') },
        { value: 'apartamento', label: '🏢 ' + t('apartamento', 'Apartamento') },
        { value: 'studio', label: '🔲 ' + t('studio', 'Studio') },
        { value: 'riad', label: '🏺 ' + t('riad', 'Riad') },
        { value: 'chalet', label: '⛰️ ' + t('chalet', 'Chalet') },
    ];

    const capacidades = [
        { value: '1_2', label: t('1_2_personas', '1-2 personas') },
        { value: '2_4', label: t('2_4_personas', '2-4 personas') },
        { value: '4_6', label: t('4_6_personas', '4-6 personas') },
        { value: '6_8', label: t('6_8_personas', '6-8 personas') },
        { value: '8_plus', label: t('8_plus_personas', '8+ personas') },
    ];

    return (
        <Card className="mb-4">
            <Card.Body>
                <Row className={`${isRTL ? 'rtl-direction' : ''}`}>
                    
                    

                    {/* Capacidad */}
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('capacidad', 'Capacidad')} *
                            </Form.Label>
                            <Form.Select
                                name="capacidad"
                                value={postData.capacidad || ''}
                                onChange={handleChangeInput}
                                required
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            >
                                <option value="">{t('selectCapacidad', 'Número de personas')}</option>
                                {capacidades.map((cap, index) => (
                                    <option key={index} value={cap.value}>
                                        {cap.label}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* Habitaciones */}
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('habitaciones', 'Habitaciones')}
                            </Form.Label>
                            <Form.Control
                                type="number"
                                name="habitaciones"
                                value={postData.habitaciones || ''}
                                onChange={handleChangeInput}
                                min="1"
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            />
                        </Form.Group>
                    </Col>

                    {/* Superficie opcional */}
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('superficie', 'Superficie (m²)')}
                            </Form.Label>
                            <Form.Control
                                type="number"
                                name="superficie"
                                value={postData.superficie || ''}
                                onChange={handleChangeInput}
                                placeholder="m²"
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            />
                        </Form.Group>
                    </Col>

                </Row>
            </Card.Body>
        </Card>
    );
};

export default Hotellocationvacance;
