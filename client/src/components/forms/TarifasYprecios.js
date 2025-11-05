import React, { useMemo } from 'react';
import { Form, Row, Col, Card, Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const TarifasYprecios = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation(["categories"]);
    const isRTL = i18n.language === 'ar' || i18n.language === 'ara';

    // ✅ CALCULAR TOTAL Y CAMPOS USADOS
    const { totalCampos, camposUsados, totalPrecios } = useMemo(() => {
        const campos = [
            { key: 'precioBase', value: postData.precioBase, label: t('precioBaseLabel', 'Precio Base') },
            { key: 'tarifaNinos', value: postData.tarifaNinos, label: t('tarifaNinosLabel', 'Niños') },
            { key: 'tarifaBebes', value: postData.tarifaBebes, label: t('tarifaBebesLabel', 'Bebés') },
            { key: 'descuentoGrupo', value: postData.descuentoGrupo, label: t('descuentoGrupo', 'Descuento Grupo') },
            { key: 'ofertaEspecial', value: postData.ofertaEspecial, label: t('ofertaEspecial', 'Oferta Especial') }
        ];

        const camposUsados = campos.filter(campo => 
            campo.value !== undefined && campo.value !== null && campo.value !== '' && campo.value !== false
        );

        // Calcular suma de precios numéricos
        const sumaPrecios = campos
            .filter(campo => ['precioBase', 'tarifaNinos', 'tarifaBebes'].includes(campo.key))
            .reduce((sum, campo) => {
                const valor = parseFloat(campo.value) || 0;
                return sum + valor;
            }, 0);

        return {
            totalCampos: campos.length,
            camposUsados: camposUsados.length,
            totalPrecios: sumaPrecios,
            camposDetalle: camposUsados
        };
    }, [postData, t]);

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
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">
                        💰 {t('tarifasPrecios', 'Tarifas y Precios')}
                    </h5>
                    <div className="d-flex gap-2">
                        <Badge bg="light" text="dark" className="fs-5 fw-bold px-3 py-2">
                            {camposUsados}/{totalCampos}
                        </Badge>
                        {totalPrecios > 0 && (
                            <Badge bg="light" text="dark" className="fs-5 fw-bold px-3 py-2">
                                {totalPrecios.toLocaleString()} DA
                            </Badge>
                        )}
                    </div>
                </div>
                <small className="text-muted">
                    {t('camposCompletados', 'Campos completados')}: {camposUsados}/{totalCampos}
                </small>
            </Card.Header>
            <Card.Body>
                <Row style={{ direction: isRTL ? 'rtl' : 'ltr' }}>

                    {/* PRIMERA FILA: Precio Base */}
                    <Col xs={12}>
                        <Form.Group className="mb-4">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <Form.Label className={`fw-bold ${isRTL ? 'text-end' : ''} fs-6`}>
                                    💵 {t('precioBaseLabel', 'Precio Base Adulto')} *
                                </Form.Label>
                                {postData.precioBase && (
                                    <div className="fs-5 fw-bold text-dark">
                                        {parseFloat(postData.precioBase).toLocaleString()} DA
                                    </div>
                                )}
                            </div>
                            <Form.Control
                                type="number"
                                name="precioBase"
                                value={postData.precioBase || ''}
                                onChange={handleChangeInput}
                                placeholder={t('placeholderPrecioBase', 'Precio para adultos - En Dinars')}
                                min="0"
                                required
                                className={`w-100 ${isRTL ? 'text-end' : ''}`}
                                dir={isRTL ? 'rtl' : 'ltr'}
                                size="lg"
                            />
                        </Form.Group>
                    </Col>

                    {/* SEGUNDA FILA: Tarifas para Niños */}
                    <Col xs={12}>
                        <Form.Group className="mb-4">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <Form.Label className={`fw-bold ${isRTL ? 'text-end' : ''} fs-6`}>
                                    👶 {t('tarifaNinosLabel', 'Precio Niños (2-12 años)')}
                                </Form.Label>
                                {postData.tarifaNinos && (
                                    <div className="fs-5 fw-bold text-dark">
                                        {parseFloat(postData.tarifaNinos).toLocaleString()} DA
                                    </div>
                                )}
                            </div>
                            <Form.Control
                                type="number"
                                name="tarifaNinos"
                                value={postData.tarifaNinos || ''}
                                onChange={handleChangeInput}
                                placeholder={t('placeholderNinos', 'Precio para niños - En Dinars')}
                                min="0"
                                className={`w-100 ${isRTL ? 'text-end' : ''}`}
                                dir={isRTL ? 'rtl' : 'ltr'}
                                size="lg"
                            />
                        </Form.Group>
                    </Col>

                    {/* TERCERA FILA: Tarifas para Bebés */}
                    <Col xs={12}>
                        <Form.Group className="mb-4">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <Form.Label className={`fw-bold ${isRTL ? 'text-end' : ''} fs-6`}>
                                    🍼 {t('tarifaBebesLabel', 'Precio Bebés (0-2 años)')}
                                </Form.Label>
                                {postData.tarifaBebes && (
                                    <div className="fs-5 fw-bold text-dark">
                                        {parseFloat(postData.tarifaBebes).toLocaleString()} DA
                                    </div>
                                )}
                            </div>
                            <Form.Control
                                type="number"
                                name="tarifaBebes"
                                value={postData.tarifaBebes || ''}
                                onChange={handleChangeInput}
                                placeholder={t('placeholderBebes', 'Precio para bebés - En Dinars')}
                                min="0"
                                className={`w-100 ${isRTL ? 'text-end' : ''}`}
                                dir={isRTL ? 'rtl' : 'ltr'}
                                size="lg"
                            />
                        </Form.Group>
                    </Col>

                    {/* RESUMEN DE PRECIOS */}
                    {totalPrecios > 0 && (
                        <Col xs={12}>
                            <div className={`p-3 mb-3 bg-light rounded ${isRTL ? 'text-end' : ''}`}>
                                <h6 className="fw-bold mb-3 fs-5">📊 {t('resumenPrecios', 'Resumen de Precios')}</h6>
                                <div className="row fs-6">
                                    {postData.precioBase && (
                                        <div className="col-4 mb-2">
                                            <strong className="fs-6">Adultos:</strong><br/>
                                            <span className="fs-5 fw-bold">{parseFloat(postData.precioBase).toLocaleString()} DA</span>
                                        </div>
                                    )}
                                    {postData.tarifaNinos && (
                                        <div className="col-4 mb-2">
                                            <strong className="fs-6">Niños:</strong><br/>
                                            <span className="fs-5 fw-bold">{parseFloat(postData.tarifaNinos).toLocaleString()} DA</span>
                                        </div>
                                    )}
                                    {postData.tarifaBebes && (
                                        <div className="col-4 mb-2">
                                            <strong className="fs-6">Bebés:</strong><br/>
                                            <span className="fs-5 fw-bold">{parseFloat(postData.tarifaBebes).toLocaleString()} DA</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Col>
                    )}

                    {/* CUARTA FILA: Checkboxes de descuentos */}
                    <Col xs={12}>
                        <Form.Group>
                            <div className="border rounded p-3 bg-light">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h6 className="fw-bold mb-0 fs-6">
                                        🎯 {t('opcionesEspeciales', 'Opciones Especiales')}
                                    </h6>
                                    <Badge bg="light" text="dark" className="fs-6 fw-bold px-2 py-1">
                                        {opcionesDescuentos.filter(op => op.checked).length}/{opcionesDescuentos.length}
                                    </Badge>
                                </div>
                                {opcionesDescuentos.map((opcion) => (
                                    <div key={opcion.id} className="mb-3">
                                        <div className={`d-flex align-items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                                            <input
                                                type="checkbox"
                                                id={opcion.id}
                                                name={opcion.name}
                                                checked={opcion.checked}
                                                onChange={handleCheckboxChange}
                                                className={`form-check-input flex-shrink-0 ${isRTL ? 'ms-2' : 'me-2'}`}
                                                style={{
                                                    marginTop: '0.25rem',
                                                    width: '1.3em',
                                                    height: '1.3em'
                                                }}
                                            />
                                            <div className="flex-grow-1" style={{ textAlign: isRTL ? 'right' : 'left' }}>
                                                <label 
                                                    htmlFor={opcion.id}
                                                    className="form-label mb-1 fw-bold d-flex align-items-center fs-6"
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    {opcion.label}
                                                    {opcion.checked && (
                                                        <span className="ms-2 fs-5">✅</span>
                                                    )}
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