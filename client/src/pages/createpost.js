import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { FaSave, FaTimes } from 'react-icons/fa';

// 🔷 IMPORTS OPTIMIZADOS
import CategorySelector from '../components/forms/CategorySelector';
import DescriptionTextarea from '../components/forms/DescriptionTextarea';
import AddressInput from '../components/forms/AddressInput';
import ImageUpload from '../components/forms/ImageUpload';
import ContactReservation from '../components/forms/ContactReservation';

// 🔷 COMPONENTES DE FECHAS Y HORARIOS
import DateDeparRetour from '../components/forms/DateDeparRetour';
import HoraDepart from '../components/forms/HoraDepart';
import DurationDisplay from '../components/forms/DuracionDelViaje';

// 🔷 COMPONENTES POR CATEGORÍA
import DestinationHajjOmra from '../components/forms/hadjpmra/DestinacionHdjaOmra';
import DestinationLocationVacances from '../components/forms/locationvacances/DestinacionLocationvacances';
import DestinationVoyagesOrganises from '../components/forms/voyageorgranise/Destinacionvoyageorganise';

import TransportHajjOmra from '../components/forms/hadjpmra/TransporHajjOmra';
import AlojamientoHajjOmra from '../components/forms/hadjpmra/HotelHajjOmra';
import AlojamientoLocationVacances from '../components/forms/locationvacances/Hotellocationvacance';
import NombreLugarVoyagesOrganises from '../components/forms/voyageorgranise/NombreLugarVoyagesOrganiseq';

// 🔷 NUEVOS COMPONENTES DE SERVICIOS UNIFICADOS
import ServicesHadjOmra from '../components/forms/hadjpmra/ServiciosHajjOmra';
import ServicesLocationVacances from '../components/forms/locationvacances/ServicesLocationVacances';
import ServicesVoyageOrganise from '../components/forms/voyageorgranise/ServicesVoyageOrganise';

import TarifasYprecios from '../components/forms/TarifasYprecios';
import TarifasYpreciosomra from '../components/forms/hadjpmra/TarifasYpreciosomra';

// 🔷 REDUX Y DATOS
import { createPost, updatePost } from '../redux/actions/postAction';

const getInitialState = () => ({
  // ✅ CAMPOS COMUNES A TODAS LAS CATEGORÍAS
  category: "Tassili Voyage",
  subCategory: "",
  title: "",
  description: "",
  price: "",
  wilaya: "",
  commune: "",
  vile: "",
  contacto: "",
  images: [],
  destinacion: "", // ✅ ÚNICO CAMPO PARA DESTINO
  datedepar: "",
  horadudepar: "",
  dateretour: "",
  dureeSejour: "",
  servicios: [],
  
  // 🏨 CAMPOS DE HOTEL
  nombreHotel: "",
  ciudadHotel: "",
  zonaRegion: "",
  direccionHotel: "",

  // 💰 CAMPOS DE PRECIOS NUEVOS
  precioBase: "",
  tarifaNinos: "", 
  tarifaBebes: "",
  descuentoGrupo: false,
  ofertaEspecial: false,
  
  // 🆕 NUEVOS CAMPOS DE DESCUENTOS
  descuentoTemporadaBaja: false,
  descuentoAnticipacion: false,
 
  // ✅ CAMPOS CRÍTICOS EXISTENTES
  ...Object.fromEntries([
    'tipoPrecio',           // Precios Hajj
    'prixAdulte', 
    'prixEnfant', 
    'prixBebe'              // Tarifas Voyage
  ].map(key => [key, ""])),

  // 🏠 CAMPOS DE Hotellocationvacance
  tipoPropiedad: "",
  categoria: "",
  capacidad: "",
  habitaciones: "",
  superficie: "",
  banos: "",

 
  // ✈️ CAMPOS DE TransportHajjOmra
  typeTransport: "",
  compagnieAerienne: "",
  classeVol: "",
  transportTerrestre: ""
});

