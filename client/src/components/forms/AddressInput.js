import React from 'react';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const AddressInput = ({ 
    postData, 
    handleChangeInput, 
    handleWilayaChange, 
    wilayasOptions 
}) => {
    const { t, i18n } = useTranslation('categories');
    const isRTL = i18n.language === 'ar';

    return (
        <Card>
            <Card.Header  >
                <h5 className="mb-0">
                    📍 {t('addressTitle', 'Dirección de Salida')}
                </h5>
            </Card.Header>
            <Card.Body className="p-3">
                <Row className={`${isRTL ? 'rtl-direction' : ''} g-3`}>
                    {/* Ville de départ - Input de texto */}
                    <Col xs={12} md={6}>
                        <Form.Group className="w-100">
                            <Form.Control
                                type="text"
                                name="vile"
                                value={postData.vile || ''}
                                onChange={handleChangeInput}
                                placeholder={t('placeholderVilleDepart', 'Ej: Alger, Oran, Constantine...')}
                                required
                                className={`w-100 ${isRTL ? 'text-end' : ''}`}
                                dir={isRTL ? 'rtl' : 'ltr'}
                                size="lg"
                            />
                        </Form.Group>
                    </Col>
                    
                    {/* Wilaya - Select option */}
                    <Col xs={12} md={6}>
                        <Form.Group className="w-100">
                            <Form.Select
                                name="wilaya"
                                value={postData.wilaya || ''}
                                onChange={handleWilayaChange}
                                required
                                className={`w-100 ${isRTL ? 'text-end' : ''}`}
                                dir={isRTL ? 'rtl' : 'ltr'}
                                size="lg"
                            >
                                <option value="">{t('selectionnezWilaya', 'Seleccione una wilaya')}</option>
                                {wilayasOptions}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default AddressInput;