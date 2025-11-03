import React from "react";
import { Form, Row, Col, Card, Badge } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const TransportVoyagesOrganises = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation("categories");
  const isRTL = i18n.language === "ar";

  // Usar el array servicios existente
  const servicios = postData.servicios || [];

  const handleCheckboxChange = (value) => {
    const newServicios = servicios.includes(value)
      ? servicios.filter((item) => item !== value)
      : [...servicios, value];
    
    handleChangeInput({ 
      target: { 
        name: "servicios", 
        value: newServicios 
      } 
    });
  };

  const transportModes = [
    { value: "avion", label: "✈️ " + t("avion", "Avion"), icon: "✈️" },
    { value: "bus", label: "🚌 " + t("bus", "Bus"), icon: "🚌" },
    { value: "train", label: "🚆 " + t("train", "Train"), icon: "🚆" },
    { value: "bateau", label: "🚢 " + t("bateau", "Bateau"), icon: "🚢" },
    { value: "mixte", label: "🔀 " + t("mixte", "Mixte"), icon: "🔀" },
  ];

  const airlines = [
    { value: "air_algerie", label: "🇩🇿 " + t("airAlgerie", "Air Algérie") },
    { value: "turkish_airlines", label: "🇹🇷 " + t("turkishAirlines", "Turkish Airlines") },
    { value: "qatar_airways", label: "🇶🇦 " + t("qatarAirways", "Qatar Airways") },
    { value: "emirates", label: "🇦🇪 " + t("emirates", "Emirates") },
    { value: "saudian_airlines", label: "🇸🇦 " + t("saudianAirlines", "Saudia Airlines") },
    { value: "air_france", label: "🇫🇷 " + t("airFrance", "Air France") },
    { value: "other", label: t("other", "Otra compañía") }
  ];

  const transportServices = [
    { 
      value: "transferts_aeroport", 
      label: "🚐 " + t("transfertsAeroport", "Transferts aéroport"),
      description: t("transfertsAeroport_desc", "Transfert aller-retour aéroport-hôtel")
    },
    { 
      value: "transport_excursions", 
      label: "🏞️ " + t("transportExcursions", "Transport excursions"),
      description: t("transportExcursions_desc", "Transport pour visites et excursions")
    },
    { 
      value: "assistance_guide", 
      label: "👨‍💼 " + t("assistanceGuide", "Assistance guide"),
      description: t("assistanceGuide_desc", "Guide accompagnant durant les transferts")
    },
    { 
      value: "navette_gratuite", 
      label: "🚍 " + t("navetteGratuite", "Navette gratuite"),
      description: t("navetteGratuite_desc", "Navette régulière vers points d'intérêt")
    },
    { 
      value: "transport_prive", 
      label: "🚗 " + t("transportPrive", "Transport privé"),
      description: t("transportPrive_desc", "Véhicule privé avec chauffeur")
    }
  ];

  const flightTypes = [
    { value: "direct", label: "🎯 " + t("volDirect", "Vol direct"), description: t("volDirect_desc", "Sans escale") },
    { value: "escale", label: "🔄 " + t("volEscale", "Vol avec escale"), description: t("volEscale_desc", "Avec une ou plusieurs escales") },
    { value: "lowcost", label: "💰 " + t("volLowCost", "Vol low cost"), description: t("volLowCost_desc", "Compagnie low cost") },
    { value: "affaire", label: "💼 " + t("volAffaire", "Classe affaires"), description: t("volAffaire_desc", "Siège classe affaires inclus") }
  ];

  return (
    <Card className="mb-4">
    
      <Card.Body>
        <Row className={`${isRTL ? "rtl-direction" : ""}`}>
  
          <Col >
            <Form.Group className="mb-3">
             
              <Form.Select
                name="modeTransport"
                value={postData.modeTransport || ""}
                onChange={handleChangeInput}
                required
                className={isRTL ? "text-end" : ""}
                dir={isRTL ? "rtl" : "ltr"}
              >
                <option value="">{t("selectMainTransport", "Sélectionnez le mode de transport")}</option>
                {transportModes.map((mode, index) => (
                  <option key={index} value={mode.value}>
                    {mode.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Sección específica para transporte aéreo */}
          {postData.modeTransport === "avion" && (
            <>
              <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className={isRTL ? "text-end d-block fw-bold" : "fw-bold"}>
                    ✈️ {t("compagnieAerienne", "Compagnie aérienne")} *
                  </Form.Label>
                  <Form.Select
                    name="compagnieAerienne"
                    value={postData.compagnieAerienne || ""}
                    onChange={handleChangeInput}
                    required
                    className={isRTL ? "text-end" : ""}
                    dir={isRTL ? "rtl" : "ltr"}
                  >
                    <option value="">{t("selectAirline", "Sélectionnez la compagnie")}</option>
                    {airlines.map((airline, index) => (
                      <option key={index} value={airline.value}>
                        {airline.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className={isRTL ? "text-end d-block fw-bold" : "fw-bold"}>
                    🎫 {t("typeVol", "Type de vol")}
                  </Form.Label>
                  <Form.Select
                    name="typeVol"
                    value={postData.typeVol || ""}
                    onChange={handleChangeInput}
                    className={isRTL ? "text-end" : ""}
                    dir={isRTL ? "rtl" : "ltr"}
                  >
                    <option value="">{t("selectTypeVol", "Sélectionnez le type de vol")}</option>
                    {flightTypes.map((type, index) => (
                      <option key={index} value={type.value}>
                        {type.label} | {type.description}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </>
          )}

          {/* Servicios de transporte - Versión mejorada */}
          <Col xs={12}>
            <div className="border rounded p-3 bg-light">
              <Form.Group className="mb-0">
                <Form.Label className={`fw-bold ${isRTL ? "text-end d-block" : ""}`}>
                  🛠️ {t("servicesTransport", "Services de transport inclus")}
                </Form.Label>
            
                
                <Row>
                  {transportServices.map((service, index) => (
                    <Col xs={12} md={6} key={index} className="mb-2">
                      <div className={`border rounded p-2 ${servicios.includes(service.value) ? 'border-info bg-white' : 'bg-light'}`}>
                        <Form.Check
                          type="checkbox"
                          id={`transport-service-${index}`}
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
              </Form.Group>
            </div>
          </Col>

      
        </Row>
      </Card.Body>
    </Card>
  );
};

export default TransportVoyagesOrganises;