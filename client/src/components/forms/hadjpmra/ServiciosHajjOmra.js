import React from "react";
import { Form, Card, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const ServicesHadjOmra = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation("categories");
  const isRTL = i18n.language === "ar";

  const handleCheckboxChange = (value) => {
    const newServicios = postData.servicios.includes(value)
      ? postData.servicios.filter((item) => item !== value)
      : [...postData.servicios, value];
    handleChangeInput({ target: { name: "servicios", value: newServicios } });
  };

  const services = [
    "Visa",
    "Hébergement à Makkah",
    "Hébergement à Médine",
    "Guide religieux",
    "Transport interne",
    "Assistance médicale",
    "Vol inclus",
  ];

  return (
    <Card className="mb-4">
      <Card.Body>
        <Row className={`${isRTL ? "rtl-direction" : ""}`}>
          <Col xs={12}>
            <Form.Group>
              <Form.Label className={isRTL ? "text-end d-block" : ""}>
                {t("servicesInclus", "Services inclus")}
              </Form.Label>
              <div className={isRTL ? "text-end" : ""}>
                {services.map((service, index) => (
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

export default ServicesHadjOmra;
