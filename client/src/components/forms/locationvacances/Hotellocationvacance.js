import React from 'react';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Hotellocationvacance = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation('categories');
    const isRTL = i18n.language === 'ar';

    const tiposPropiedades = [
        { value: 'villa_lujo', label: '🏠 ' + t('villa_lujo', 'Villa de Lujo') + ' | 4+ habitaciones | Piscina privada' },
        { value: 'villa_familiar', label: '🏡 ' + t('villa_familiar', 'Villa Familiar') + ' | 3-4 habitaciones | Jardín' },
        { value: 'apartamento_lujo', label: '🏢 ' + t('apartamento_lujo', 'Apartamento Premium') + ' | 2-3 habitaciones | Vista mar' },
        { value: 'apartamento_estudio', label: '🏙️ ' + t('apartamento_estudio', 'Apartamento Estudio') + ' | 1 habitación | Cocina equipada' },
        { value: 'studio', label: '🔲 ' + t('studio', 'Studio') + ' | Estudio | Ideal 2 personas' },
        { value: 'riad', label: '🏺 ' + t('riad', 'Riad Tradicional') + ' | Patio interior | Decoración árabe' },
        { value: 'chalet_montana', label: '⛰️ ' + t('chalet_montana', 'Chalet Montaña') + ' | 3+ habitaciones | Chimenea' },
        { value: 'casa_playa', label: '🏖️ ' + t('casa_playa', 'Casa Playa') + ' | Acceso directo | Terraza' },
        { value: 'duplex', label: '🏘️ ' + t('duplex', 'Dúplex') + ' | 2 plantas | 3-4 habitaciones' },
        { value: 'penthouse', label: '🏙️ ' + t('penthouse', 'Penthouse') + ' | Terraza privada | Vista panorámica' },
        { value: 'bungalow', label: '🏝️ ' + t('bungalow', 'Bungalow') + ' | 1-2 habitaciones | Jardín privado' },
        { value: 'casa_rural', label: '🌄 ' + t('casa_rural', 'Casa Rural') + ' | 3+ habitaciones | Naturaleza' }
    ];

    const capacidades = [
        { value: '1_2', label: t('1_2_personas', '1-2 personas') + ' | Estudio/Apartamento pequeño' },
        { value: '2_4', label: t('2_4_personas', '2-4 personas') + ' | 1-2 habitaciones | Familiar pequeño' },
        { value: '4_6', label: t('4_6_personas', '4-6 personas') + ' | 2-3 habitaciones | Familiar' },
        { value: '6_8', label: t('6_8_personas', '6-8 personas') + ' | 3-4 habitaciones | Gran familiar' },
        { value: '8_10', label: t('8_10_personas', '8-10 personas') + ' | 4+ habitaciones | Villa pequeña' },
        { value: '10_12', label: t('10_12_personas', '10-12 personas') + ' | 5+ habitaciones | Villa mediana' },
        { value: '12_plus', label: t('12_plus_personas', '12+ personas') + ' | 6+ habitaciones | Villa grande' }
    ];

    const categoriasComodidades = [
        { value: 'economico', label: '💰 ' + t('economico', 'Económico') + ' | Bueno para budget' },
        { value: 'estandar', label: '⭐ ' + t('estandar', 'Estándar') + ' | Calidad-precio' },
        { value: 'superior', label: '⭐⭐ ' + t('superior', 'Superior') + ' | Confort y servicios' },
        { value: 'premium', label: '⭐⭐⭐ ' + t('premium', 'Premium') + ' | Lujo y exclusividad' },
        { value: 'luxe', label: '🏆 ' + t('luxe', 'Lujo') + ' | Máxima categoría' }
    ];

    return (
        <Card className="mb-4">
            <Card.Header className="bg-success text-white">
                <h5 className="mb-0">
                    🏡 {t('caracteristicasAlojamiento', 'Características del Alojamiento')}
                </h5>
            </Card.Header>
            <Card.Body>
                <Row className={`${isRTL ? 'rtl-direction' : ''}`}>
                    
                    {/* Tipo de Propiedad Mejorado */}
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                🏠 {t('tipoPropiedad', 'Tipo de Propiedad')} *
                            </Form.Label>
                            <Form.Select
                                name="tipoPropiedad"
                                value={postData.tipoPropiedad || ''}
                                onChange={handleChangeInput}
                                required
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            >
                                <option value="">{t('selectTipoPropiedad', 'Seleccione tipo de propiedad')}</option>
                                {tiposPropiedades.map((tipo, index) => (
                                    <option key={index} value={tipo.value}>
                                        {tipo.label}
                                    </option>
                                ))}
                            </Form.Select>
                            <Form.Text className="text-muted">
                                {t('descTipoPropiedad', 'Seleccione el tipo de alojamiento que mejor describe su propiedad')}
                            </Form.Text>
                        </Form.Group>
                    </Col>

                    {/* Categoría/Comodidades */}
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                ⭐ {t('categoria', 'Categoría/Comodidades')} *
                            </Form.Label>
                            <Form.Select
                                name="categoria"
                                value={postData.categoria || ''}
                                onChange={handleChangeInput}
                                required
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            >
                                <option value="">{t('selectCategoria', 'Nivel de comodidades')}</option>
                                {categoriasComodidades.map((cat, index) => (
                                    <option key={index} value={cat.value}>
                                        {cat.label}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* Capacidad Mejorada */}
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                👨‍👩‍👧‍👦 {t('capacidad', 'Capacidad')} *
                            </Form.Label>
                            <Form.Select
                                name="capacidad"
                                value={postData.capacidad || ''}
                                onChange={handleChangeInput}
                                required
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            >
                                <option value="">{t('selectCapacidad', 'Número de personas')}</option>
                                {capacidades.map((cap, index) => (
                                    <option key={index} value={cap.value}>
                                        {cap.label}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* Habitaciones */}
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                🛏️ {t('habitaciones', 'Habitaciones')} *
                            </Form.Label>
                            <Form.Select
                                name="habitaciones"
                                value={postData.habitaciones || ''}
                                onChange={handleChangeInput}
                                required
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            >
                                <option value="">{t('selectHabitaciones', 'Número de habitaciones')}</option>
                                <option value="1">1 {t('habitacion', 'habitación')} | Estudio</option>
                                <option value="2">2 {t('habitaciones', 'habitaciones')} | Pareja/Pequeña familia</option>
                                <option value="3">3 {t('habitaciones', 'habitaciones')} | Familia estándar</option>
                                <option value="4">4 {t('habitaciones', 'habitaciones')} | Familia grande</option>
                                <option value="5">5+ {t('habitaciones', 'habitaciones')} | Villa/Gran capacidad</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* Superficie con categorías */}
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                📐 {t('superficie', 'Superficie (m²)')}
                            </Form.Label>
                            <Form.Select
                                name="superficie"
                                value={postData.superficie || ''}
                                onChange={handleChangeInput}
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            >
                                <option value="">{t('selectSuperficie', 'Rango de superficie')}</option>
                                <option value="0_50">0-50 m² | Pequeño</option>
                                <option value="50_80">50-80 m² | Estándar</option>
                                <option value="80_120">80-120 m² | Espacioso</option>
                                <option value="120_200">120-200 m² | Amplio</option>
                                <option value="200_plus">200+ m² | Muy amplio</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* Baños */}
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className={isRTL ? 'text-end d-block' : ''}>
                                🚿 {t('banos', 'Baños')}
                            </Form.Label>
                            <Form.Select
                                name="banos"
                                value={postData.banos || ''}
                                onChange={handleChangeInput}
                                className={isRTL ? 'text-end' : ''}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            >
                                <option value="">{t('selectBanos', 'Número de baños')}</option>
                                <option value="1">1 {t('bano', 'baño')} | Estándar</option>
                                <option value="2">2 {t('banos', 'baños')} | Confort</option>
                                <option value="3">3 {t('banos', 'baños')} | Lujo</option>
                                <option value="4">4+ {t('banos', 'baños')} | Premium</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>

                </Row>
            </Card.Body>
        </Card>
    );
};

export default Hotellocationvacance;