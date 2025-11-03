import React from 'react';
import { Form, Row, Col, Card, Alert, Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const TarifasYprecios = ({ postData, handleChangeInput, category }) => {
    const { t, i18n } = useTranslation('categories');
    const isRTL = i18n.language === 'ar';

    // Función para calcular el total automáticamente
    const calcularTotal = () => {
        const precioBase = parseFloat(postData.precioBase) || 0;
        const tarifaNinos = parseFloat(postData.tarifaNinos) || 0;
        const tarifaBebes = parseFloat(postData.tarifaBebes) || 0;
        
        return precioBase + tarifaNinos + tarifaBebes;
    };

    // Opciones de tipo de precio por categoría
    const opcionesTipoPrecio = {
        hadjomra: [
            { value: "paquete_completo", label: "📦 " + t('paquete_completo', 'Paquete completo'), desc: t('paquete_completo_desc', 'Incluye vuelo, hotel, traslados y visa') },
            { value: "solo_vuelo", label: "✈️ " + t('solo_vuelo', 'Solo vuelo'), desc: t('solo_vuelo_desc', 'Solo billetes de avión') },
            { value: "solo_hotel", label: "🏨 " + t('solo_hotel', 'Solo hotel'), desc: t('solo_hotel_desc', 'Solo alojamiento en ciudades santas') },
            { value: "personalizado", label: "🔧 " + t('personalizado', 'Personalizado'), desc: t('personalizado_desc', 'Servicios a medida') }
        ],
        locationvacances: [
            { value: "por_noche", label: "🌙 " + t('por_noche', 'Por noche'), desc: t('por_noche_desc', 'Precio por noche de estancia') },
            { value: "por_semana", label: "📅 " + t('por_semana', 'Por semana'), desc: t('por_semana_desc', 'Precio semanal con descuento') },
            { value: "por_mes", label: "🗓️ " + t('por_mes', 'Por mes'), desc: t('por_mes_desc', 'Precio mensual con mejor tarifa') },
            { value: "temporada_alta", label: "📈 " + t('temporada_alta', 'Temporada alta'), desc: t('temporada_alta_desc', 'Precio para temporada alta') },
            { value: "temporada_baja", label: "📉 " + t('temporada_baja', 'Temporada baja'), desc: t('temporada_baja_desc', 'Precio para temporada baja') }
        ],
        voyagesorganises: [
            { value: "todo_incluido", label: "🎉 " + t('todo_incluido', 'Todo incluido'), desc: t('todo_incluido_desc', 'Todos los servicios incluidos') },
            { value: "vuelo_hotel", label: "✈️🏨 " + t('vuelo_hotel', 'Vuelo + Hotel'), desc: t('vuelo_hotel_desc', 'Solo vuelo y alojamiento') },
            { value: "solo_circuito", label: "🗺️ " + t('solo_circuito', 'Solo circuito'), desc: t('solo_circuito_desc', 'Solo tour sin vuelo') },
            { value: "personalizado", label: "🔧 " + t('personalizado', 'Personalizado'), desc: t('personalizado_desc', 'Servicios seleccionados') }
        ]
    };

    const politicasNinos = [
        { value: "gratis_hasta_2", label: "👶 " + t('gratis_hasta_2', 'Gratis hasta 2 años'), desc: t('gratis_hasta_2_desc', 'Bebés no pagan') },
        { value: "descuento_50", label: "💰 " + t('descuento_50', '50% descuento 2-12 años'), desc: t('descuento_50_desc', 'Mitad de precio para niños') },
        { value: "descuento_30", label: "💸 " + t('descuento_30', '30% descuento 2-12 años'), desc: t('descuento_30_desc', '30% de descuento') },
        { value: "mismo_precio", label: "👨‍👦 " + t('mismo_precio', 'Mismo precio que adultos'), desc: t('mismo_precio_desc', 'Sin descuento para niños') },
        { value: "no_admiten", label: "🚫 " + t('no_admiten', 'No admiten niños'), desc: t('no_admiten_desc', 'Solo para adultos') }
    ];

    const totalCalculado = calcularTotal();

    return (
        <Card className="mb-4">
      
            <Card.Body>
                <Row className={`${isRTL ? 'rtl-direction' : ''}`}>
                    
                    {/* Sección Principal de Precios */}
                    <Col xs={12}>
                        <div className="border rounded p-3 bg-light mb-4">
                           
                            <Row>
                                {/* Precio Base */}
                                <Col >
                                    <Form.Group className="mb-3">
                                        <Form.Label className={`fw-bold ${isRTL ? 'text-end d-block' : ''}`}>
                                            🎯 {t('precioBase', 'Precio Base')} *
                                        </Form.Label>
                                        <div className="input-group">
                                            <Form.Control
                                                type="number"
                                                name="precioBase"
                                                value={postData.precioBase || ''}
                                                onChange={handleChangeInput}
                                                placeholder="0"
                                                min="0"
                                                required
                                                className={isRTL ? 'text-end' : ''}
                                                dir={isRTL ? 'rtl' : 'ltr'}
                                            />
                                            <span className="input-group-text">DZD</span>
                                        </div>
                                        <Form.Text className={`text-muted ${isRTL ? 'text-end d-block' : ''}`}>
                                            {category === 'hadjomra' 
                                                ? t('precioBaseHajj', 'Precio por persona para el paquete completo')
                                                : category === 'locationvacances'
                                                ? t('precioBaseLocation', 'Precio por noche para la propiedad')
                                                : t('precioBaseVoyages', 'Precio por persona para el viaje organizado')
                                            }
                                        </Form.Text>
                                    </Form.Group>
                                </Col>

                             
                            </Row>
                        </div>
                    </Col>

                    {/* Tarifas para Niños */}
                    <Col xs={12}>
                        <div className="border rounded p-3 bg-light mb-4">
                            <h6 className={`fw-bold mb-3 ${isRTL ? 'text-end' : ''}`}>
                                👨‍👩‍👧‍👦 {t('tarifasNinos', 'Tarifas para Niños y Bebés')}
                            </h6>
                            <Row>
                                <Col xs={12} md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className={`fw-bold ${isRTL ? 'text-end d-block' : ''}`}>
                                            🧒 {t('ninos_2_12', 'Niños (2-12 años)')}
                                        </Form.Label>
                                        <div className="input-group">
                                            <Form.Control
                                                type="number"
                                                name="tarifaNinos"
                                                value={postData.tarifaNinos || ''}
                                                onChange={handleChangeInput}
                                                placeholder="0"
                                                min="0"
                                                className={isRTL ? 'text-end' : ''}
                                                dir={isRTL ? 'rtl' : 'ltr'}
                                            />
                                            <span className="input-group-text">DZD</span>
                                        </div>
                                        <Form.Text className={`text-muted ${isRTL ? 'text-end d-block' : ''}`}>
                                            {t('tarifaNinosHelp', 'Precio especial para niños')}
                                        </Form.Text>
                                    </Form.Group>
                                </Col>

                                <Col xs={12} md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className={`fw-bold ${isRTL ? 'text-end d-block' : ''}`}>
                                            🍼 {t('bebes_0_2', 'Bebés (0-2 años)')}
                                        </Form.Label>
                                        <div className="input-group">
                                            <Form.Control
                                                type="number"
                                                name="tarifaBebes"
                                                value={postData.tarifaBebes || ''}
                                                onChange={handleChangeInput}
                                                placeholder="0"
                                                min="0"
                                                className={isRTL ? 'text-end' : ''}
                                                dir={isRTL ? 'rtl' : 'ltr'}
                                            />
                                            <span className="input-group-text">DZD</span>
                                        </div>
                                        <Form.Text className={`text-muted ${isRTL ? 'text-end d-block' : ''}`}>
                                            {t('tarifaBebesHelp', 'Precio para bebés (generalmente gratuito)')}
                                        </Form.Text>
                                    </Form.Group>
                                </Col>

                                <Col xs={12} md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className={`fw-bold ${isRTL ? 'text-end d-block' : ''}`}>
                                            📝 {t('politicaNinos', 'Política de Niños')}
                                        </Form.Label>
                                        <Form.Select
                                            name="politicaNinos"
                                            value={postData.politicaNinos || ''}
                                            onChange={handleChangeInput}
                                            className={isRTL ? 'text-end' : ''}
                                            dir={isRTL ? 'rtl' : 'ltr'}
                                        >
                                            <option value="">{t('selectPolitica', 'Seleccione política')}</option>
                                            {politicasNinos.map((politica, index) => (
                                                <option key={index} value={politica.value}>
                                                    {politica.label}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        {postData.politicaNinos && (
                                            <Form.Text className={`text-info ${isRTL ? 'text-end d-block' : ''}`}>
                                                {politicasNinos.find(p => p.value === postData.politicaNinos)?.desc}
                                            </Form.Text>
                                        )}
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>
                    </Col>

                    {/* Descuentos y Ofertas */}
                    <Col xs={12}>
                        <div className="border rounded p-3 bg-light mb-4">
                            <h6 className={`fw-bold mb-3 ${isRTL ? 'text-end' : ''}`}>
                                🏷️ {t('descuentosOfertas', 'Descuentos y Ofertas Especiales')}
                            </h6>
                            <Row>
                                <Col xs={12} md={6}>
                                    <div className={`p-3 border rounded ${postData.descuentoGrupo ? 'border-success bg-success bg-opacity-10' : 'bg-light'}`}>
                                        <Form.Check
                                            type="checkbox"
                                            name="descuentoGrupo"
                                            label={
                                                <div>
                                                    <strong>👥 {t('descuentoGrupo', 'Descuento para grupos')}</strong>
                                                    <br />
                                                    <small className="text-muted">
                                                        {t('descuentoGrupoHelp', 'Precio especial para reservas de grupo')}
                                                    </small>
                                                </div>
                                            }
                                            checked={postData.descuentoGrupo || false}
                                            onChange={handleChangeInput}
                                            className={isRTL ? 'text-end' : ''}
                                        />
                                    </div>
                                </Col>
                                <Col xs={12} md={6}>
                                    <div className={`p-3 border rounded ${postData.ofertaEspecial ? 'border-warning bg-warning bg-opacity-10' : 'bg-light'}`}>
                                        <Form.Check
                                            type="checkbox"
                                            name="ofertaEspecial"
                                            label={
                                                <div>
                                                    <strong>🎁 {t('ofertaEspecial', 'Oferta especial')}</strong>
                                                    <br />
                                                    <small className="text-muted">
                                                        {t('ofertaEspecialHelp', 'Precio promocional limitado')}
                                                    </small>
                                                </div>
                                            }
                                            checked={postData.ofertaEspecial || false}
                                            onChange={handleChangeInput}
                                            className={isRTL ? 'text-end' : ''}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>

                    {/* Total Calculado */}
                    <Col xs={12}>
                        <Alert variant={totalCalculado > 0 ? "success" : "light"} className="mt-3">
                            <div className={`d-flex justify-content-between align-items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <div>
                                    <strong className="fs-5">{t('totalEstimado', 'Total Estimado')}</strong>
                                    <br />
                                    <small className="text-muted">
                                        {t('totalHelp', 'Precio base + tarifas niños - Cálculo estimado')}
                                    </small>
                                </div>
                                <div className={`text-end ${isRTL ? 'text-start' : ''}`}>
                                    <h3 className="mb-0 fw-bold text-success">
                                        {totalCalculado.toLocaleString()} DZD
                                    </h3>
                                    <Badge bg={totalCalculado > 0 ? "success" : "secondary"} className="mt-1">
                                        {totalCalculado > 0 ? t('precioConfigurado', 'Precio configurado') : t('sinPrecio', 'Sin precio')}
                                    </Badge>
                                </div>
                            </div>
                        </Alert>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default TarifasYprecios;