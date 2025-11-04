import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FaComments, FaHotel, FaPlane, FaBus, FaHome, FaMapMarkerAlt, FaConciergeBell, FaMoneyBillWave, FaCalendarAlt, FaUsers, FaStar } from 'react-icons/fa';

const DescriptionPost = ({ post, readMore, setReadMore }) => {
    const { t, i18n } = useTranslation(["descripcion", "categories", "createpost"]);
    const isRTL = i18n.language === 'ar' || i18n.language === 'ara';

    // Color azul claro para valores destacados
    const valueColor = "#1e88e5";
    const accentColor = "#1565c0";

    // Servicios conocidos para traducción
    const knownServices = ['visa_hajj_omra', 'hebergement_haram', 'guide_religieux', 'transport_complet', 'assistance_medicale', 'zamzam_kit'];

    // Función para traducir servicios
    const translateService = (service) => {
        if (knownServices.includes(service)) {
            return t(service, { ns: "categories" });
        }
        return service;
    };

    // Función para formatear fechas
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        
        if (isRTL) {
            // Formato árabe
            return date.toLocaleDateString('ar-EG', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        } else {
            // Formato francés
            return date.toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        }
    };

    // Determinar la categoría del post con traducción
    const getCategoryInfo = () => {
        const travelType = t(`travelTypes.${post.subCategory}`, { ns: "descripcion" });
        
        switch (post.subCategory) {
            case "hadj_Omra":
                return {
                    icon: "🕋",
                    type: travelType,
                    color: "#8B4513",
                    gradient: "linear-gradient(135deg, #8B4513 0%, #D2691E 100%)"
                };
            case "Voyage Organise":
                return {
                    icon: "✈️",
                    type: travelType,
                    color: "#3498db",
                    gradient: "linear-gradient(135deg, #3498db 0%, #1abc9c 100%)"
                };
            case "Location_Vacances":
                return {
                    icon: "🏠",
                    type: travelType,
                    color: "#e74c3c",
                    gradient: "linear-gradient(135deg, #e74c3c 0%, #e67e22 100%)"
                };
            default:
                return {
                    icon: "🌟",
                    type: t('labels.exceptionalOffer', { ns: "descripcion" }),
                    color: "#9b59b6",
                    gradient: "linear-gradient(135deg, #9b59b6 0%, #3498db 100%)"
                };
        }
    };

    const categoryInfo = getCategoryInfo();

    // Componente para valores destacados en azul
    const Highlight = ({ children }) => (
        <span style={{ 
            color: valueColor, 
            fontWeight: '700',
            backgroundColor: '#e3f2fd',
            padding: '3px 8px',
            borderRadius: '6px',
            margin: '0 3px',
            fontSize: '1rem'
        }}>
            {children}
        </span>
    );

    // Función compacta para generar la historia del viaje
    const generateTravelStory = () => {
        const sections = [];

        // 🔹 SECCIÓN 1: Información Principal
        let mainInfo = t('sections.main', { 
            ns: "descripcion", 
            type: categoryInfo.type 
        });

        // Destino
        if (post.subCategory === "hadj_Omra" && post.destinacionvoyage) {
            mainInfo += ` ${t('labels.towards', { ns: "descripcion" })} ${post.destinacionvoyage} `;
        } else if (post.subCategory === "Voyage Organise" && post.destinacionvoyage) {
            mainInfo += ` ${t('labels.discovering', { ns: "descripcion" })} ${post.destinacionvoyage} `;
        } else if (post.subCategory === "Location_Vacances" && post.ciudad) {
            mainInfo += ` ${t('labels.in', { ns: "descripcion" })} ${post.ciudad} `;
        }

        // Fechas
        if (post.datedepar) {
            mainInfo += ` ${t('labels.from', { ns: "descripcion" })} ${formatDate(post.datedepar)}`;
            if (post.horadudepar) {
                mainInfo += ` (${t('labels.departureAt', { ns: "descripcion" })} ${post.horadudepar})`;
            }
        }

        sections.push({ type: 'main', content: mainInfo });

        // 🔹 SECCIÓN 2: Características Específicas
        let features = [];

        // HAJJ & OMRA
        if (post.subCategory === "hadj_Omra") {
            if (post.categoriaHotelMeca) features.push(`${t('specificFields.categoriaHotelMeca', { ns: "descripcion" })} ${post.categoriaHotelMeca}`);
            if (post.hotelMeca) features.push(`${t('specificFields.hotelMeca', { ns: "descripcion" })} ${post.hotelMeca}`);
            if (post.hotelMedina) features.push(`${t('specificFields.hotelMedina', { ns: "descripcion" })} ${post.hotelMedina}`);
            if (post.typeTransport) features.push(`${t('specificFields.typeTransport', { ns: "descripcion" })} ${post.typeTransport}`);
            if (post.compagnieAerienne) features.push(`${t('specificFields.compagnieAerienne', { ns: "descripcion" })} ${post.compagnieAerienne}`);
        }
        // VOYAGE ORGANISE
        else if (post.subCategory === "Voyage Organise") {
            if (post.categoriaAlojamiento) features.push(`${t('specificFields.categoriaAlojamiento', { ns: "descripcion" })} ${post.categoriaAlojamiento}`);
            if (post.tipoHabitacion) features.push(`${t('specificFields.tipoHabitacion', { ns: "descripcion" })} ${post.tipoHabitacion}`);
            if (post.regimenComidas) features.push(`${t('specificFields.regimenComidas', { ns: "descripcion" })} ${post.regimenComidas}`);
            if (post.modeTransport) features.push(`${t('specificFields.modeTransport', { ns: "descripcion" })} ${post.modeTransport}`);
            if (post.nombreHotel) features.push(`${t('specificFields.nombreHotel', { ns: "descripcion" })} ${post.nombreHotel}`);
            if (post.classeTransport) features.push(`${t('specificFields.classeTransport', { ns: "descripcion" })} ${post.classeTransport}`);
        }
        // LOCATION VACANCES
        else if (post.subCategory === "Location_Vacances") {
            if (post.tipoPropiedad) features.push(`${t('specificFields.tipoPropiedad', { ns: "descripcion" })} ${post.tipoPropiedad}`);
            if (post.capacidad) features.push(`${t('specificFields.capacidad', { ns: "descripcion" })} ${post.capacidad}`);
            if (post.habitaciones) features.push(`${t('specificFields.habitaciones', { ns: "descripcion" })} ${post.habitaciones}`);
            if (post.superficie) features.push(`${t('specificFields.superficie', { ns: "descripcion" })} ${post.superficie}`);
            if (post.nombrePropiedad) features.push(`${t('specificFields.nombrePropiedad', { ns: "descripcion" })} "${post.nombrePropiedad}"`);
        }

        if (features.length > 0) {
            sections.push({ 
                type: 'features', 
                content: `${t('labels.including', { ns: "descripcion" })} : ${features.join(' • ')}` 
            });
        }

        // 🔹 SECCIÓN 3: Duración
        if (post.dureeSejour) {
            sections.push({ 
                type: 'duration', 
                content: `${t('labels.durationStay', { ns: "descripcion" })} : ${post.dureeSejour}` 
            });
        }

        // 🔹 SECCIÓN 4: Servicios Incluidos
        if (post.servicios && post.servicios.length > 0) {
            const translatedServices = post.servicios.map(service => translateService(service));
            const limitedServices = translatedServices.slice(0, 5);
            sections.push({ 
                type: 'services', 
                content: `${t('labels.servicesIncluded', { ns: "descripcion" })} : ${limitedServices.join(', ')}${post.servicios.length > 5 ? '...' : ''}` 
            });
        }

        // 🔹 SECCIÓN 5: Precios
        let pricing = '';
        if (post.subCategory === "hadj_Omra" && post.precioBase) {
            pricing = `${t('labels.from', { ns: "descripcion" })} ${post.precioBase} DA`;
            if (post.tipoPrecio) {
                pricing += ` (${post.tipoPrecio})`;
            }
        } else if (post.price) {
            pricing = `${t('labels.from', { ns: "descripcion" })} ${post.price} DA ${t('labels.perPerson', { ns: "descripcion" })}`;
        } else if (post.prixAdulte) {
            pricing = `${t('labels.adult', { ns: "descripcion" })}: ${post.prixAdulte} DA`;
            if (post.prixEnfant) pricing += ` • ${t('labels.child', { ns: "descripcion" })}: ${post.prixEnfant} DA`;
            if (post.prixBebe) pricing += ` • ${t('labels.baby', { ns: "descripcion" })}: ${post.prixBebe} DA`;
        }

        if (pricing) {
            sections.push({ type: 'pricing', content: pricing });
        }

        // 🔹 SECCIÓN 6: Contacto
        if (post.contacto) {
            sections.push({ 
                type: 'contact', 
                content: `${t('labels.reservation', { ns: "descripcion" })} : ${post.contacto}` 
            });
        }

        return sections;
    };

    const travelSections = generateTravelStory();

    // Función para renderizar cada sección con su estilo correspondiente
    const renderSection = (section, index) => {
        const baseStyle = {
            lineHeight: '1.6',
            fontSize: '1.05rem',
            marginBottom: '0.75rem',
            padding: '0.75rem 0',
            borderBottom: index < travelSections.length - 1 ? '1px solid #f0f0f0' : 'none',
            textAlign: isRTL ? 'right' : 'left',
            direction: isRTL ? 'rtl' : 'ltr'
        };

        switch (section.type) {
            case 'main':
                return (
                    <div key={index} style={baseStyle}>
                        <div style={{ 
                            fontSize: '1.25rem',
                            fontWeight: '700',
                            color: accentColor,
                            marginBottom: '0.5rem'
                        }}>
                            {section.content}
                        </div>
                    </div>
                );

            case 'features':
                return (
                    <div key={index} style={baseStyle}>
                        <FaStar size={16} style={{
                            color: valueColor, 
                            marginRight: isRTL ? '0' : '10px',
                            marginLeft: isRTL ? '10px' : '0'
                        }} />
                        <span style={{ color: '#555', fontSize: '1rem' }}>{section.content}</span>
                    </div>
                );

            case 'duration':
                return (
                    <div key={index} style={baseStyle}>
                        <FaCalendarAlt size={16} style={{
                            color: valueColor, 
                            marginRight: isRTL ? '0' : '10px',
                            marginLeft: isRTL ? '10px' : '0'
                        }} />
                        <Highlight>{section.content.split(': ')[1]}</Highlight>
                    </div>
                );

            case 'services':
                return (
                    <div key={index} style={baseStyle}>
                        <FaConciergeBell size={16} style={{
                            color: valueColor, 
                            marginRight: isRTL ? '0' : '10px',
                            marginLeft: isRTL ? '10px' : '0'
                        }} />
                        <span style={{ color: '#555', fontSize: '1rem' }}>{section.content}</span>
                    </div>
                );

            case 'pricing':
                return (
                    <div key={index} style={baseStyle}>
                        <FaMoneyBillWave size={16} style={{
                            color: valueColor, 
                            marginRight: isRTL ? '0' : '10px',
                            marginLeft: isRTL ? '10px' : '0'
                        }} />
                        <Highlight>{section.content}</Highlight>
                    </div>
                );

            case 'contact':
                return (
                    <div key={index} style={{...baseStyle, borderBottom: 'none'}}>
                        <FaUsers size={16} style={{
                            color: valueColor, 
                            marginRight: isRTL ? '0' : '10px',
                            marginLeft: isRTL ? '10px' : '0'
                        }} />
                        <span style={{ 
                            color: '#2e7d32', 
                            fontWeight: '700',
                            backgroundColor: '#e8f5e9',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '1.05rem'
                        }}>
                            {section.content}
                        </span>
                    </div>
                );

            default:
                return (
                    <div key={index} style={baseStyle}>
                        {section.content}
                    </div>
                );
        }
    };

    // Badges para información específica
    const renderQuickInfoBadges = () => {
        const badges = [];

        // Información común
        if (post.wilaya && post.commune) {
            badges.push(
                <Badge key="location" bg="light" text="dark" className="me-1 mb-1" style={{ fontSize: '0.9rem' }}>
                    <FaMapMarkerAlt className={isRTL ? "ms-1" : "me-1"} style={{ color: valueColor }} />
                    {post.commune}, {post.wilaya}
                </Badge>
            );
        }

        if (post.datedepar) {
            badges.push(
                <Badge key="date" bg="light" text="dark" className="me-1 mb-1" style={{ fontSize: '0.9rem' }}>
                    <FaCalendarAlt className={isRTL ? "ms-1" : "me-1"} style={{ color: valueColor }} />
                    {formatDate(post.datedepar)}
                </Badge>
            );
        }

        // Información específica por categoría
        if (post.subCategory === "hadj_Omra") {
            if (post.categoriaHotelMeca) {
                badges.push(
                    <Badge key="hotel-meca" bg="light" text="dark" className="me-1 mb-1" style={{ fontSize: '0.9rem' }}>
                        <FaHotel className={isRTL ? "ms-1" : "me-1"} style={{ color: valueColor }} />
                        {t('specificFields.categoriaHotelMeca', { ns: "descripcion" })}: {post.categoriaHotelMeca}
                    </Badge>
                );
            }
            if (post.typeTransport) {
                badges.push(
                    <Badge key="transport" bg="light" text="dark" className="me-1 mb-1" style={{ fontSize: '0.9rem' }}>
                        <FaBus className={isRTL ? "ms-1" : "me-1"} style={{ color: valueColor }} />
                        {post.typeTransport}
                    </Badge>
                );
            }
        }

        if (post.subCategory === "Voyage Organise") {
            if (post.categoriaAlojamiento) {
                badges.push(
                    <Badge key="category" bg="light" text="dark" className="me-1 mb-1" style={{ fontSize: '0.9rem' }}>
                        <FaStar className={isRTL ? "ms-1" : "me-1"} style={{ color: valueColor }} />
                        {post.categoriaAlojamiento}
                    </Badge>
                );
            }
            if (post.modeTransport) {
                badges.push(
                    <Badge key="transport-mode" bg="light" text="dark" className="me-1 mb-1" style={{ fontSize: '0.9rem' }}>
                        <FaPlane className={isRTL ? "ms-1" : "me-1"} style={{ color: valueColor }} />
                        {post.modeTransport}
                    </Badge>
                );
            }
        }

        if (post.subCategory === "Location_Vacances") {
            if (post.tipoPropiedad) {
                badges.push(
                    <Badge key="property" bg="light" text="dark" className="me-1 mb-1" style={{ fontSize: '0.9rem' }}>
                        <FaHome className={isRTL ? "ms-1" : "me-1"} style={{ color: valueColor }} />
                        {post.tipoPropiedad}
                    </Badge>
                );
            }
            if (post.capacidad) {
                badges.push(
                    <Badge key="capacity" bg="light" text="dark" className="me-1 mb-1" style={{ fontSize: '0.9rem' }}>
                        <FaUsers className={isRTL ? "ms-1" : "me-1"} style={{ color: valueColor }} />
                        {post.capacidad} {t('labels.persons', { ns: "descripcion" })}
                    </Badge>
                );
            }
        }

        return badges;
    };

    return (
        <Card className="mb-3 border-0 shadow-sm" style={{ 
            borderRadius: '12px', 
            overflow: 'hidden',
            direction: isRTL ? 'rtl' : 'ltr'
        }}>
            {/* Header Mejorado */}
            <Card.Header 
                className="border-0 text-white d-flex align-items-center justify-content-between"
                style={{ 
                    background: categoryInfo.gradient,
                    padding: '1rem 1.25rem'
                }}
            >
                <div className="d-flex align-items-center">
                    <div style={{
                        background: 'rgba(255,255,255,0.2)',
                        borderRadius: '10px',
                        padding: '10px',
                        marginRight: isRTL ? '0' : '15px',
                        marginLeft: isRTL ? '15px' : '0'
                    }}>
                        <span style={{ fontSize: '1.4rem' }}>{categoryInfo.icon}</span>
                    </div>
                    <div>
                        <h6 className="mb-0 fw-bold" style={{ fontSize: '1.1rem' }}>
                            {categoryInfo.type.toUpperCase()}
                        </h6>
                        <small style={{ opacity: 0.9, fontSize: '0.9rem' }}>
                            {t('labels.exclusiveOffer', { ns: "descripcion" })} • {t('labels.publishedOn', { ns: "descripcion" })} {formatDate(post.createdAt)}
                        </small>
                    </div>
                </div>
                {post.views > 0 && (
                    <Badge bg="light" text="dark" style={{ fontSize: '0.85rem' }}>
                        👁️ {post.views} {t('labels.views', { ns: "descripcion" })}
                    </Badge>
                )}
            </Card.Header>

            <Card.Body className="p-0">
                {/* Badges de Información Rápida */}
                <div className="p-3 pb-2" style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <div className="d-flex flex-wrap">
                        {renderQuickInfoBadges()}
                    </div>
                </div>

                {/* Contenido Principal Compacto */}
                <div className="p-3">
                    {travelSections.map((section, index) => renderSection(section, index))}
                </div>

                {/* Descripción Extendida (si existe y es larga) */}
                {post.description && post.description.length > 200 && (
                    <div className="p-3" style={{ 
                        backgroundColor: '#fafafa', 
                        borderTop: '1px solid #f0f0f0',
                        borderBottom: '1px solid #f0f0f0'
                    }}>
                        {readMore ? (
                            <>
                                <div className="d-flex align-items-center mb-2">
                                    <FaComments size={18} style={{
                                        color: valueColor, 
                                        marginRight: isRTL ? '0' : '10px',
                                        marginLeft: isRTL ? '10px' : '0'
                                    }} />
                                    <small className="fw-bold" style={{ color: accentColor, fontSize: '1rem' }}>
                                        {t('labels.detailedDescription', { ns: "descripcion" })}
                                    </small>
                                </div>
                                <p style={{ 
                                    fontSize: '1rem',
                                    lineHeight: '1.6',
                                    color: '#555',
                                    marginBottom: '0.75rem',
                                    textAlign: isRTL ? 'right' : 'left'
                                }}>
                                    {post.description}
                                </p>
                                <Button 
                                    variant="outline-primary" 
                                    size="sm"
                                    onClick={() => setReadMore(false)}
                                    style={{ fontSize: '0.9rem', padding: '0.4rem 1rem' }}
                                >
                                    {t('labels.readLess', { ns: "descripcion" })}
                                </Button>
                            </>
                        ) : (
                            <div 
                                className="d-flex align-items-center cursor-pointer"
                                onClick={() => setReadMore(true)}
                                style={{ color: valueColor }}
                            >
                                <FaComments size={16} className={isRTL ? "ms-2" : "me-2"} />
                                <small className="fw-bold" style={{ fontSize: '0.95rem' }}>
                                    {t('labels.readMore', { ns: "descripcion" })}
                                </small>
                            </div>
                        )}
                    </div>
                )}

                {/* Servicios Adicionales en formato compacto */}
                {(post.servicios && post.servicios.length > 0) && (
                    <div className="p-3">
                        <div className="d-flex align-items-center mb-2">
                            <FaConciergeBell size={16} style={{
                                color: valueColor, 
                                marginRight: isRTL ? '0' : '10px',
                                marginLeft: isRTL ? '10px' : '0'
                            }} />
                            <small className="fw-bold" style={{ color: accentColor, fontSize: '1rem' }}>
                                {t('labels.servicesEquipment', { ns: "descripcion" })}
                            </small>
                        </div>
                        <div className="d-flex flex-wrap gap-1">
                            {post.servicios.slice(0, 8).map((service, index) => (
                                <Badge 
                                    key={index}
                                    bg="light" 
                                    text="dark"
                                    style={{ 
                                        fontSize: '0.85rem',
                                        border: `1px solid ${valueColor}20`,
                                        backgroundColor: `${valueColor}08`
                                    }}
                                >
                                    {translateService(service)}
                                </Badge>
                            ))}
                            {post.servicios.length > 8 && (
                                <Badge 
                                    bg="light" 
                                    text="dark"
                                    style={{ fontSize: '0.85rem' }}
                                >
                                    +{post.servicios.length - 8} {t('labels.otherServices', { ns: "descripcion" })}
                                </Badge>
                            )}
                        </div>
                    </div>
                )}

                {/* Footer con CTA */}
                <div className="p-3 text-center" style={{ 
                    backgroundColor: '#f8f9fa',
                    borderTop: '1px solid #f0f0f0'
                }}>
                    <small className="text-muted d-block mb-2" style={{ fontSize: '0.95rem' }}>
                        {t('labels.uniqueExperience', { ns: "descripcion" })}
                    </small>
                    {post.contacto && (
                        <div style={{ 
                            color: valueColor, 
                            fontWeight: '700',
                            fontSize: '1.05rem'
                        }}>
                            📞 {post.contacto}
                        </div>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
};

export default DescriptionPost;