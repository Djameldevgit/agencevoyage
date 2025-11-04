import React from 'react';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Hotellocationvacance = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation('categories');
    const isRTL = i18n.language === 'ar' || i18n.language === 'ara';

    const tiposPropiedades = [
        { value: 'villa_lujo', label: '🏠 ' + t('villa_lujo', 'Villa de Lujo'), description: t('villa_lujo_desc', '4+ habitaciones | Piscina privada') },
        { value: 'villa_familiar', label: '🏡 ' + t('villa_familiar', 'Villa Familiar'), description: t('villa_familiar_desc', '3-4 habitaciones | Jardín') },
        { value: 'apartamento_lujo', label: '🏢 ' + t('apartamento_lujo', 'Apartamento Premium'), description: t('apartamento_lujo_desc', '2-3 habitaciones | Vista mar') },
        { value: 'apartamento_estudio', label: '🏙️ ' + t('apartamento_estudio', 'Apartamento Estudio'), description: t('apartamento_estudio_desc', '1 habitación | Cocina equipada') },
        { value: 'studio', label: '🔲 ' + t('studio', 'Studio'), description: t('studio_desc', 'Estudio | Ideal 2 personas') },
        { value: 'riad', label: '🏺 ' + t('riad', 'Riad Tradicional'), description: t('riad_desc', 'Patio interior | Decoración árabe') },
        { value: 'chalet_montana', label: '⛰️ ' + t('chalet_montana', 'Chalet Montaña'), description: t('chalet_montana_desc', '3+ habitaciones | Chimenea') },
        { value: 'casa_playa', label: '🏖️ ' + t('casa_playa', 'Casa Playa'), description: t('casa_playa_desc', 'Acceso directo | Terraza') },
        { value: 'duplex', label: '🏘️ ' + t('duplex', 'Dúplex'), description: t('duplex_desc', '2 plantas | 3-4 habitaciones') },
        { value: 'penthouse', label: '🏙️ ' + t('penthouse', 'Penthouse'), description: t('penthouse_desc', 'Terraza privada | Vista panorámica') },
        { value: 'bungalow', label: '🏝️ ' + t('bungalow', 'Bungalow'), description: t('bungalow_desc', '1-2 habitaciones | Jardín privado') },
        { value: 'casa_rural', label: '🌄 ' + t('casa_rural', 'Casa Rural'), description: t('casa_rural_desc', '3+ habitaciones | Naturaleza') }
    ];

    const capacidades = [
        { value: '1_2', label: t('1_2_personas', '1-2 personas'), description: t('1_2_personas_desc', 'Estudio/Apartamento pequeño') },
        { value: '2_4', label: t('2_4_personas', '2-4 personas'), description: t('2_4_personas_desc', '1-2 habitaciones | Familiar pequeño') },
        { value: '4_6', label: t('4_6_personas', '4-6 personas'), description: t('4_6_personas_desc', '2-3 habitaciones | Familiar') },
        { value: '6_8', label: t('6_8_personas', '6-8 personas'), description: t('6_8_personas_desc', '3-4 habitaciones | Gran familiar') },
        { value: '8_10', label: t('8_10_personas', '8-10 personas'), description: t('8_10_personas_desc', '4+ habitaciones | Villa pequeña') },
        { value: '10_12', label: t('10_12_personas', '10-12 personas'), description: t('10_12_personas_desc', '5+ habitaciones | Villa mediana') },
        { value: '12_plus', label: t('12_plus_personas', '12+ personas'), description: t('12_plus_personas_desc', '6+ habitaciones | Villa grande') }
    ];

    const categoriasComodidades = [
        { value: 'economico', label: '💰 ' + t('economico', 'Económico'), description: t('economico_desc', 'Bueno para budget') },
        { value: 'estandar', label: '⭐ ' + t('estandar', 'Estándar'), description: t('estandar_desc', 'Calidad-precio') },
        { value: 'superior', label: '⭐⭐ ' + t('superior', 'Superior'), description: t('superior_desc', 'Confort y servicios') },
        { value: 'premium', label: '⭐⭐⭐ ' + t('premium', 'Premium'), description: t('premium_desc', 'Lujo y exclusividad') },
        { value: 'luxe', label: '🏆 ' + t('luxe', 'Lujo'), description: t('luxe_desc', 'Máxima categoría') }
    ];

    const habitacionesOptions = [
        { value: '1', label: t('1_habitacion', '1 habitación'), description: t('1_habitacion_desc', 'Estudio') },
        { value: '2', label: t('2_habitaciones', '2 habitaciones'), description: t('2_habitaciones_desc', 'Pareja/Pequeña familia') },
        { value: '3', label: t('3_habitaciones', '3 habitaciones'), description: t('3_habitaciones_desc', 'Familia estándar') },
        { value: '4', label: t('4_habitaciones', '4 habitaciones'), description: t('4_habitaciones_desc', 'Familia grande') },
        { value: '5', label: t('5_plus_habitaciones', '5+ habitaciones'), description: t('5_plus_habitaciones_desc', 'Villa/Gran capacidad') }
    ];

    const superficieOptions = [
        { value: '0_50', label: t('superficie_0_50', '0-50 m²'), description: t('superficie_0_50_desc', 'Pequeño') },
        { value: '50_80', label: t('superficie_50_80', '50-80 m²'), description: t('superficie_50_80_desc', 'Estándar') },
        { value: '80_120', label: t('superficie_80_120', '80-120 m²'), description: t('superficie_80_120_desc', 'Espacioso') },
        { value: '120_200', label: t('superficie_120_200', '120-200 m²'), description: t('superficie_120_200_desc', 'Amplio') },
        { value: '200_plus', label: t('superficie_200_plus', '200+ m²'), description: t('superficie_200_plus_desc', 'Muy amplio') }
    ];

    const banosOptions = [
        { value: '1', label: t('1_bano', '1 baño'), description: t('1_bano_desc', 'Estándar') },
        { value: '2', label: t('2_banos', '2 baños'), description: t('2_banos_desc', 'Confort') },
        { value: '3', label: t('3_banos', '3 baños'), description: t('3_banos_desc', 'Lujo') },
        { value: '4', label: t('4_plus_banos', '4+ baños'), description: t('4_plus_banos_desc', 'Premium') }
    ];

    return (
        <Card className="mb-4">
            <Card.Header style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
                <h5 className="mb-0">
                    🏡 {t('caracteristicasAlojamiento', 'Características del Alojamiento')}
                </h5>
            </Card.Header>
            <Card.Body>
                <Row style={{ direction: isRTL ? 'rtl' : 'ltr' }} className="g-3">
                    
                    {/* PRIMERA FILA: Tipo de Propiedad y Categoría */}
                    <Col xs={12} md={6}>
                        <Form.Group className="h-100">
                            <Form.Label className={`fw-bold ${isRTL ? 'text-end d-block' : ''}`}>
                                🏠 {t('tipoPropiedad', 'Tipo de Propiedad')} *
                            </Form.Label>
                            <Form.Select
                                name="tipoPropiedad"
                                value={postData.tipoPropiedad || ''}
                                onChange={handleChangeInput}
                                required
                                className={`w-100 ${isRTL ? 'text-end' : ''}`}
                                dir={isRTL ? 'rtl' : 'ltr'}
                                size="lg"
                            >
                                <option value="">{t('selectTipoPropiedad', 'Seleccione tipo de propiedad')}</option>
                                {tiposPropiedades.map((tipo, index) => (
                                    <option key={index} value={tipo.value}>
                                        {tipo.label} | {tipo.description}
                                    </option>
                                ))}
                            </Form.Select>
                            <Form.Text className="text-muted" style={{ textAlign: isRTL ? 'right' : 'left' }}>
                                {t('descTipoPropiedad', 'Seleccione el tipo de alojamiento que mejor describe su propiedad')}
                            </Form.Text>
                        </Form.Group>
                    </Col>

                    {/* Categoría/Comodidades */}
                    <Col xs={12} md={6}>
                        <Form.Group className="h-100">
                            <Form.Label className={`fw-bold ${isRTL ? 'text-end d-block' : ''}`}>
                                ⭐ {t('categoria', 'Categoría/Comodidades')} *
                            </Form.Label>
                            <Form.Select
                                name="categoria"
                                value={postData.categoria || ''}
                                onChange={handleChangeInput}
                                required
                                className={`w-100 ${isRTL ? 'text-end' : ''}`}
                                dir={isRTL ? 'rtl' : 'ltr'}
                                size="lg"
                            >
                                <option value="">{t('selectCategoria', 'Nivel de comodidades')}</option>
                                {categoriasComodidades.map((cat, index) => (
                                    <option key={index} value={cat.value}>
                                        {cat.label} | {cat.description}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* SEGUNDA FILA: Capacidad y Habitaciones */}
                    <Col xs={12} md={6}>
                        <Form.Group className="h-100">
                            <Form.Label className={`fw-bold ${isRTL ? 'text-end d-block' : ''}`}>
                                👨‍👩‍👧‍👦 {t('capacidad', 'Capacidad')} *
                            </Form.Label>
                            <Form.Select
                                name="capacidad"
                                value={postData.capacidad || ''}
                                onChange={handleChangeInput}
                                required
                                className={`w-100 ${isRTL ? 'text-end' : ''}`}
                                dir={isRTL ? 'rtl' : 'ltr'}
                                size="lg"
                            >
                                <option value="">{t('selectCapacidad', 'Número de personas')}</option>
                                {capacidades.map((cap, index) => (
                                    <option key={index} value={cap.value}>
                                        {cap.label} | {cap.description}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* Habitaciones */}
                    <Col xs={12} md={6}>
                        <Form.Group className="h-100">
                            <Form.Label className={`fw-bold ${isRTL ? 'text-end d-block' : ''}`}>
                                🛏️ {t('habitaciones', 'Habitaciones')} *
                            </Form.Label>
                            <Form.Select
                                name="habitaciones"
                                value={postData.habitaciones || ''}
                                onChange={handleChangeInput}
                                required
                                className={`w-100 ${isRTL ? 'text-end' : ''}`}
                                dir={isRTL ? 'rtl' : 'ltr'}
                                size="lg"
                            >
                                <option value="">{t('selectHabitaciones', 'Número de habitaciones')}</option>
                                {habitacionesOptions.map((hab, index) => (
                                    <option key={index} value={hab.value}>
                                        {hab.label} | {hab.description}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* TERCERA FILA: Superficie y Baños */}
                    <Col xs={12} md={6}>
                        <Form.Group className="h-100">
                            <Form.Label className={`fw-bold ${isRTL ? 'text-end d-block' : ''}`}>
                                📐 {t('superficie', 'Superficie (m²)')}
                            </Form.Label>
                            <Form.Select
                                name="superficie"
                                value={postData.superficie || ''}
                                onChange={handleChangeInput}
                                className={`w-100 ${isRTL ? 'text-end' : ''}`}
                                dir={isRTL ? 'rtl' : 'ltr'}
                                size="lg"
                            >
                                <option value="">{t('selectSuperficie', 'Rango de superficie')}</option>
                                {superficieOptions.map((sup, index) => (
                                    <option key={index} value={sup.value}>
                                        {sup.label} | {sup.description}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* Baños */}
                    <Col xs={12} md={6}>
                        <Form.Group className="h-100">
                            <Form.Label className={`fw-bold ${isRTL ? 'text-end d-block' : ''}`}>
                                🚿 {t('banos', 'Baños')}
                            </Form.Label>
                            <Form.Select
                                name="banos"
                                value={postData.banos || ''}
                                onChange={handleChangeInput}
                                className={`w-100 ${isRTL ? 'text-end' : ''}`}
                                dir={isRTL ? 'rtl' : 'ltr'}
                                size="lg"
                            >
                                <option value="">{t('selectBanos', 'Número de baños')}</option>
                                {banosOptions.map((bano, index) => (
                                    <option key={index} value={bano.value}>
                                        {bano.label} | {bano.description}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                </Row>
            </Card.Body>
        </Card>
    );
};

export default Hotellocationvacance;