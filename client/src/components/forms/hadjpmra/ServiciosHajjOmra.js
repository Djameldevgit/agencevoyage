import React from "react";
import { Form, Card, Row, Col, Badge } from "react-bootstrap";
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
      label: t("visaService", "🛂 Visa Hajj/Omra"), 
      description: t("visaDesc", "Traitement et obtention du visa officiel") 
    },
    { 
      value: "hebergement_haram", 
      label: t("hebergementHaram", "🏨 Hébergement près des Harams"), 
      description: t("hebergementHaramDesc", "Hôtels à proximité des mosquées saintes") 
    },
    { 
      value: "guide_religieux", 
      label: t("guideReligieux", "🕋 Guide religieux"), 
      description: t("guideReligieuxDesc", "Guide spécialisé francophone pour les rituels") 
    },
    { 
      value: "transport_complet", 
      label: t("transportComplet", "🚗 Transport complet"), 
      description: t("transportCompletDesc", "Transferts aéroport, navettes, bus internes") 
    },
    { 
      value: "assistance_medicale", 
      label: t("assistanceMedicale", "🏥 Assistance médicale"), 
      description: t("assistanceMedicaleDesc", "Équipe médicale et assurance santé") 
    },
    { 
      value: "zamzam_kit", 
      label: t("zamzamKit", "💧 Kit Zamzam & sac pèlerin"), 
      description: t("zamzamKitDesc", "Eau Zamzam et équipement du pèlerin offerts") 
    }
  ];

  return (
    <Card className="mb-4">
      <Card.Header className="bg-primary text-white">
        <h5 className="mb-0">
          🎁 {t("servicesHadjOmra", "Services Essentiels Hajj & Omra")}
        </h5>
      </Card.Header>
      <Card.Body>
        <Row className={`${isRTL ? "rtl-direction" : ""}`}>
          <Col xs={12}>
            <p className="text-muted mb-4">
              {t("servicesDescription", "Sélectionnez les  dans votre package")}
            </p>
            
            <Row>
              {serviciosPrincipales.map((service, index) => (
                <Col xs={12} md={6} lg={4} key={index} className="mb-3">
                  <div className={`border rounded p-3 h-100 ${servicios.includes(service.value) ? 'border-primary bg-light' : ''}`}>
                    <Form.Check
                      type="checkbox"
                      id={`service-${service.value}`}
                      label={
                        <div>
                          <strong>{service.label}</strong>
                          <br />
                          <small className="text-muted">
                            {service.description}
                          </small>
                        </div>
                      }
                      checked={servicios.includes(service.value)}
                      onChange={() => handleCheckboxChange(service.value)}
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

export default ServicesHadjOmra;