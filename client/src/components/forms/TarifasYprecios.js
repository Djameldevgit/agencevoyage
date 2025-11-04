import React from 'react';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const TarifasYprecios = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation([  "categories"]);
    const isRTL = i18n.language === 'ar' || i18n.language === 'ara';

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

                    {/* PRIMERA FILA: Precio Base - Ocupa todo el ancho */}
                    <Col xs={12}>
                        <Form.Group className="mb-4">
                            <Form.Control
                                type="number"
                                name="precioBase"
                                value={postData.precioBase || ''}
                                onChange={handleChangeInput}
                                placeholder={t('placeholderPrecioBase', 'En Dinars')}
                                min="0"
                                required
                                className={`w-100 ${isRTL ? 'text-end' : ''}`}
                                dir={isRTL ? 'rtl' : 'ltr'}
                                size="lg"
                            />
                        </Form.Group>
                    </Col>

                    {/* SEGUNDA FILA: Tarifas para Niños - Ocupa todo el ancho */}
                    <Col xs={12}>
                        <Form.Group className="mb-4">
                            <Form.Control
                                type="number"
                                name="tarifaNinos"
                                value={postData.tarifaNinos || ''}
                                onChange={handleChangeInput}
                                placeholder={t('placeholderNinos', 'Niños (2-12 años) - En Dinars')}
                                min="0"
                                className={`w-100 ${isRTL ? 'text-end' : ''}`}
                                dir={isRTL ? 'rtl' : 'ltr'}
                                size="lg"
                            />
                        </Form.Group>
                    </Col>

                    {/* TERCERA FILA: Tarifas para Bebés - Ocupa todo el ancho */}
                    <Col xs={12}>
                        <Form.Group className="mb-4">
                            <Form.Control
                                type="number"
                                name="tarifaBebes"
                                value={postData.tarifaBebes || ''}
                                onChange={handleChangeInput}
                                placeholder={t('placeholderBebes', 'Bebés (0-2 años) - En Dinars')}
                                min="0"
                                className={`w-100 ${isRTL ? 'text-end' : ''}`}
                                dir={isRTL ? 'rtl' : 'ltr'}
                                size="lg"
                            />
                        </Form.Group>
                    </Col>

                    {/* CUARTA FILA: Checkboxes simples - Mismos estilos exactos */}
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

export default TarifasYprecios;