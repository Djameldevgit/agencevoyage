import React from 'react';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const NombreLugarVoyagesOrganises = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation('categories');
    const isRTL = i18n.language === 'ar';

    return (
        <Card className="mb-4">
          
            <Card.Body>
                <Row className={`${isRTL ? 'rtl-direction' : ''}`}>
                    {/* Nombre del Hotel */}
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('nombreHotel', 'Nombre del Hotel')} *
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="nombreHotel"
                                value={postData.nombreHotel || ''}
                                onChange={handleChangeInput}
                                placeholder={t('placeholderNombreHotel', 'Ej: Hotel Riu Palace, Marriott...')}
                                required
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            />
                        </Form.Group>
                    </Col>

                    {/* Cadena Hotelera */}
               
                    {/* Ciudad y País */}
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('ciudad', 'Ciudad')} *
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="ciudadHotel"
                                value={postData.ciudadHotel || ''}
                                onChange={handleChangeInput}
                                placeholder={t('placeholderCiudad', 'Ej: Istanbul, Marrakech, Paris...')}
                                required
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            />
                        </Form.Group>
                    </Col>

                   

                    {/* Dirección del Hotel */}
                    <Col xs={12}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('direccionHotel', 'Dirección del Hotel')} *
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="direccionHotel"
                                value={postData.direccionHotel || ''}
                                onChange={handleChangeInput}
                                placeholder={t('placeholderDireccionHotel', 'Dirección completa del hotel')}
                                required
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            />
                        </Form.Group>
                    </Col>

                    {/* Zona/Región */}
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                {t('zonaRegion', 'Zona/Región')} *
                            </Form.Label>
                            <Form.Select
                                name="zonaRegion"
                                value={postData.zonaRegion || ''}
                                onChange={handleChangeInput}
                                required
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
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

                
                   
                </Row>
            </Card.Body>
        </Card>
    );
};

export default NombreLugarVoyagesOrganises;