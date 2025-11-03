import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const HoraDepart = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation('categories');
  
  const isRTL = i18n.language === 'ar';

  return (
    <Row className={`${isRTL ? 'rtl-direction' : ''}`}>
 
        <Form.Group className="mb-3">
          <Form.Label className={isRTL ? 'text-end d-block' : ''}>
            {t('horaDepart', 'Heure de Départ')} *
          </Form.Label>
          <Form.Control
            type="time"
            name="horadudepar"
            value={postData.horadudepar || ''}
            onChange={handleChangeInput}
            required
            className={isRTL ? 'text-end' : ''}
            dir={isRTL ? 'rtl' : 'ltr'}
          />
         
        </Form.Group>
     
    </Row>
  );
};

export default HoraDepart;