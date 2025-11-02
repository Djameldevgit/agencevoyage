import React from 'react';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const NombreLugarhotelhadj = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation('categories');
    const isRTL = i18n.language === 'ar';

    return (
        <Card className="mb-4">
       
            <Card.Body>
                <Row className={`${isRTL ? 'rtl-direction' : ''}`}>
                    {/* Hotel en La Meca */}
                    <Col xs={12}>
                        <h6 className={`border-bottom pb-2 ${isRTL ? 'text-end' : ''}`}>
                            🕋 {t('hotelMeca', 'Hotel en La Meca')}
                        </h6>
                    </Col>
                    
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                         
                            <Form.Control
                                type="text"
                                name="nombreHotelMeca"
                                value={postData.nombreHotelMeca || ''}
                                onChange={handleChangeInput}
                                placeholder={t('placeholderNombreHotel', 'Ej: Hotel Elaf Al Malik')}
                                required
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            />
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                           
                            <Form.Select
                                name="zonaMeca"
                                value={postData.zonaMeca || ''}
                                onChange={handleChangeInput}
                                required
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            >
                                <option value="">{t('selectZona', 'Seleccione la zona')}</option>
                                <option value="haram">🕋 {t('cerca_haram', 'Cerca del Haram')}</option>
                                <option value="aziziya">{t('aziziya', 'Aziziya')}</option>
                                <option value="shisha">{t('shisha', 'Shisha')}</option>
                                <option value="nawazia">{t('nawazia', 'Nawazia')}</option>
                                <option value="other">{t('otra_zona', 'Otra zona')}</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* Hotel en Medina */}
                    

                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                           
                            <Form.Control
                                type="text"
                                name="nombreHotelMedina"
                                value={postData.nombreHotelMedina || ''}
                                onChange={handleChangeInput}
                                placeholder={t('placeholderNombreHotel', 'Ej: Hotel Anwar Al Madinah')}
                                required
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            />
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                           
                            <Form.Select
                                name="zonaMedina"
                                value={postData.zonaMedina || ''}
                                onChange={handleChangeInput}
                                required
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            >
                                <option value="">{t('selectZona', 'Seleccione la zona')}</option>
                                <option value="haram_nabawi">🕌 {t('cerca_haram_nabawi', 'Cerca del Haram Nabawi')}</option>
                                <option value="olaya">{t('olaya', 'Olaya')}</option>
                                <option value="king_fahad">{t('king_fahad', 'King Fahad')}</option>
                                <option value="other">{t('otra_zona', 'Otra zona')}</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>

                 
                </Row>
            </Card.Body>
        </Card>
    );
};

export default NombreLugarhotelhadj;