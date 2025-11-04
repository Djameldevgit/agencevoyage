import React from 'react';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const TarifasYpreciosomra = ({ postData, handleChangeInput, category }) => {
  const { t, i18n } = useTranslation('categories');
  const isRTL = i18n.language === 'ar' || i18n.language === 'ara';

  // Opciones de descuentos y ofertas
  const opcionesDescuentos = [
    {
      id: 'descuentoGrupo',
      name: 'descuentoGrupo',
      label: '👥 ' + t('descuentoGrupo', 'Descuento para grupos'),
      description: t('descuentoGrupoHelp', 'Precio especial para reservas de grupo'),
      checked: postData.descuentoGrupo || false
    },
    {
      id: 'ofertaEspecial',
      name: 'ofertaEspecial', 
      label: '🎁 ' + t('ofertaEspecial', 'Oferta especial'),
      description: t('ofertaEspecialHelp', 'Precio promocional limitado'),
      checked: postData.ofertaEspecial || false
    },
    {
      id: 'descuentoTemporadaBaja',
      name: 'descuentoTemporadaBaja',
      label: '📉 ' + t('descuentoTemporadaBaja', 'Descuento temporada baja'),
      description: t('descuentoTemporadaBajaHelp', 'Precios reducidos en temporada baja'),
      checked: postData.descuentoTemporadaBaja || false
    },
    {
      id: 'descuentoAnticipacion',
      name: 'descuentoAnticipacion',
      label: '⏰ ' + t('descuentoAnticipacion', 'Descuento por anticipación'),
      description: t('descuentoAnticipacionHelp', 'Reserve con anticipación y ahorre'),
      checked: postData.descuentoAnticipacion || false
    }
  ];

  // Manejar cambio de checkboxes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    handleChangeInput({
      target: {
        name: name,
        value: checked
      }
    });
  };

  return (
    <Card>
      <Card.Header style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
        <h5 className="mb-0">
          💰 {t('tarifasPrecios', 'Tarifas y Precios')}
        </h5>
      </Card.Header>
      <Card.Body>
        <Row style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
 
          <Col>
            <Form.Group className="mb-4">
              <div className="input-group">
                <Form.Control
                  type="number"
                  name="precioBase"
                  value={postData.precioBase || ''}
                  onChange={handleChangeInput}
                  placeholder={t('placeholderPrecio', 'En Dinars')}
                  min="0"
                  required
                  className={`w-100 ${isRTL ? 'text-end' : ''}`}
                  dir={isRTL ? 'rtl' : 'ltr'}
                  size="lg"
                />
              </div>
              <Form.Text className="text-muted" style={{ textAlign: isRTL ? 'right' : 'left' }}>
                {t('precioBaseHelp', 'Precio base por persona para el paquete completo')}
              </Form.Text>
            </Form.Group>
          </Col>

          <Col xs={12}>
            <Form.Group>
              <div className="border rounded p-3 bg-light">
                {opcionesDescuentos.map((opcion) => (
                  <div key={opcion.id} className="mb-3">
                    <div className={`d-flex align-items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                      {/* Checkbox simple */}
                      <input
                        type="checkbox"
                        id={opcion.id}
                        name={opcion.name}
                        checked={opcion.checked}
                        onChange={handleCheckboxChange}
                        className={`form-check-input flex-shrink-0 ${isRTL ? 'ms-2' : 'me-2'}`}
                        style={{
                          marginTop: '0.25rem',
                          width: '1.2em',
                          height: '1.2em'
                        }}
                      />
                      
                      {/* Label y descripción */}
                      <div className="flex-grow-1" style={{ textAlign: isRTL ? 'right' : 'left' }}>
                        <label 
                          htmlFor={opcion.id}
                          className="form-label mb-1 fw-bold"
                          style={{ cursor: 'pointer' }}
                        >
                          {opcion.label}
                        </label>
                        <div className="text-muted small">
                          {opcion.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Form.Text className="text-muted mt-2" style={{ textAlign: isRTL ? 'right' : 'left' }}>
                {t('seleccionMultiple', 'Puede seleccionar múltiples opciones')}
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default TarifasYpreciosomra;