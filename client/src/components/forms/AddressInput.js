import React from 'react';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const AddressInput = ({ postData, handleChangeInput }) => {
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
                    {/* Input 1: Pueblo de reunión (OBLIGATORIO) */}
                    <Col xs={12} md={6}>
                        <Form.Group className="w-100">
                         
                            <Form.Control
                                type="text"
                                name="commune"
                                value={postData.commune || ''}
                                onChange={handleChangeInput}
                                   required
                                className="w-100"
                                size="lg"
                            />
                           
                        </Form.Group>
                    </Col>
                    
                    {/* Input 2: Provencia (OPCIONAL) */}
                    <Col xs={12} md={6}>
                        <Form.Group className="w-100">
                          
                            <Form.Control
                                type="text"
                                name="wilaya"
                                value={postData.wilaya|| ''}
                                onChange={handleChangeInput}
                                placeholder={t('placeholderProvenance', 'Ex: Wilaya, région...')}
                                className="w-100"
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