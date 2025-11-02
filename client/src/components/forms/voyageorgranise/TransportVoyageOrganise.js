import React from "react";
import { Form, Row, Col, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const TransportVoyagesOrganises = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation("categories");
  const isRTL = i18n.language === "ar";

  const handleCheckboxChange = (value) => {
    const newServicios = postData.servicios.includes(value)
      ? postData.servicios.filter((item) => item !== value)
      : [...postData.servicios, value];
    handleChangeInput({ target: { name: "servicios", value: newServicios } });
  };

  const transportModes = [
    { value: "avion", label: "✈️ Avion" },
    { value: "bus", label: "🚌 Bus" },
    { value: "train", label: "🚆 Train" },
    { value: "bateau", label: "🚢 Bateau" },
    { value: "mixte", label: "🔀 Mixte" },
  ];

  const airlines = ["Air Algérie", "Turkish Airlines", "Qatar Airways", "Other"];

  const transportServices = [
    "Transferts aéroport",
    "Transport excursions",
    "Assistance guide",
  ];

  return (
    <Card className="mb-4">
      <Card.Body>
        <Row className={`${isRTL ? "rtl-direction" : ""}`}>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label className={isRTL ? "text-end d-block" : ""}>
                {t("modeTransport", "Mode de Transport Principal")}
              </Form.Label>
              <Form.Select
                name="modeTransport"
                value={postData.modeTransport || ""}
                onChange={handleChangeInput}
              >
                <option value="">{t("selectMainTransport", "Sélectionnez")}</option>
                {transportModes.map((m, i) => (
                  <option key={i} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          {postData.modeTransport === "avion" && (
            <Col xs={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>{t("compagnieAerienne", "Compagnie aérienne")}</Form.Label>
                <Form.Select
                  name="compagnieAerienne"
                  value={postData.compagnieAerienne || ""}
                  onChange={handleChangeInput}
                >
                  <option value="">{t("selectAirline", "Sélectionnez la compagnie")}</option>
                  {airlines.map((a, i) => (
                    <option key={i} value={a}>
                      {a}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          )}

          {/* Services inclus du transport */}
          <Col xs={12}>
            <Form.Group className="mb-3">
              <Form.Label>{t("servicesTransport", "Services de transport inclus")}</Form.Label>
              <div className={isRTL ? "text-end" : ""}>
                {transportServices.map((service, index) => (
                  <Form.Check
                    key={index}
                    inline
                    type="checkbox"
                    label={service}
                    checked={postData.servicios.includes(service)}
                    onChange={() => handleCheckboxChange(service)}
                    className={isRTL ? "ms-2" : "me-2"}
                  />
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
