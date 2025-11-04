import React from 'react';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Hotelvoyageorganise = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation([  "categories"]);
    const isRTL = i18n.language === 'ar' || i18n.language === 'ara';

    // Usar el array servicios existente
    const servicios = postData.servicios || [];

    const handleCheckboxChange = (serviceValue) => {
        const updatedServicios = servicios.includes(serviceValue)
            ? servicios.filter(item => item !== serviceValue)
            : [...servicios, serviceValue];
        
        handleChangeInput({ 
            target: { 
                name: "servicios", 
                value: updatedServicios 
            } 
        });
    };

    const categoriasHoteles = [
        { value: '5_estrellas', label: '⭐⭐⭐⭐⭐ 5 ' + t('estrellas', 'estrellas') },
        { value: '4_estrellas', label: '⭐⭐⭐⭐ 4 ' + t('estrellas', 'estrellas') },
        { value: '3_estrellas', label: '⭐⭐⭐ 3 ' + t('estrellas', 'estrellas') },
        { value: '2_estrellas', label: '⭐⭐ 2 ' + t('estrellas', 'estrellas') },
        { value: 'hostal', label: '🏠 ' + t('hostal', 'Hostal') },
        { value: 'apartamento', label: '🏢 ' + t('apartamento', 'Apartamento') }
    ];

    const tiposHabitacion = [
        { value: 'doble', label: '🛏️ ' + t('doble', 'Habitación doble') },
        { value: 'individual', label: '🛏️ ' + t('individual', 'Habitación individual') },
        { value: 'triple', label: '🛏️ ' + t('triple', 'Habitación triple') },
        { value: 'suite', label: '🏰 ' + t('suite', 'Suite') },
        { value: 'familiar', label: '👨‍👩‍👧‍👦 ' + t('familiar', 'Habitación familiar') },
        { value: 'comunicante', label: '🚪 ' + t('comunicante', 'Habitaciones comunicantes') }
    ];

    const regimenesComidas = [
        { value: 'solo_alojamiento', label: '🏨 ' + t('solo_alojamiento', 'Solo alojamiento') },
        { value: 'desayuno', label: '🍳 ' + t('desayuno', 'Desayuno incluido') },
        { value: 'media_pension', label: '🍽️ ' + t('media_pension', 'Media pensión') },
        { value: 'pension_completa', label: '📦 ' + t('pension_completa', 'Pensión completa') },
        { value: 'todo_incluido', label: '🎉 ' + t('todo_incluido', 'Todo incluido') }
    ];

    const ubicacionesHotel = [
        { value: 'centro_ciudad', label: '🏙️ ' + t('centro_ciudad', 'Centro ciudad') },
        { value: 'playa', label: '🏖️ ' + t('playa', 'Frente a la playa') },
        { value: 'montana', label: '⛰️ ' + t('montana', 'En la montaña') },
        { value: 'campo', label: '🌾 ' + t('campo', 'En el campo') },
        { value: 'aeropuerto', label: '✈️ ' + t('aeropuerto', 'Cerca del aeropuerto') },
        { value: 'historico', label: '🏛️ ' + t('historico', 'Zona histórica') }
    ];

    const serviciosHotel = [
        { value: 'wifi_gratuito', label: '📶 ' + t('wifi', 'Wi-Fi gratuito') },
        { value: 'piscina', label: '🏊 ' + t('piscina', 'Piscina') },
        { value: 'spa', label: '💆 ' + t('spa', 'Spa y bienestar') },
        { value: 'gimnasio', label: '💪 ' + t('gimnasio', 'Gimnasio') },
        { value: 'restaurante', label: '🍴 ' + t('restaurante', 'Restaurante') },
        { value: 'bar', label: '🍹 ' + t('bar', 'Bar') },
        { value: 'room_service', label: '🚪 ' + t('room_service', 'Room service') },
        { value: 'recepcion_24h', label: '🕒 ' + t('recepcion_24h', 'Recepción 24h') },
        { value: 'aire_acondicionado', label: '❄️ ' + t('aire_acondicionado', 'Aire acondicionado') },
        { value: 'tv_satelite', label: '📺 ' + t('tv_satelite', 'TV satélite') },
        { value: 'caja_fuerte', label: '🔒 ' + t('caja_fuerte', 'Caja fuerte') },
        { value: 'minibar', label: '🧃 ' + t('minibar', 'Minibar') }
    ];

    return (
        <>
            {/* Card principal para información básica del hotel */}
            <Card className="mb-3">
                <Card.Header style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
                    <h5 className="mb-0">
                        🏨 {t('alojamientoVoyage', 'Alojamiento para Viajes Organizados')}
                    </h5>
                </Card.Header>
                <Card.Body className="p-3">
                    <Row style={{ direction: isRTL ? 'rtl' : 'ltr' }} className="g-3">
                        
                        {/* Categoría del Alojamiento */}
                        <Col xs={12}>
                            <Form.Group className="w-100">
                                <Form.Label className={`fw-bold ${isRTL ? 'text-end d-block' : ''}`} style={{ fontSize: '1rem' }}>
                                    {t('categoriaAlojamientoLabel', 'Categoría del Alojamiento')} *
                                </Form.Label>
                                <Form.Select
                                    name="categoriaAlojamiento"
                                    value={postData.categoriaAlojamiento || ''}
                                    onChange={handleChangeInput}
                                    required
                                    className={`w-100 ${isRTL ? 'text-end' : ''}`}
                                    dir={isRTL ? 'rtl' : 'ltr'}
                                    size="lg"
                                >
                                    <option value="">{t('selectCategoria', 'Seleccione categoría del alojamiento')}</option>
                                    {categoriasHoteles.map((cat, index) => (
                                        <option key={index} value={cat.value}>
                                            {cat.label}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        {/* Tipo de Habitación */}
                        <Col xs={12}>
                            <Form.Group className="w-100">
                                <Form.Label className={`fw-bold ${isRTL ? 'text-end d-block' : ''}`} style={{ fontSize: '1rem' }}>
                                    {t('tipoHabitacionLabel', 'Tipo de Habitación')} *
                                </Form.Label>
                                <Form.Select
                                    name="tipoHabitacion"
                                    value={postData.tipoHabitacion || ''}
                                    onChange={handleChangeInput}
                                    required
                                    className={`w-100 ${isRTL ? 'text-end' : ''}`}
                                    dir={isRTL ? 'rtl' : 'ltr'}
                                    size="lg"
                                >
                                    <option value="">{t('selectTipoHabitacion', 'Seleccione tipo de habitación')}</option>
                                    {tiposHabitacion.map((tipo, index) => (
                                        <option key={index} value={tipo.value}>
                                            {tipo.label}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        {/* Régimen de Comidas */}
                        <Col xs={12}>
                            <Form.Group className="w-100">
                                <Form.Label className={`fw-bold ${isRTL ? 'text-end d-block' : ''}`} style={{ fontSize: '1rem' }}>
                                    {t('regimenComidasLabel', 'Régimen de Comidas')} *
                                </Form.Label>
                                <Form.Select
                                    name="regimenComidas"
                                    value={postData.regimenComidas || ''}
                                    onChange={handleChangeInput}
                                    required
                                    className={`w-100 ${isRTL ? 'text-end' : ''}`}
                                    dir={isRTL ? 'rtl' : 'ltr'}
                                    size="lg"
                                >
                                    <option value="">{t('selectRegimen', 'Seleccione régimen de comidas')}</option>
                                    {regimenesComidas.map((regimen, index) => (
                                        <option key={index} value={regimen.value}>
                                            {regimen.label}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        {/* Ubicación del Hotel */}
                        <Col xs={12}>
                            <Form.Group className="w-100">
                                <Form.Label className={`fw-bold ${isRTL ? 'text-end d-block' : ''}`} style={{ fontSize: '1rem' }}>
                                    {t('ubicacionHotelLabel', 'Ubicación del Hotel')}
                                </Form.Label>
                                <Form.Select
                                    name="ubicacionHotel"
                                    value={postData.ubicacionHotel || ''}
                                    onChange={handleChangeInput}
                                    className={`w-100 ${isRTL ? 'text-end' : ''}`}
                                    dir={isRTL ? 'rtl' : 'ltr'}
                                    size="lg"
                                >
                                    <option value="">{t('selectUbicacion', 'Seleccione ubicación del hotel')}</option>
                                    {ubicacionesHotel.map((ubicacion, index) => (
                                        <option key={index} value={ubicacion.value}>
                                            {ubicacion.label}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {/* Card separado para servicios del hotel */}
            <Card className="mb-3">
                <Card.Header style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
                    <h5 className="mb-0">
                        🛠️ {t('serviciosHotel', 'Servicios del Hotel')}
                    </h5>
                    <small className="text-muted" style={{ 
                        textAlign: isRTL ? 'right' : 'left',
                        fontSize: '0.85rem'
                    }}>
                        {t('serviciosSeleccionados', 'Servicios seleccionados')}: {servicios.length}
                    </small>
                </Card.Header>
                <Card.Body className="p-3">
                    <Form.Group>
                        <div className="border rounded p-3 bg-light">
                            {serviciosHotel.map((servicio) => (
                                <div key={servicio.value} className="mb-3">
                                    <div className={`d-flex align-items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                                        {/* Checkbox simple */}
                                        <input
                                            type="checkbox"
                                            id={`service-${servicio.value}`}
                                            name="servicios"
                                            checked={servicios.includes(servicio.value)}
                                            onChange={() => handleCheckboxChange(servicio.value)}
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
                                                htmlFor={`service-${servicio.value}`}
                                                className="form-label mb-1 fw-bold d-block"
                                                style={{ cursor: 'pointer', fontSize: '1rem' }}
                                            >
                                                {servicio.label}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Form.Group>
                </Card.Body>
            </Card>
        </>
    );
};

export default Hotelvoyageorganise;