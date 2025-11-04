import React from "react";
import { Form, Card, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const ServicesHadjOmra = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation(["categories"]);
  const isRTL = i18n.language === "ar";

  const servicios = postData.servicios || [];

  const handleCheckboxChange = (serviceId) => {
    const updatedServicios = servicios.includes(serviceId)
      ? servicios.filter(item => item !== serviceId)
      : [...servicios, serviceId];
    
    handleChangeInput({ 
      target: { 
        name: "servicios", 
        value: updatedServicios 
      } 
    });
  };

  // Servicios principales con IDs constantes
  const serviciosPrincipales = [
    { 
      id: "visa_hajj_omra",
      label: "🛂 " + t("servicess.visa_hajj_omra", "Visa Hajj/Omra"),
      description: t("servicess.visaDesc", "Traitement et obtention du visa officiel")
    },
    { 
      id: "hebergement_haram",
      label: "🏨 " + t("servicess.hebergement_haram", "Hébergement près des Harams"),
      description: t("servicess.hebergementHaramDesc", "Hôtels à proximité des mosquées saintes")
    },
    { 
      id: "guide_religieux",
      label: "🕋 " + t("servicess.guide_religieux", "Guide religieux"),
      description: t("servicess.guideReligieuxDesc", "Guide spécialisé francophone pour les rituels")
    },
    { 
      id: "transport_complet",
      label: "🚗 " + t("servicess.transport_complet", "Transport complet"),
      description: t("servicess.transportCompletDesc", "Transferts aéroport, navettes, bus internes")
    },
    { 
      id: "assistance_medicale",
      label: "🏥 " + t("servicess.assistance_medicale", "Assistance médicale"),
      description: t("servicess.assistanceMedicaleDesc", "Équipe médicale et assurance santé")
    },
    { 
      id: "zamzam_kit",
      label: "💧 " + t("servicess.zamzam_kit", "Kit Zamzam & sac pèlerin"),
      description: t("servicess.zamzamKitDesc", "Eau Zamzam et équipement du pèlerin offerts")
    }
  ];

  return (
    <Card>
      <Card.Header style={{ direction: isRTL ? "rtl" : "ltr" }}>
        <h5 className="mb-0">
          🎁 {t("servicess.servicesHadjOmra", "Services Essentiels Hajj & Omra")}
        </h5>
        <small className="text-muted" style={{ 
          textAlign: isRTL ? "right" : "left",
          fontSize: "0.85rem"
        }}>
          {t("servicess.servicesDescription", "Sélectionnez les servicess inclus dans votre package")}
        </small>
      </Card.Header>
      <Card.Body>
        <Row style={{ direction: isRTL ? "rtl" : "ltr" }}>
          <Col xs={12}>
            <Form.Group>
              <div className="border rounded p-3 bg-light">
                {serviciosPrincipales.map((service) => (
                  <div key={service.id} className="mb-3">
                    <div className={`d-flex align-items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                      {/* Checkbox simple */}
                      <input
                        type="checkbox"
                        id={`service-${service.id}`}
                        name="servicios"
                        value={service.id}
                        checked={servicios.includes(service.id)}
                        onChange={() => handleCheckboxChange(service.id)}
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
                          htmlFor={`service-${service.id}`}
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
                  {t("servicess.serviciosSeleccionados", "Services sélectionnés")}: {servicios.length}
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