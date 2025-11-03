import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
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
        <Row className={`${isRTL ? 'rtl-direction' : ''}`}>
            {/* Ville de départ - Input de texto */}
            <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                    <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                        {t('villeDepart', 'Ville de Départ')} *
                    </Form.Label>
                    <Form.Control
                        type="text"
                        name="commune"
                        value={postData.commune || ''}
                        onChange={handleChangeInput}
                        placeholder={t('placeholderVilleDepart', 'Ex: Alger, Oran, Constantine...')}
                        required
                        className={isRTL ? 'text-end' : ''}
                        dir={isRTL ? 'rtl' : 'ltr'}
                    />
                   
                </Form.Group>
            </Col>
            
            {/* Wilaya - Select option */}
            <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                    <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                        {t('wilaya', 'Wilaya')} *
                    </Form.Label>
                    <Form.Select
                        name="wilaya"
                        value={postData.wilaya || ''}
                        onChange={handleWilayaChange}
                        required
                        className={isRTL ? 'text-end' : ''}
                        dir={isRTL ? 'rtl' : 'ltr'}
                    >
                        <option value="">{t('selectionnezWilaya', 'Sélectionnez une wilaya')}</option>
                        {wilayasOptions}
                    </Form.Select>
                 
                </Form.Group>
            </Col>
        </Row>
    );
};

export default AddressInput;