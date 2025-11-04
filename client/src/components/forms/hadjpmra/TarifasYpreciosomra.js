import React from 'react';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const TarifasYpreciosomra = ({ postData, handleChangeInput, category }) => {
  const { t, i18n } = useTranslation('categories');
  const isRTL = i18n.language === 'ar';

 

  // Opciones de descuentos y ofertas
  const opcionesDescuentos = [
    {
      id: 'descuentoGrupo',
      name: 'descuentoGrupo',
      label: '👥 ' + t('descuentoGrupo', 'Descuento para grupos'),
     
      checked: postData.descuentoGrupo || false
    },
    {
      id: 'ofertaEspecial',
      name: 'ofertaEspecial', 
      label: '🎁 ' + t('ofertaEspecial', 'Oferta especial'),
   
      checked: postData.ofertaEspecial || false
    },
    {
      id: 'descuentoTemporadaBaja',
      name: 'descuentoTemporadaBaja',
      label: '📉 ' + t('descuentoTemporadaBaja', 'Descuento temporada baja'),
    
      checked: postData.descuentoTemporadaBaja || false
    },
    {
      id: 'descuentoAnticipacion',
      name: 'descuentoAnticipacion',
      label: '⏰ ' + t('descuentoAnticipacion', 'Descuento por anticipación'),
    
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
    <Card >
      <Card.Header  >
        <h5 className="mb-0">
          💰 {t('tarifasPrecios', 'Tarifas y Precios')}
        </h5>
      </Card.Header>
      <Card.Body>
        <Row className={`${isRTL ? 'rtl-direction' : ''}`}>
 
          <Col  >
            <Form.Group className="mb-4">
              
              <div className="input-group">
                <Form.Control
                  type="number"
                  name="precioBase"
                  value={postData.precioBase || ''}
                  onChange={handleChangeInput}
                  placeholder="En Dinars"
                  min="0"
                  required
                  className={`w-100 ${isRTL ? 'text-end' : ''}`}
                  dir={isRTL ? 'rtl' : 'ltr'}
                  size="lg"
                />
                
              </div>
           
            </Form.Group>
          </Col>

      
          <Col xs={12}>
            <Form.Group  >
            
              
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
                      <div className="flex-grow-1">
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
              
          
            </Form.Group>
          </Col>

     
        </Row>
      </Card.Body>
    </Card>
  );
};

export default TarifasYpreciosomra;