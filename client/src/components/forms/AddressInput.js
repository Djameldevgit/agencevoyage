import React from 'react';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const AddressInput = ({ 
    postData, 
    handleChangeInput, 
    wilayasOptions, 
    communesOptions, 
    handleWilayaChange, 
    handleCommuneChange 
}) => {
    const { t, i18n } = useTranslation(["categories"]);
    const isRTL = i18n.language === 'ar';

    return (
        <Card className="mb-3">
            <Card.Header>
                <h5 className="mb-0">
                    📍 {t('addressTitlee', 'Lieu de Rassemblement')}
                </h5>
                <small className="text-muted">
                    {t('addressSubtitle', 'Lieu de rencontre des voyageurs')}
                </small>
            </Card.Header>
            <Card.Body className="p-3">
                <Row className={`g-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {/* Input 1: Wilaya/Province (OBLIGATORIO) */}
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
                                <option value="">{t('selectWilaya', 'Sélectionnez la wilaya')}</option>
                                {wilayasOptions}
                            </Form.Select>
                            
                        </Form.Group>
                    </Col>
                    
                    {/* Input 2: Commune/Pueblo (OBLIGATORIO) */}
                    <Col xs={12} md={6}>
                        <Form.Group className="w-100">
                           
                            <Form.Select
                                name="commune"
                                value={postData.commune || ''}
                                onChange={handleCommuneChange}
                                required
                                className={`w-100 ${isRTL ? 'text-end' : ''}`}
                                dir={isRTL ? 'rtl' : 'ltr'}
                                size="lg"
                                disabled={!postData.wilaya}
                            >
                                <option value="">
                                    {postData.wilaya 
                                        ? t('selectCommune', 'Sélectionnez la commune') 
                                        : t('selectWilayaFirst', 'Choisissez d\'abord la wilaya')
                                    }
                                </option>
                                {communesOptions}
                            </Form.Select>
                          
                        </Form.Group>
                    </Col>
                </Row>

                {/* Campo adicional: Dirección específica (OPCIONAL) */}
                <Row className={`mt-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Col xs={12}>
                        <Form.Group className="w-100">
                           
                            <Form.Control
                                type="text"
                                name="vile"
                                value={postData.vile || ''}
                                onChange={handleChangeInput}
                                placeholder={t('specificAddressPlaceholder', 'Ex: Rue, lieu précis, point de rendez-vous...')}
                                className={`w-100 ${isRTL ? 'text-end' : ''}`}
                                size="lg"
                            />
                            
                        </Form.Group>
                    </Col>
                </Row>
 
            </Card.Body>
        </Card>
    );
};

export default AddressInput;