import React from "react";
import { Form, Card, Row, Col, Badge } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const ServiciosLocationVacances = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation('categories');
    const isRTL = i18n.language === 'ar';

    // Usar el array servicios existente de postData
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

    // Servicios para location vacances - manteniendo los valores originales
    const serviciosVacances = [
        { value: 'limpiezaDiaria', label: '🧹 ' + t('limpiezaDiaria', 'Limpieza diaria'), description: t('limpiezaDiaria_desc', 'Servicio de limpieza todos los días') },
        { value: 'cambioRopa', label: '🛏️ ' + t('cambioRopa', 'Cambio de ropa de cama'), description: t('cambioRopa_desc', 'Cambio regular de sábanas y toallas') },
        { value: 'wifiGratuito', label: '📶 ' + t('wifiGratuito', 'Wi-Fi gratuito'), description: t('wifiGratuito_desc', 'Internet de alta velocidad') },
        { value: 'parkingGratuito', label: '🅿️ ' + t('parkingGratuito', 'Parking gratuito'), description: t('parkingGratuito_desc', 'Estacionamiento incluido') },
        { value: 'piscinaPrivada', label: '🏊 ' + t('piscinaPrivada', 'Piscina privada'), description: t('piscinaPrivada_desc', 'Uso exclusivo de piscina') },
        { value: 'jacuzzi', label: '💦 ' + t('jacuzzi', 'Jacuzzi'), description: t('jacuzzi_desc', 'Bañera de hidromasaje') },
        { value: 'bbq', label: '🔥 ' + t('bbq', 'Zona de barbacoa'), description: t('bbq_desc', 'Área para parrilladas') },
        { value: 'cuna', label: '👶 ' + t('cuna', 'Cuna para bebé'), description: t('cuna_desc', 'Disponible bajo petición') },
        { value: 'lavadora', label: '🧼 ' + t('lavadora', 'Lavadora'), description: t('lavadora_desc', 'Lavadora a disposición') },
        { value: 'secadora', label: '🌬️ ' + t('secadora', 'Secadora'), description: t('secadora_desc', 'Secadora de ropa') },
        { value: 'accesoPlaya', label: '🏖️ ' + t('accesoPlaya', 'Acceso directo a playa'), description: t('accesoPlaya_desc', 'Acceso privado a la playa') },
        { value: 'gimnasio', label: '💪 ' + t('gimnasio', 'Acceso a gimnasio'), description: t('gimnasio_desc', 'Uso de instalaciones deportivas') }
    ];

    return (
        <Card className="mb-4">
            <Card.Header className="bg-success text-white">
                <h5 className="mb-0">
                    🏡 {t('serviciosLocation', 'Servicios Location Vacances')}
                </h5>
            </Card.Header>
            <Card.Body>
                <Row className={`${isRTL ? 'rtl-direction' : ''}`}>
                    <Col xs={12}>
                        <p className="text-muted mb-4">
                            {t('serviciosDescription', 'Sélectionnez les services inclus dans votre location')}
                        </p>
                        
                        <Row>
                            {serviciosVacances.map((servicio, index) => (
                                <Col xs={12} md={6} lg={4} key={index} className="mb-3">
                                    <div className={`border rounded p-3 h-100 ${servicios.includes(servicio.value) ? 'border-success bg-light' : ''}`}>
                                        <Form.Check
                                            type="checkbox"
                                            id={`service-${servicio.value}`}
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
                    </Col>
                </Row>

              
               
            </Card.Body>
        </Card>
    );
};

export default ServiciosLocationVacances;