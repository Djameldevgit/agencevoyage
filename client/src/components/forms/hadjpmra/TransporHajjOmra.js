import React from 'react';
import { Form, Row, Col, Card  } from 'react-bootstrap';
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
        { value: 'avion_direct', label: t('avion_direct', 'Vol direct'), icon: '✈️', description: t('avion_direct_desc', 'Vol sans escale') },
        { value: 'avion_escale', label: t('avion_escale', 'Vol avec escale'), icon: '🛬', description: t('avion_escale_desc', 'Vol avec une ou plusieurs escales') },
        { value: 'bus_meca_medina', label: t('bus_meca_medina', 'Bus Mecque-Médine'), icon: '🚌', description: t('bus_meca_medina_desc', 'Transport terrestre entre les villes saintes') }
    ];

    const classesVol = [
        { value: 'economy', label: t('economy', 'Économique'), icon: '💺', description: t('economy_desc', 'Classe économique standard') },
        { value: 'premium_economy', label: t('premium_economy', 'Économique Premium'), icon: '🪑', description: t('premium_economy_desc', 'Confort amélioré') },
        { value: 'business', label: t('business', 'Affaires'), icon: '💼', description: t('business_desc', 'Sièges convertibles en lit') },
        { value: 'first', label: t('first', 'Première Classe'), icon: '✨', description: t('first_desc', 'Service et confort maximum') }
    ];

    const transportsTerrestres = [
        { value: 'bus_ac', label: t('bus_ac', 'Bus climatisé'), icon: '🚌', description: t('bus_ac_desc', 'Bus avec air conditionné') },
        { value: 'van', label: t('van', 'Van de luxe'), icon: '🚐', description: t('van_desc', 'Van confortable et spacieux') },
        { value: 'voiture', label: t('voiture', 'Voiture privée'), icon: '🚗', description: t('voiture_desc', 'Transport privé individuel') },
        { value: 'non_inclus', label: t('non_inclus', 'Non inclus'), icon: '❌', description: t('non_inclus_desc', 'Transport non fourni') }
    ];

    return (
        <Card className="mb-4">
            <Card.Header >
                <h5 className="mb-0">
                    ✈️ {t('transportDetails', 'Détails du Transport')}
                </h5>
            </Card.Header>
            <Card.Body>
                <Row className={`${isRTL ? 'rtl-direction' : ''} g-3`}>
                    
                    {/* PRIMERA FILA: Type de Transport + Compagnie Aérienne */}
                    <Col xs={12} md={6}>
                        <Form.Group className="h-100">
                            <Form.Label className={`fw-bold ${isRTL ? 'text-end d-block' : ''}`}>
                                {t('typeTransport', 'Type de Transport')} *
                            </Form.Label>
                            <Form.Select
                                name="typeTransport"
                                value={postData.typeTransport || ''}
                                onChange={handleChangeInput}
                                required
                                className={`w-100 ${isRTL ? 'text-end' : ''}`}
                                dir={isRTL ? 'rtl' : 'ltr'}
                                size="lg"
                            >
                                <option value="">{t('selectTransportType', 'Sélectionnez le type de transport')}</option>
                                {transportTypes.map((type, index) => (
                                    <option key={index} value={type.value}>
                                        {type.icon} {type.label} | {type.description}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* Compagnie Aérienne */}
                    <Col xs={12} md={6}>
                        <Form.Group className="h-100">
                            <Form.Label className={`fw-bold ${isRTL ? 'text-end d-block' : ''}`}>
                                {t('compagnieAerienne', 'Compagnie Aérienne')}
                            </Form.Label>
                            <Form.Select
                                name="compagnieAerienne"
                                value={postData.compagnieAerienne || ''}
                                onChange={handleChangeInput}
                                className={`w-100 ${isRTL ? 'text-end' : ''}`}
                                dir={isRTL ? 'rtl' : 'ltr'}
                                size="lg"
                            >
                                <option value="">{t('selectAirline', 'Choisissez la compagnie aérienne')}</option>
                                {airlines.map((airline, index) => (
                                    <option key={index} value={airline.value}>
                                        {airline.label}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* SEGUNDA FILA: Classe de Vol + Transport Terrestre */}
                    <Col xs={12} md={6}>
                        <Form.Group className="h-100">
                            <Form.Label className={`fw-bold ${isRTL ? 'text-end d-block' : ''}`}>
                                {t('classeVol', 'Classe de Vol')}
                            </Form.Label>
                            <Form.Select
                                name="classeVol"
                                value={postData.classeVol || ''}
                                onChange={handleChangeInput}
                                className={`w-100 ${isRTL ? 'text-end' : ''}`}
                                dir={isRTL ? 'rtl' : 'ltr'}
                                size="lg"
                            >
                                <option value="">{t('selectClass', 'Sélectionnez la classe')}</option>
                                {classesVol.map((classe, index) => (
                                    <option key={index} value={classe.value}>
                                        {classe.icon} {classe.label} | {classe.description}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* Transport Terrestre */}
                    <Col xs={12} md={6}>
                        <Form.Group className="h-100">
                            <Form.Label className={`fw-bold ${isRTL ? 'text-end d-block' : ''}`}>
                                {t('transportTerrestre', 'Transport Terrestre')}
                            </Form.Label>
                            <Form.Select
                                name="transportTerrestre"
                                value={postData.transportTerrestre || ''}
                                onChange={handleChangeInput}
                                className={`w-100 ${isRTL ? 'text-end' : ''}`}
                                dir={isRTL ? 'rtl' : 'ltr'}
                                size="lg"
                            >
                                <option value="">{t('selectGroundTransport', 'Transport au sol inclus')}</option>
                                {transportsTerrestres.map((transport, index) => (
                                    <option key={index} value={transport.value}>
                                        {transport.icon} {transport.label} | {transport.description}
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

export default TransportHajjOmra;