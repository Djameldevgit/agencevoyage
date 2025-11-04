import React from "react";
import { Form, Row, Col, Card } from "react-bootstrap";
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
    { value: "avion", label: "✈️ " + t("avion", "Avion") },
    { value: "bus", label: "🚌 " + t("bus", "Bus") },
    { value: "train", label: "🚆 " + t("train", "Train") },
    { value: "bateau", label: "🚢 " + t("bateau", "Bateau") },
    { value: "mixte", label: "🔀 " + t("mixte", "Mixte") },
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
      label: "🚐 " + t("transfertsAeroport", "Transferts aéroport")
    },
    { 
      value: "transport_excursions", 
      label: "🏞️ " + t("transportExcursions", "Transport excursions")
    },
    { 
      value: "assistance_guide", 
      label: "👨‍💼 " + t("assistanceGuide", "Assistance guide")
    },
    { 
      value: "navette_gratuite", 
      label: "🚍 " + t("navetteGratuite", "Navette gratuite")
    },
    { 
      value: "transport_prive", 
      label: "🚗 " + t("transportPrive", "Transport privé")
    }
  ];

  const flightTypes = [
    { value: "direct", label: "🎯 " + t("volDirect", "Vol direct") },
    { value: "escale", label: "🔄 " + t("volEscale", "Vol avec escale") },
    { value: "lowcost", label: "💰 " + t("volLowCost", "Vol low cost") },
    { value: "affaire", label: "💼 " + t("volAffaire", "Classe affaires") }
  ];

  return (
    <Card>
      <Card.Header >
        <h5 className="mb-0">
          🚗 {t("transportVoyages", "Transport pour Voyages Organisés")}
        </h5>
      </Card.Header>
      <Card.Body>
        <Row className={`${isRTL ? "rtl-direction" : ""}`}>
  
          {/* Modo de transporte principal */}
          <Col xs={12}>
            <Form.Group className="mb-4">
              <Form.Select
                name="modeTransport"
                value={postData.modeTransport || ""}
                onChange={handleChangeInput}
                required
                className={`w-100 ${isRTL ? "text-end" : ""}`}
                dir={isRTL ? "rtl" : "ltr"}
                size="lg"
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
              <Col xs={12}>
                <Form.Group className="mb-4">
                  <Form.Select
                    name="compagnieAerienne"
                    value={postData.compagnieAerienne || ""}
                    onChange={handleChangeInput}
                    required
                    className={`w-100 ${isRTL ? "text-end" : ""}`}
                    dir={isRTL ? "rtl" : "ltr"}
                    size="lg"
                  >
                    <option value="">{t("selectAirline", "Sélectionnez la compagnie aérienne")}</option>
                    {airlines.map((airline, index) => (
                      <option key={index} value={airline.value}>
                        {airline.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col xs={12}>
                <Form.Group className="mb-4">
                  <Form.Select
                    name="typeVol"
                    value={postData.typeVol || ""}
                    onChange={handleChangeInput}
                    className={`w-100 ${isRTL ? "text-end" : ""}`}
                    dir={isRTL ? "rtl" : "ltr"}
                    size="lg"
                  >
                    <option value="">{t("selectTypeVol", "Sélectionnez le type de vol")}</option>
                    {flightTypes.map((type, index) => (
                      <option key={index} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </>
          )}

          {/* Servicios de transporte - Mismos estilos exactos */}
          <Col xs={12}>
            <Form.Group>
              <div className="border rounded p-3 bg-light">
                {transportServices.map((service) => (
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

export default TransportVoyagesOrganises;