const Createpost = () => {
  const { auth, theme, languageReducer } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { t, i18n } = useTranslation('categories');

  const isEdit = location.state?.isEdit || false;
  const postToEdit = location.state?.postData || null;
  const isRTL = i18n.language === 'ar';

  const [postData, setPostData] = useState(getInitialState);
  const [images, setImages] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("info");

  useEffect(() => {
    const lang = languageReducer?.language || 'fr';
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [languageReducer?.language, i18n]);

  useEffect(() => {
    if (isEdit && postToEdit) {
      const sanitizedData = sanitizePostData(postToEdit);
      
      // ✅ MIGRACIÓN AUTOMÁTICA - BUSCAR EN TODOS LOS CAMPOS OBSOLETOS
      const destinacionUnificada = 
        sanitizedData.destinacion || 
        sanitizedData.destinacionomra || 
        sanitizedData.destinacionvoyageorganise || 
        sanitizedData.destinacionlocacionvoyage || 
        "";

      const finalPostData = {
        ...getInitialState(),
        ...sanitizedData,
        category: sanitizedData.category || "Tassili Voyage",
        subCategory: sanitizedData.subCategory || "",
        description: sanitizedData.description || sanitizedData.content || "",
        title: sanitizedData.title || "",
        servicios: Array.isArray(sanitizedData.servicios) ? sanitizedData.servicios : [],
        destinacion: destinacionUnificada, // ✅ ASIGNACIÓN DEL DESTINO UNIFICADO
      };

      // ✅ ELIMINAR DEFINITIVAMENTE CAMPOS OBSOLETOS DE DESTINO
      delete finalPostData.destinacionomra;
      delete finalPostData.destinacionvoyageorganise;
      delete finalPostData.destinacionlocacionvoyage;

      setPostData(finalPostData);

      if (postToEdit.images?.length > 0) {
        const existingImages = postToEdit.images
          .map(img => {
            if (typeof img === 'string') return { url: img, file: null, isExisting: true };
            if (img?.url) return { ...img, file: null, isExisting: true };
            return null;
          })
          .filter(Boolean);
        setImages(existingImages);
      } else {
        setImages([]);
      }
    }
  }, [isEdit, postToEdit]);

  const sanitizePostData = useCallback((data) => {
    if (!data) return {};
    
    // ✅ CREAR COPIA SIN CAMPOS OBSOLETOS DE DESTINO
    const cleanData = { ...data };
    delete cleanData.destinacionomra;
    delete cleanData.destinacionvoyageorganise;
    delete cleanData.destinacionlocacionvoyage;
    
    return cleanData;
  }, []);

  const handleChangeInput = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setPostData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  }, []);

  const handleChangeImages = useCallback((e) => {
    const files = [...e.target.files];
    let err = "";
    const newImages = [];

    files.forEach(file => {
      if (!file) err = t('validation_images_required');
      else if (file.size > 5 * 1024 * 1024) err = t('validation_images_size');
      else newImages.push(file);
    });

    if (err) {
      setAlertMessage(err);
      setAlertVariant("danger");
      setShowAlert(true);
      return;
    }

    setImages(prev => [...prev, ...newImages]);
  }, [t]);

  const deleteImages = useCallback((index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!postData.subCategory) {
      showAlertMessage(t('validation_category_required'), "danger");
      return;
    }

    if (!postData.wilaya || !postData.commune) {
      showAlertMessage(t('validation_wilaya_required'), "danger");
      return;
    }

    if (images.length === 0) {
      showAlertMessage(t('validation_images_required'), "danger");
      return;
    }

    try {
      // ✅ LIMPIAR DATOS ANTES DE ENVIAR - ELIMINAR CUALQUIER CAMPO OBSOLETO
      const cleanPostData = { ...postData };
      delete cleanPostData.destinacionomra;
      delete cleanPostData.destinacionvoyageorganise;
      delete cleanPostData.destinacionlocacionvoyage;

      const actionData = {
        postData: cleanPostData,
        images,
        auth,
        ...(isEdit && postToEdit && {
          status: { _id: postToEdit._id, ...postToEdit }
        })
      };

      if (isEdit && postToEdit) {
        await dispatch(updatePost(actionData));
        showAlertMessage(t('success_update'), "success");
      } else {
        await dispatch(createPost(actionData));
        showAlertMessage(t('success_create'), "success");
      }

      setTimeout(() => history.push('/'), 2000);

    } catch (error) {
      showAlertMessage(t('error_publication'), "danger");
    }
  }, [postData, images, auth, isEdit, postToEdit, dispatch, history, t]);

  const showAlertMessage = useCallback((message, variant) => {
    setAlertMessage(message);
    setAlertVariant(variant);
    setShowAlert(true);
  }, []);

  // 🔥 COMPONENTE DE DESTINO UNIFICADO CON TÍTULOS
  const DestinationUnified = useMemo(() => {
    if (!postData.subCategory) return null;

    const destinationProps = {
      postData: {
        ...postData,
        destinacion: postData.destinacion
      },
      handleChangeInput: (e) => {
        if (e.target.name.includes('destinacion')) {
          handleChangeInput({
            target: {
              name: 'destinacion',
              value: e.target.value
            }
          });
        } else {
          handleChangeInput(e);
        }
      }
    };

    // 🔥 TÍTULOS PARA CADA CATEGORÍA
    const getDestinationTitle = () => {
      switch (postData.subCategory) {
        case "Voyage Organise":
          return { 
            title: t('destination_voyage_title', '🌍 Destino del Viaje Organizado'),
            subtitle: t('destination_voyage_subtitle', 'Seleccione el destino principal de su viaje organizado')
          };
        case "Location_Vacances":
          return { 
            title: t('destination_location_title', '🏠 Ubicación de la Propiedad'),
            subtitle: t('destination_location_subtitle', 'Seleccione la ciudad donde se encuentra su propiedad')
          };
        case "hadj_Omra":
          return { 
            title: t('destination_hajj_title', '🕋 Destino de Peregrinación'),
            subtitle: t('destination_hajj_subtitle', 'Seleccione el tipo de peregrinación y destino')
          };
        default:
          return { title: '', subtitle: '' };
      }
    };

    const { title, subtitle } = getDestinationTitle();

    const renderDestinationComponent = () => {
      switch (postData.subCategory) {
        case "Voyage Organise":
          return <DestinationVoyagesOrganises {...destinationProps} />;
        case "Location_Vacances":
          return <DestinationLocationVacances {...destinationProps} />;
        case "hadj_Omra":
          return <DestinationHajjOmra {...destinationProps} />;
        default:
          return null;
      }
    };

    return (
      <Card className="border-0 rounded-0 mb-3">
        <Card.Header className="bg-light border-0 py-3">
          <div className="d-flex align-items-center">
            <div className="flex-grow-1">
              <h5 className="mb-1 fw-bold text-dark fs-6">{title}</h5>
              {subtitle && <p className="mb-0 text-muted small">{subtitle}</p>}
            </div>
          </div>
        </Card.Header>
        <Card.Body className="p-3">
          {renderDestinationComponent()}
        </Card.Body>
      </Card>
    );
  }, [postData.subCategory, postData, handleChangeInput, t]);

  // ✅ COMPONENTE DE SERVICIOS UNIFICADO
  const ServicesUnified = useMemo(() => {
    if (!postData.subCategory) return null;

    const servicesProps = {
      postData,
      handleChangeInput
    };

    switch (postData.subCategory) {
      case "Voyage Organise":
        return <ServicesVoyageOrganise {...servicesProps} />;
      case "Location_Vacances":
        return <ServicesLocationVacances {...servicesProps} />;
      case "hadj_Omra":
        return <ServicesHadjOmra {...servicesProps} />;
      default:
        return null;
    }
  }, [postData.subCategory, postData, handleChangeInput]);

  const renderVoyageOrganise = useMemo(() => (
    <>
      <DateDeparRetour postData={postData} handleChangeInput={handleChangeInput} />
      <HoraDepart postData={postData} handleChangeInput={handleChangeInput} />
      <DurationDisplay postData={postData} handleChangeInput={handleChangeInput} />
      {DestinationUnified}
      <NombreLugarVoyagesOrganises postData={postData} handleChangeInput={handleChangeInput} />
      {ServicesUnified}
      <TarifasYprecios postData={postData} handleChangeInput={handleChangeInput} category="voyagesorganises" />
    </>
  ), [postData, handleChangeInput, DestinationUnified, ServicesUnified]);

  const renderLocationVacances = useMemo(() => (
    <>
      <DateDeparRetour postData={postData} handleChangeInput={handleChangeInput} />
      <HoraDepart postData={postData} handleChangeInput={handleChangeInput} />
      <DurationDisplay postData={postData} handleChangeInput={handleChangeInput} />
      {DestinationUnified}
      <AlojamientoLocationVacances postData={postData} handleChangeInput={handleChangeInput} />
      {ServicesUnified}
      <TarifasYprecios postData={postData} handleChangeInput={handleChangeInput} category="locationvacances" />
    </>
  ), [postData, handleChangeInput, DestinationUnified, ServicesUnified]);

  const renderHadjOmra = useMemo(() => (
    <>
      <DateDeparRetour postData={postData} handleChangeInput={handleChangeInput} />
      <HoraDepart postData={postData} handleChangeInput={handleChangeInput} />
      <DurationDisplay postData={postData} handleChangeInput={handleChangeInput} />
      {DestinationUnified}
      <TransportHajjOmra postData={postData} handleChangeInput={handleChangeInput} />
      <AlojamientoHajjOmra postData={postData} handleChangeInput={handleChangeInput} />
      {ServicesUnified}
      <TarifasYpreciosomra postData={postData} handleChangeInput={handleChangeInput} />
    </>
  ), [postData, handleChangeInput, DestinationUnified, ServicesUnified]);

  const renderCategoryFields = useMemo(() => {
    switch (postData.subCategory) {
      case "Voyage Organise": return renderVoyageOrganise;
      case "Location_Vacances": return renderLocationVacances;
      case "hadj_Omra": return renderHadjOmra;
      default: return null;
    }
  }, [postData.subCategory, renderVoyageOrganise, renderLocationVacances, renderHadjOmra]);

  return (
    <Container fluid className="p-2" dir={isRTL ? "rtl" : "ltr"}>
      <Row className="g-0">
        <Col xs={12}>
          <Card className="border-0 rounded-0">
            <Card.Header className={`${isEdit ? "bg-warning text-dark" : "my-2 text-white"} ps-3`}>
              <Row className="align-items-center g-0">
                <Col>
                  <h2 className="mb-1 fs-6">
                    {isEdit ? t('edit_title', 'Modifier la Publication') : t('create_title', 'Créer une Nouvelle Publication')}
                  </h2>
                  {isEdit && postToEdit?.title && (
                    <p className="mb-0 opacity-75 small">
                      {t('modification', 'Modification de')}: "{postToEdit.title}"
                    </p>
                  )}
                </Col>
              </Row>
            </Card.Header>
          </Card>

          {showAlert && (
            <Alert variant={alertVariant} dismissible onClose={() => setShowAlert(false)} className="mb-0 rounded-0 border-0">
              <Alert.Heading className="fs-6">
                {alertVariant === "success" ? "✅ Success" : "⚠️ Error"}
              </Alert.Heading>
              {alertMessage}
            </Alert>
          )}

          <Card className="shadow-none border-0 rounded-0">
            <Card.Body className="p-0">
              <Form onSubmit={handleSubmit} className="p-0">
                <div className="px-2">
                  <CategorySelector postData={postData} handleChangeInput={handleChangeInput} />
                </div>

                {postData.subCategory && (
                  <>
                    <div className="px-2">
                      <DescriptionTextarea postData={postData} handleChangeInput={handleChangeInput} />
                      <AddressInput
                        postData={postData}
                        handleChangeInput={handleChangeInput}
                      />
                    </div>

                    {renderCategoryFields}

                    <div className="px-2">
                      <ContactReservation postData={postData} handleChangeInput={handleChangeInput} />
                    </div>

                    <div className="px-2">
                      <ImageUpload
                        images={images}
                        handleChangeImages={handleChangeImages}
                        deleteImages={deleteImages}
                        theme={theme}
                      />
                    </div>

                    <div className="px-2">
                      <Row className={`g-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Col xs={8}>
                          <div className="d-grid gap-1">
                            <Button
                              variant={isEdit ? "warning" : "success"}
                              type="submit"
                              size="lg"
                              className="fw-bold py-2"
                            >
                              <FaSave className="me-2" />
                              {isEdit ? t('button_update', 'Mettre à jour') : t('button_publish', 'Publier')}
                            </Button>
                          </div>
                        </Col>
                        <Col xs={4}>
                          <Button
                            variant="outline-secondary"
                            size="lg"
                            className="w-100 py-2"
                            onClick={() => history.goBack()}
                          >
                            <FaTimes className="me-2" />
                            {t('common.cancel', 'Annuler')}
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </>
                )}

                {!postData.subCategory && (
                  <Card className="text-center border-0 bg-light">
                    <Card.Body className="py-4">
                      <div className="fs-1 mb-2">🏁</div>
                      <h5 className="text-muted fs-6">
                        {t('select_category_first')}
                      </h5>
                    </Card.Body>
                  </Card>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default React.memo(Createpost);