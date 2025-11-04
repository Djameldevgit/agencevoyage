import React from 'react';
import { Form, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const HoraDepart = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation('categories');
  
  const isRTL = i18n.language === 'ar';

  return (
    <Card>
      <Card.Header  >
        <h5 className="mb-0">
          ⏰ {t('horaDepart', 'Hora de Salida')}
        </h5>
      </Card.Header>
      <Card.Body className="p-3">
        <Form.Group className="w-100">
          <Form.Control
            type="time"
            name="horadudepar"
            value={postData.horadudepar || ''}
            onChange={handleChangeInput}
            required
            className={`w-100 ${isRTL ? 'text-end' : ''}`}
            dir={isRTL ? 'rtl' : 'ltr'}
            size="lg"
          />
        </Form.Group>
      </Card.Body>
    </Card>
  );
};

export default HoraDepart;