import React from 'react';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const DateDeparRetour = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation('categories');
  
  const isRTL = i18n.language === 'ar';

  return (
    <Card>
      <Card.Header >
        <h5 className="mb-0">
          📅 {t('fechasViaje', 'Fechas del Viaje')}
        </h5>
      </Card.Header>
      <Card.Body className="p-3">
        <Row className={`${isRTL ? 'rtl-direction' : ''} g-3`}>
          <Col xs={12} md={6}>
            <Form.Group className="w-100">
              <Form.Control
                type="date"
                name="datedepar"
                value={postData.datedepar || ''}
                onChange={handleChangeInput}
                required
                className={`w-100 ${isRTL ? 'text-end' : ''}`}
                dir={isRTL ? 'rtl' : 'ltr'}
                size="lg"
              />
            </Form.Group>
          </Col>
          
          <Col xs={12} md={6}>
            <Form.Group className="w-100">
              <Form.Control
                type="date"
                name="dateretour"
                value={postData.dateretour || ''}
                onChange={handleChangeInput}
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

export default DateDeparRetour;