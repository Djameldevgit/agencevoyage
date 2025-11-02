import React from 'react';
import { Form, Row, Col, Card, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const TarifasYpreciosomra = ({ postData, handleChangeInput, category }) => {
  const { t, i18n } = useTranslation('categories');
  const isRTL = i18n.language === 'ar';

  // 🔹 Campos solo para Hajj/Omra
  const camposTarifas = [
    {
      name: 'precioBase',
      label: t('precioBase', 'Precio Base'),
      help: t(
        'precioBaseHajj',
        'Precio por persona para el paquete completo de Hajj/Omra'
      ),
      required: true,
    },
  ];

  // 🔹 Calcular total (solo precio base)
  const calcularTotal = () => parseFloat(postData.precioBase) || 0;

  return (
    <Card className="mb-4">
      <Card.Header>
        <h5 className="mb-0">💰 {t('tarifasPrecios', 'Tarifas y Precios')}</h5>
      </Card.Header>
      <Card.Body>
        <Row className={`${isRTL ? 'rtl-direction' : ''}`}>
          {/* Campo de precio base */}
          {camposTarifas.map((campo, i) => (
            <Col xs={12} md={6} key={i}>
              <Form.Group className="mb-3">
                <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                  {campo.label} {campo.required && '*'}
                </Form.Label>
                <div className="input-group">
                  <Form.Control
                    type="number"
                    name={campo.name}
                    value={postData[campo.name] || ''}
                    onChange={handleChangeInput}
                    placeholder="0"
                    min="0"
                    className={isRTL ? 'text-end' : ''}
                    dir={isRTL ? 'rtl' : 'ltr'}
                    required={campo.required}
                  />
                  <span className="input-group-text">DZD</span>
                </div>
                <Form.Text
                  className={`text-muted ${isRTL ? 'text-end d-block' : ''}`}
                >
                  {campo.help}
                </Form.Text>
              </Form.Group>
            </Col>
          ))}

          {/* Tipo de precio */}
          <Col xs={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                {t('tipoPrecio', 'Tipo de Precio')}
              </Form.Label>
              <Form.Select
                name="tipoPrecio"
                value={postData.tipoPrecio || ''}
                onChange={handleChangeInput}
                className={isRTL ? 'text-end' : ''}
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                <option value="">{t('selectTipoPrecio', 'Seleccione tipo')}</option>
                <option value="paquete_completo">📦 {t('paquete_completo', 'Paquete completo')}</option>
                <option value="solo_vuelo">✈️ {t('solo_vuelo', 'Solo vuelo')}</option>
                <option value="solo_hotel">🏨 {t('solo_hotel', 'Solo hotel')}</option>
                <option value="personalizado">🔧 {t('personalizado', 'Personalizado')}</option>
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Total estimado */}
          <Col xs={12}>
            <Alert variant="success" className="mt-3">
              <div
                className={`d-flex justify-content-between align-items-center ${
                  isRTL ? 'flex-row-reverse' : ''
                }`}
              >
                <strong>{t('totalEstimado', 'Total Estimado')}:</strong>
                <h4 className="mb-0">
                  {calcularTotal().toLocaleString()} DZD
                </h4>
              </div>
              <small
                className={`text-muted ${isRTL ? 'text-end d-block' : ''}`}
              >
                {t('totalHelp', 'Cálculo estimado basado en el precio base')}
              </small>
            </Alert>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default TarifasYpreciosomra;