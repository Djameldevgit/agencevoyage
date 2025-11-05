import React from 'react';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const TransportHajjOmra = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation(["categories"]);
    const isRTL = i18n.language === 'ar';

    const airlines = [
        { value: 'Air Algérie', label: t('air_algerie', 'Air Algérie') },
        { value: 'Saudi Airlines', label: t('saudi_airlines', 'Saudi Airlines') },
        { value: 'Emirates', label: t('emirates', 'Emirates') },
        { value: 'Qatar Airways', label: t('qatar_airways', 'Qatar Airways') },
        { value: 'Turkish Airlines', label: t('turkish_airlines', 'Turkish Airlines') },
        { value: 'Etihad Airways', label: t('etihad_airways', 'Etihad Airways') },
        { value: 'Other', label: t('other_airline', 'Autre compagnie') }
    ];

    const transportTypes = [
        { value: 'avion_direct', label: t('avion_direct', 'Vol direct') },
        { value: 'avion_escale', label: t('avion_escale', 'Vol avec escale') },
        { value: 'bus_meca_medina', label: t('bus_meca_medina', 'Bus Mecque-Médine') }
    ];

    const classesVol = [
        { value: 'economy', label: t('economy', 'Économique') },
        { value: 'premium_economy', label: t('premium_economy', 'Économique Premium') },
        { value: 'business', label: t('business', 'Affaires') },
        { value: 'first', label: t('first', 'Première Classe') }
    ];

    const transportsTerrestres = [
        { value: 'bus_ac', label: t('bus_ac', 'Bus climatisé') },
        { value: 'van', label: t('van', 'Van de luxe') },
        { value: 'voiture', label: t('voiture', 'Voiture privée') },
        { value: 'non_inclus', label: t('non_inclus', 'Non inclus') }
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
                <option value="">{t(`select${name.charAt(0).toUpperCase() + name.slice(1)}`, `Sélectionnez ${label.toLowerCase()}`)}</option>
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
            <Card.Header>
                <h5 className="mb-0">
                    {t('transportDetails', 'Détails du Transport')}
                </h5>
            </Card.Header>
            <Card.Body>
                <Row className={`${isRTL ? 'rtl-direction' : ''} g-3`}>
                    
                    {/* Type de Transport */}
                    <Col xs={12} md={6}>
                        {renderSelect(
                            'typeTransport',
                            t('typeTransport', 'Type de Transport'),
                            transportTypes,
                            true
                        )}
                    </Col>

                    {/* Compagnie Aérienne */}
                    <Col xs={12} md={6}>
                        {renderSelect(
                            'compagnieAerienne',
                            t('compagnieAerienne', 'Compagnie Aérienne'),
                            airlines
                        )}
                    </Col>

                    {/* Classe de Vol */}
                    <Col xs={12} md={6}>
                        {renderSelect(
                            'classeVol',
                            t('classeVol', 'Classe de Vol'),
                            classesVol
                        )}
                    </Col>

                    {/* Transport Terrestre */}
                    <Col xs={12} md={6}>
                        {renderSelect(
                            'transportTerrestre',
                            t('transportTerrestre', 'Transport Terrestre'),
                            transportsTerrestres
                        )}
                    </Col>

                </Row>
            </Card.Body>
        </Card>
    );
};

export default TransportHajjOmra;