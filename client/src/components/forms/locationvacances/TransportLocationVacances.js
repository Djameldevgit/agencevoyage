import React from 'react';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const TransportLocationVacances = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation([  "categories"]);
  const isRTL = i18n.language === 'ar';

  return (
    <Card className="mb-4">
      <Card.Body>
        <Row className={`${isRTL ? 'rtl-direction' : ''}`}>
          {/* Transport Inclus */}
          <Col xs={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                {t('transportInclus', 'Transport Inclus')}
              </Form.Label>
              <Form.Select
                name="transportInclus"
                value={postData.transportInclus || ''}
                onChange={handleChangeInput}
                className={isRTL ? 'text-end' : ''}
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                <option value="">{t('selectTransportOption', 'Options de transport')}</option>
                <option value="non_inclus">❌ {t('transport_non_inclus', 'Non inclus')}</option>
                <option value="navette">🚐 {t('navette', 'Navette gratuite')}</option>
                <option value="transfert_paye">🚗 {t('transfert_paye', 'Transfert payant')}</option>
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Parking */}
          
        </Row>
      </Card.Body>
    </Card>
  );
};

export default TransportLocationVacances;
