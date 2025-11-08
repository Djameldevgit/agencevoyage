import React from 'react';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Hotellocationvacance = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation(["categories"]);
    const isRTL = i18n.language === 'ar' || i18n.language === 'ara';

    const tiposPropiedades = [
        { value: 'villa_lujo', label: t('villa_lujo', 'Villa de Lujo') },
        { value: 'villa_familiar', label: t('villa_familiar', 'Villa Familiar') },
        { value: 'apartamento_lujo', label: t('apartamento_lujo', 'Apartamento Premium') },
        { value: 'apartamento_estudio', label: t('apartamento_estudio', 'Apartamento Estudio') },
        { value: 'studio', label: t('studio', 'Studio') },
        { value: 'riad', label: t('riad', 'Riad Tradicional') },
        { value: 'chalet_montana', label: t('chalet_montana', 'Chalet Montaña') },
        { value: 'casa_playa', label: t('casa_playa', 'Casa Playa') },
        { value: 'duplex', label: t('duplex', 'Dúplex') },
        { value: 'penthouse', label: t('penthouse', 'Penthouse') },
        { value: 'bungalow', label: t('bungalow', 'Bungalow') },
        { value: 'casa_rural', label: t('casa_rural', 'Casa Rural') }
    ];

    const capacidades = [
        { value: '1_2', label: t('1_2_personas', '1-2 personas') },
        { value: '2_4', label: t('2_4_personas', '2-4 personas') },
        { value: '4_6', label: t('4_6_personas', '4-6 personas') },
        { value: '6_8', label: t('6_8_personas', '6-8 personas') },
        { value: '8_10', label: t('8_10_personas', '8-10 personas') },
        { value: '10_12', label: t('10_12_personas', '10-12 personas') },
        { value: '12_plus', label: t('12_plus_personas', '12+ personas') }
    ];

    const categoriasComodidades = [
        { value: 'economico', label: t('economico', 'Económico') },
        { value: 'estandar', label: t('estandar', 'Estándar') },
        { value: 'superior', label: t('superior', 'Superior') },
        { value: 'premium', label: t('premium', 'Premium') },
        { value: 'luxe', label: t('luxe', 'Lujo') }
    ];

    const habitacionesOptions = [
        { value: '1', label: t('1_habitacion', '1 habitación') },
        { value: '2', label: t('2_habitaciones', '2 habitaciones') },
        { value: '3', label: t('3_habitaciones', '3 habitaciones') },
        { value: '4', label: t('4_habitaciones', '4 habitaciones') },
        { value: '5', label: t('5_plus_habitaciones', '5+ habitaciones') }
    ];

    const superficieOptions = [
        { value: '0_50', label: t('superficie_0_50', '0-50 m²') },
        { value: '50_80', label: t('superficie_50_80', '50-80 m²') },
        { value: '80_120', label: t('superficie_80_120', '80-120 m²') },
        { value: '120_200', label: t('superficie_120_200', '120-200 m²') },
        { value: '200_plus', label: t('superficie_200_plus', '200+ m²') }
    ];

    const banosOptions = [
        { value: '1', label: t('1_bano', '1 baño') },
        { value: '2', label: t('2_banos', '2 baños') },
        { value: '3', label: t('3_banos', '3 baños') },
        { value: '4', label: t('4_plus_banos', '4+ baños') }
    ];

    const renderSelect = (name, label, options, required = false) => (
        <Form.Group className="h-100">
            <Form.Label className={`fw-bold ${isRTL ? 'text-end d-block' : ''}`}>
                {label} {required && '*'}
            </Form.Label>
            <Form.Select
                name={name}
                value={postData[name] || ''}
                onChange={handleChangeInput}
                required={required}
                className={`w-100 ${isRTL ? 'text-end' : ''}`}
                dir={isRTL ? 'rtl' : 'ltr'}
                size="lg"
            >
                <option value="">{t(`select${name.charAt(0).toUpperCase() + name.slice(1)}`, `Seleccione ${label.toLowerCase()}`)}</option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </Form.Select>
        </Form.Group>
    );

    return (
        <Card className="mb-4">
            <Card.Header style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
                <h5 className="mb-0">
                    {t('caracteristicasAlojamiento', 'Características del Alojamiento')}
                </h5>
            </Card.Header>
            <Card.Body>
                {/* Campo nombreHotel agregado aquí */}
                <Form.Group className="mb-3">
                    <Form.Label className={`fw-bold ${isRTL ? 'text-end d-block' : ''}`}>
                        {t('nombreHotel', 'Nom du Logement')} *
                    </Form.Label>
                    <Form.Control
                        type="text"
                        name="nombreHotel"
                        placeholder={t('placeholderNombreHotel', 'Ex: Villa Les Palmiers, Riad Marrakech...')}
                        value={postData.nombreHotel || ''}
                        onChange={handleChangeInput}
                        required
                        className={`w-100 ${isRTL ? 'text-end' : ''}`}
                        dir={isRTL ? 'rtl' : 'ltr'}
                        size="lg"
                    />
                </Form.Group>

                <Row style={{ direction: isRTL ? 'rtl' : 'ltr' }} className="g-3">
                    
                    {/* Tipo de Propiedad */}
                    <Col xs={12} md={6}>
                        {renderSelect(
                            'tipoPropiedad',
                            t('tipoPropiedad', 'Tipo de Propiedad'),
                            tiposPropiedades,
                            true
                        )}
                    </Col>

                    {/* Categoría/Comodidades */}
                    <Col xs={12} md={6}>
                        {renderSelect(
                            'categoria',
                            t('categoria', 'Categoría/Comodidades'),
                            categoriasComodidades,
                            true
                        )}
                    </Col>

                    {/* Capacidad */}
                    <Col xs={12} md={6}>
                        {renderSelect(
                            'capacidad',
                            t('capacidad', 'Capacidad'),
                            capacidades,
                            true
                        )}
                    </Col>

                    {/* Habitaciones */}
                    <Col xs={12} md={6}>
                        {renderSelect(
                            'habitaciones',
                            t('habitaciones', 'Habitaciones'),
                            habitacionesOptions,
                            true
                        )}
                    </Col>

                    {/* Superficie */}
                    <Col xs={12} md={6}>
                        {renderSelect(
                            'superficie',
                            t('superficie', 'Superficie (m²)'),
                            superficieOptions
                        )}
                    </Col>

                    {/* Baños */}
                    <Col xs={12} md={6}>
                        {renderSelect(
                            'banos',
                            t('banos', 'Baños'),
                            banosOptions
                        )}
                    </Col>

                </Row>
            </Card.Body>
        </Card>
    );
};

export default Hotellocationvacance;