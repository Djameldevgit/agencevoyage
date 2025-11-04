import React from "react";
import { Form, Card, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const ServicesHadjOmra = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation(["descripcion", "categories"]);
  const isRTL = i18n.language === "ar" || i18n.language === "ara";

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
      description: t("visaDesc", "Traitement et obtention du visa officiel")
    },
    { 
      value: "hebergement_haram", 
      label: "🏨 " + t("hebergementHaram", "Hébergement près des Harams"),
      description: t("hebergementHaramDesc", "Hôtels à proximité des mosquées saintes")
    },
    { 
      value: "guide_religieux", 
      label: "🕋 " + t("guideReligieux", "Guide religieux"),
      description: t("guideReligieuxDesc", "Guide spécialisé francophone pour les rituels")
    },
    { 
      value: "transport_complet", 
      label: "🚗 " + t("transportComplet", "Transport complet"),
      description: t("transportCompletDesc", "Transferts aéroport, navettes, bus internes")
    },
    { 
      value: "assistance_medicale", 
      label: "🏥 " + t("assistanceMedicale", "Assistance médicale"),
      description: t("assistanceMedicaleDesc", "Équipe médicale et assurance santé")
    },
    { 
      value: "zamzam_kit", 
      label: "💧 " + t("zamzamKit", "Kit Zamzam & sac pèlerin"),
      description: t("zamzamKitDesc", "Eau Zamzam et équipement du pèlerin offerts")
    }
  ];

  return (
    <Card>
      <Card.Header style={{ direction: isRTL ? "rtl" : "ltr" }}>
        <h5 className="mb-0">
          🎁 {t("servicesHadjOmra", "Services Essentiels Hajj & Omra")}
        </h5>
        <small className="text-muted" style={{ 
          textAlign: isRTL ? "right" : "left",
          fontSize: "0.85rem"
        }}>
          {t("servicesDescription", "Sélectionnez les services inclus dans votre package")}
        </small>
      </Card.Header>
      <Card.Body>
        <Row style={{ direction: isRTL ? "rtl" : "ltr" }}>
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
                      <div className="flex-grow-1" style={{ textAlign: isRTL ? "right" : "left" }}>
                        <label 
                          htmlFor={`service-${service.value}`}
                          className="form-label mb-1 fw-bold d-block"
                          style={{ cursor: 'pointer', fontSize: "1rem" }}
                        >
                          {service.label}
                        </label>
                        <div className="text-muted small" style={{ 
                          fontSize: "0.85rem",
                          lineHeight: "1.3"
                        }}>
                          {service.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2" style={{ textAlign: isRTL ? "right" : "left" }}>
                <small className="text-muted">
                  {t("serviciosSeleccionados", "Services sélectionnés")}: {servicios.length}
                </small>
              </div>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ServicesHadjOmra;