import React from "react";
import { Form, Card, Row, Col } from "react-bootstrap";
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
        { value: 'limpiezaDiaria', label: '🧹 ' + t('limpiezaDiaria', 'Limpieza diaria') },
        { value: 'cambioRopa', label: '🛏️ ' + t('cambioRopa', 'Cambio de ropa de cama') },
        { value: 'wifiGratuito', label: '📶 ' + t('wifiGratuito', 'Wi-Fi gratuito') },
        { value: 'parkingGratuito', label: '🅿️ ' + t('parkingGratuito', 'Parking gratuito') },
        { value: 'piscinaPrivada', label: '🏊 ' + t('piscinaPrivada', 'Piscina privada') },
        { value: 'jacuzzi', label: '💦 ' + t('jacuzzi', 'Jacuzzi') },
        { value: 'bbq', label: '🔥 ' + t('bbq', 'Zona de barbacoa') },
        { value: 'cuna', label: '👶 ' + t('cuna', 'Cuna para bebé') },
        { value: 'lavadora', label: '🧼 ' + t('lavadora', 'Lavadora') },
        { value: 'secadora', label: '🌬️ ' + t('secadora', 'Secadora') },
        { value: 'accesoPlaya', label: '🏖️ ' + t('accesoPlaya', 'Acceso directo a playa') },
        { value: 'gimnasio', label: '💪 ' + t('gimnasio', 'Acceso a gimnasio') }
    ];

    return (
        <Card>
            <Card.Header  >
                <h5 className="mb-0">
                    🏡 {t('serviciosLocation', 'Servicios Location Vacances')}
                </h5>
            </Card.Header>
            <Card.Body>
                <Row className={`${isRTL ? 'rtl-direction' : ''}`}>
                    <Col xs={12}>
                        <Form.Group>
                            <div className="border rounded p-3 bg-light">
                                {serviciosVacances.map((servicio) => (
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
                                            <div className="flex-grow-1">
                                                <label 
                                                    htmlFor={`service-${servicio.value}`}
                                                    className="form-label mb-1 fw-bold"
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    {servicio.label}
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

export default ServiciosLocationVacances;