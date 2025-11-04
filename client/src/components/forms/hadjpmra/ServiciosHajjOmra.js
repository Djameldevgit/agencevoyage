import React from "react";
import { Form, Card, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const ServicesHadjOmra = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation("categories");
  const isRTL = i18n.language === "ar";

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

  // Los 6 servicios más importantes para peregrinación
  const serviciosPrincipales = [
    { 
      value: "visa_hajj_omra", 
      label: "🛂 " + t("visaService", "Visa Hajj/Omra"),
    },
    { 
      value: "hebergement_haram", 
      label: "🏨 " + t("hebergementHaram", "Hébergement près des Harams"),
    },
    { 
      value: "guide_religieux", 
      label: "🕋 " + t("guideReligieux", "Guide religieux"),
    },
    { 
      value: "transport_complet", 
      label: "🚗 " + t("transportComplet", "Transport complet"),
    },
    { 
      value: "assistance_medicale", 
      label: "🏥 " + t("assistanceMedicale", "Assistance médicale"),
    },
    { 
      value: "zamzam_kit", 
      label: "💧 " + t("zamzamKit", "Kit Zamzam & sac pèlerin"),
    }
  ];

  return (
    <Card>
      <Card.Header  >
        <h5 className="mb-0">
          🎁 {t("servicesHadjOmra", "Services Essentiels Hajj & Omra")}
        </h5>
      </Card.Header>
      <Card.Body>
        <Row className={`${isRTL ? "rtl-direction" : ""}`}>
          <Col xs={12}>
            <Form.Group>
              <div className="border rounded p-3 bg-light">
                {serviciosPrincipales.map((service) => (
                  <div key={service.value} className="mb-3">
                    <div className={`d-flex align-items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                      {/* Checkbox simple */}
                      <input
                        type="checkbox"
                        id={`service-${service.value}`}
                        name="servicios"
                        checked={servicios.includes(service.value)}
                        onChange={() => handleCheckboxChange(service.value)}
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
                          htmlFor={`service-${service.value}`}
                          className="form-label mb-1 fw-bold"
                          style={{ cursor: 'pointer' }}
                        >
                          {service.label}
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

export default ServicesHadjOmra;