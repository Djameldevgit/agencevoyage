import React from 'react';
import { Form, Row, Col, Card, Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Hotelvoyageorganise = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation('categories');
    const isRTL = i18n.language === 'ar';

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
        { value: '5_estrellas', label: '⭐⭐⭐⭐⭐ 5 ' + t('estrellas', 'estrellas'), description: t('lujo_exclusivo', 'Lujo y exclusividad') },
        { value: '4_estrellas', label: '⭐⭐⭐⭐ 4 ' + t('estrellas', 'estrellas'), description: t('superior_confort', 'Confort superior') },
        { value: '3_estrellas', label: '⭐⭐⭐ 3 ' + t('estrellas', 'estrellas'), description: t('confort_estandar', 'Confort estándar') },
        { value: '2_estrellas', label: '⭐⭐ 2 ' + t('estrellas', 'estrellas'), description: t('economico_practico', 'Económico y práctico') },
        { value: 'hostal', label: '🏠 ' + t('hostal', 'Hostal'), description: t('hostal_desc', 'Ambiente familiar y acogedor') },
        { value: 'apartamento', label: '🏢 ' + t('apartamento', 'Apartamento'), description: t('apartamento_desc', 'Independencia y espacio') }
    ];

    const tiposHabitacion = [
        { value: 'doble', label: '🛏️ ' + t('doble', 'Habitación doble'), description: t('doble_desc', 'Cama doble o dos individuales') },
        { value: 'individual', label: '🛏️ ' + t('individual', 'Habitación individual'), description: t('individual_desc', 'Para una persona') },
        { value: 'triple', label: '🛏️ ' + t('triple', 'Habitación triple'), description: t('triple_desc', 'Tres camas individuales') },
        { value: 'suite', label: '🏰 ' + t('suite', 'Suite'), description: t('suite_desc', 'Amplia con zona de estar') },
        { value: 'familiar', label: '👨‍👩‍👧‍👦 ' + t('familiar', 'Habitación familiar'), description: t('familiar_desc', 'Espacio para familias') },
        { value: 'comunicante', label: '🚪 ' + t('comunicante', 'Habitaciones comunicantes'), description: t('comunicante_desc', 'Ideal para familias') }
    ];

    const regimenesComidas = [
        { value: 'solo_alojamiento', label: '🏨 ' + t('solo_alojamiento', 'Solo alojamiento'), description: t('solo_alojamiento_desc', 'Sin comidas incluidas') },
        { value: 'desayuno', label: '🍳 ' + t('desayuno', 'Desayuno incluido'), description: t('desayuno_desc', 'Desayuno buffet') },
        { value: 'media_pension', label: '🍽️ ' + t('media_pension', 'Media pensión'), description: t('media_pension_desc', 'Desayuno y cena') },
        { value: 'pension_completa', label: '📦 ' + t('pension_completa', 'Pensión completa'), description: t('pension_completa_desc', 'Todas las comidas') },
        { value: 'todo_incluido', label: '🎉 ' + t('todo_incluido', 'Todo incluido'), description: t('todo_incluido_desc', 'Comidas, bebidas y snacks') }
    ];

    const ubicacionesHotel = [
        { value: 'centro_ciudad', label: '🏙️ ' + t('centro_ciudad', 'Centro ciudad'), description: t('centro_ciudad_desc', 'En el corazón de la ciudad') },
        { value: 'playa', label: '🏖️ ' + t('playa', 'Frente a la playa'), description: t('playa_desc', 'Vistas al mar, primera línea') },
        { value: 'montana', label: '⛰️ ' + t('montana', 'En la montaña'), description: t('montana_desc', 'Entorno natural y tranquilo') },
        { value: 'campo', label: '🌾 ' + t('campo', 'En el campo'), description: t('campo_desc', 'Rural y pintoresco') },
        { value: 'aeropuerto', label: '✈️ ' + t('aeropuerto', 'Cerca del aeropuerto'), description: t('aeropuerto_desc', 'Ideal para escalas') },
        { value: 'historico', label: '🏛️ ' + t('historico', 'Zona histórica'), description: t('historico_desc', 'Cerca de monumentos') }
    ];

    const serviciosHotel = [
        { value: 'wifi_gratuito', label: '📶 ' + t('wifi', 'Wi-Fi gratuito'), description: t('wifi_desc', 'Internet en todo el hotel') },
        { value: 'piscina', label: '🏊 ' + t('piscina', 'Piscina'), description: t('piscina_desc', 'Piscina exterior o interior') },
        { value: 'spa', label: '💆 ' + t('spa', 'Spa y bienestar'), description: t('spa_desc', 'Masajes y tratamientos') },
        { value: 'gimnasio', label: '💪 ' + t('gimnasio', 'Gimnasio'), description: t('gimnasio_desc', 'Equipamiento fitness') },
        { value: 'restaurante', label: '🍴 ' + t('restaurante', 'Restaurante'), description: t('restaurante_desc', 'Servicio de restaurante') },
        { value: 'bar', label: '🍹 ' + t('bar', 'Bar'), description: t('bar_desc', 'Bar con bebidas y snacks') },
        { value: 'room_service', label: '🚪 ' + t('room_service', 'Room service'), description: t('room_service_desc', 'Servicio en habitación') },
        { value: 'recepcion_24h', label: '🕒 ' + t('recepcion_24h', 'Recepción 24h'), description: t('recepcion_24h_desc', 'Asistencia permanente') },
        { value: 'aire_acondicionado', label: '❄️ ' + t('aire_acondicionado', 'Aire acondicionado'), description: t('aire_acondicionado_desc', 'Climatización individual') },
        { value: 'tv_satelite', label: '📺 ' + t('tv_satelite', 'TV satélite'), description: t('tv_satelite_desc', 'Canales internacionales') },
        { value: 'caja_fuerte', label: '🔒 ' + t('caja_fuerte', 'Caja fuerte'), description: t('caja_fuerte_desc', 'Seguridad para valores') },
        { value: 'minibar', label: '🧃 ' + t('minibar', 'Minibar'), description: t('minibar_desc', 'Refrigerador en habitación') }
    ];

    // Filtrar servicios que son específicos de hotel
    const serviciosHotelSeleccionados = servicios.filter(service => 
        serviciosHotel.map(s => s.value).includes(service)
    );

    return (
        <Card className="mb-4">
            <Card.Header className="bg-warning text-dark">
                <h5 className="mb-0">
                    🏨 {t('alojamientoVoyage', 'Alojamiento para Viajes Organizados')}
                </h5>
            </Card.Header>
            <Card.Body>
                <Row className={`${isRTL ? 'rtl-direction' : ''}`}>
                    
                    {/* Categoría del Alojamiento */}
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={`fw-bold ${isRTL ? 'text-end d-block' : ''}`}>
                                ⭐ {t('categoriaAlojamiento', 'Categoría del Alojamiento')} *
                            </Form.Label>
                            <Form.Select
                                name="categoriaAlojamiento"
                                value={postData.categoriaAlojamiento || ''}
                                onChange={handleChangeInput}
                                required
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            >
                                <option value="">{t('selectCategoria', 'Seleccione categoría')}</option>
                                {categoriasHoteles.map((cat, index) => (
                                    <option key={index} value={cat.value}>
                                        {cat.label} | {cat.description}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* Tipo de Habitación */}
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={`fw-bold ${isRTL ? 'text-end d-block' : ''}`}>
                                🛏️ {t('tipoHabitacion', 'Tipo de Habitación')} *
                            </Form.Label>
                            <Form.Select
                                name="tipoHabitacion"
                                value={postData.tipoHabitacion || ''}
                                onChange={handleChangeInput}
                                required
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            >
                                <option value="">{t('selectTipoHabitacion', 'Seleccione tipo')}</option>
                                {tiposHabitacion.map((tipo, index) => (
                                    <option key={index} value={tipo.value}>
                                        {tipo.label} | {tipo.description}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* Régimen de Comidas */}
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={`fw-bold ${isRTL ? 'text-end d-block' : ''}`}>
                                🍽️ {t('regimenComidas', 'Régimen de Comidas')} *
                            </Form.Label>
                            <Form.Select
                                name="regimenComidas"
                                value={postData.regimenComidas || ''}
                                onChange={handleChangeInput}
                                required
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            >
                                <option value="">{t('selectRegimen', 'Seleccione régimen')}</option>
                                {regimenesComidas.map((regimen, index) => (
                                    <option key={index} value={regimen.value}>
                                        {regimen.label} | {regimen.description}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* Ubicación del Hotel */}
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={`fw-bold ${isRTL ? 'text-end d-block' : ''}`}>
                                📍 {t('ubicacionHotel', 'Ubicación del Hotel')}
                            </Form.Label>
                            <Form.Select
                                name="ubicacionHotel"
                                value={postData.ubicacionHotel || ''}
                                onChange={handleChangeInput}
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            >
                                <option value="">{t('selectUbicacion', 'Tipo de ubicación')}</option>
                                {ubicacionesHotel.map((ubicacion, index) => (
                                    <option key={index} value={ubicacion.value}>
                                        {ubicacion.label} | {ubicacion.description}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* Servicios del Hotel - Versión mejorada */}
                    <Col xs={12}>
                        <div className="border rounded p-3 bg-light">
                            <Form.Group className="mb-0">
                                <Form.Label className={`fw-bold ${isRTL ? 'text-end d-block' : ''}`}>
                                    🛠️ {t('serviciosHotel', 'Servicios del Hotel')}
                                </Form.Label>
                             
                                <Row>
                                    {serviciosHotel.map((servicio, index) => (
                                        <Col xs={12} md={6} lg={4} key={index} className="mb-2">
                                            <div className={`border rounded p-2 ${servicios.includes(servicio.value) ? 'border-warning bg-white' : 'bg-light'}`}>
                                                <Form.Check
                                                    type="checkbox"
                                                    id={`hotel-service-${index}`}
                                                    label={
                                                        <div>
                                                            <strong>{servicio.label}</strong>
                                                            <br />
                                                            <small className="text-muted">
                                                                {servicio.description}
                                                            </small>
                                                        </div>
                                                    }
                                                    checked={servicios.includes(servicio.value)}
                                                    onChange={() => handleCheckboxChange(servicio.value)}
                                                    className={isRTL ? 'text-end' : ''}
                                                />
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </Form.Group>
                        </div>
                    </Col>

                   
                </Row>
            </Card.Body>
        </Card>
    );
};

export default Hotelvoyageorganise;