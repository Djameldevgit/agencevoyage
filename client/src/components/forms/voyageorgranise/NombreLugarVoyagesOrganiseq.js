import React from 'react';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const NombreLugarVoyagesOrganises = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation('categories');
    const isRTL = i18n.language === 'ar';

    return (
        <Card className="mb-3">
            <Card.Header  >
                <h5 className="mb-0">
                    🏨 {t('informacionHotel', 'Información del Hotel')}
                </h5>
            </Card.Header>
            <Card.Body className="p-3">
                <Row className={`${isRTL ? 'rtl-direction' : ''} g-3`}>
                    {/* Nombre del Hotel */}
                    <Col xs={12} md={6}>
                        <Form.Group className="w-100">
                            <Form.Control
                                type="text"
                                name="nombreHotel"
                                value={postData.nombreHotel || ''}
                                onChange={handleChangeInput}
                                placeholder={t('placeholderNombreHotel', 'Nombre del hotel...')}
                                required
                                className={`w-100 ${isRTL ? 'text-end' : ''}`}
                                dir={isRTL ? 'rtl' : 'ltr'}
                                size="lg"
                            />
                        </Form.Group>
                    </Col>

                    {/* Ciudad */}
                    <Col xs={12} md={6}>
                        <Form.Group className="w-100">
                            <Form.Control
                                type="text"
                                name="ciudadHotel"
                                value={postData.ciudadHotel || ''}
                                onChange={handleChangeInput}
                                placeholder={t('placeholderCiudad', 'Ciudad...')}
                                required
                                className={`w-100 ${isRTL ? 'text-end' : ''}`}
                                dir={isRTL ? 'rtl' : 'ltr'}
                                size="lg"
                            />
                        </Form.Group>
                    </Col>

                    {/* Zona/Región */}
                    <Col xs={12} md={6}>
                        <Form.Group className="w-100">
                            <Form.Select
                                name="zonaRegion"
                                value={postData.zonaRegion || ''}
                                onChange={handleChangeInput}
                                required
                                className={`w-100 ${isRTL ? 'text-end' : ''}`}
                                dir={isRTL ? 'rtl' : 'ltr'}
                                size="lg"
                            >
                                <option value="">{t('selectZona', 'Seleccione la zona')}</option>
                                <option value="centro_ciudad">🏙️ {t('centro_ciudad', 'Centro ciudad')}</option>
                                <option value="playa">🏖️ {t('zona_playa', 'Zona de playa')}</option>
                                <option value="montana">⛰️ {t('zona_montana', 'Zona de montaña')}</option>
                                <option value="historica">🏛️ {t('zona_historica', 'Zona histórica')}</option>
                                <option value="comercial">🛍️ {t('zona_comercial', 'Zona comercial')}</option>
                                <option value="residencial">🏘️ {t('zona_residencial', 'Zona residencial')}</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* Dirección del Hotel */}
                    <Col xs={12}>
                        <Form.Group className="w-100">
                            <Form.Control
                                type="text"
                                name="direccionHotel"
                                value={postData.direccionHotel || ''}
                                onChange={handleChangeInput}
                                placeholder={t('placeholderDireccionHotel', 'Dirección completa del hotel...')}
                                required
                                className={`w-100 ${isRTL ? 'text-end' : ''}`}
                                dir={isRTL ? 'rtl' : 'ltr'}
                                size="lg"
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default NombreLugarVoyagesOrganises;