import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FaInfoCircle, FaComments, FaHeart, FaHotel, FaPlane, FaBus, FaHome, FaMapMarkerAlt, FaConciergeBell, FaMoneyBillWave, FaCalendarAlt, FaUsers, FaStar } from 'react-icons/fa';

const DescriptionPost = ({ post, readMore, setReadMore }) => {
    const { t, i18n } = useTranslation('descripcion');
    const isRTL = i18n.language === 'ar';

    // Color azul claro para valores destacados
    const valueColor = "#1e88e5";
    const accentColor = "#1565c0";

    // Función para formatear fechas
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    // Determinar la categoría del post
    const getCategoryInfo = () => {
        switch (post.subCategory) {
            case "hadj_Omra":
                return {
                    icon: "🕋",
                    type: "pèlerinage Hajj & Omra",
                    color: "#8B4513",
                    gradient: "linear-gradient(135deg, #8B4513 0%, #D2691E 100%)"
                };
            case "Voyage Organise":
                return {
                    icon: "✈️",
                    type: "voyage organisé",
                    color: "#3498db",
                    gradient: "linear-gradient(135deg, #3498db 0%, #1abc9c 100%)"
                };
            case "Location_Vacances":
                return {
                    icon: "🏠",
                    type: "location de vacances",
                    color: "#e74c3c",
                    gradient: "linear-gradient(135deg, #e74c3c 0%, #e67e22 100%)"
                };
            default:
                return {
                    icon: "🌟",
                    type: "voyage",
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
            fontWeight: '600',
            backgroundColor: '#e3f2fd',
            padding: '2px 6px',
            borderRadius: '4px',
            margin: '0 2px'
        }}>
            {children}
        </span>
    );

    // Función compacta para generar la historia del viaje
    const generateTravelStory = () => {
        const sections = [];

        // 🔹 SECCIÓN 1: Información Principal
        let mainInfo = `Notre agence vous propose un ${categoryInfo.type} exceptionnel `;

        // Destino
        if (post.subCategory === "hadj_Omra" && post.destinacionhadj) {
            mainInfo += `vers ${post.destinacionhadj} `;
        } else if (post.subCategory === "Voyage Organise" && post.destinacionvoyage) {
            mainInfo += `découvrant ${post.destinacionvoyage} `;
        } else if (post.subCategory === "Location_Vacances" && post.ciudad) {
            mainInfo += `à ${post.ciudad} `;
        }

        // Fechas
        if (post.datedepar) {
            mainInfo += `à partir du ${formatDate(post.datedepar)}`;
            if (post.horadudepar) {
                mainInfo += ` (départ à ${post.horadudepar})`;
            }
        }

        sections.push({ type: 'main', content: mainInfo });

        // 🔹 SECCIÓN 2: Características Específicas
        let features = [];

        // HAJJ & OMRA
        if (post.subCategory === "hadj_Omra") {
            if (post.categoriaHotelMeca) features.push(`Hôtel ${post.categoriaHotelMeca} à La Mecque`);
            if (post.hotelMedina) features.push(`Hôtel ${post.hotelMedina} à Médine`);
            if (post.typeTransport) features.push(`Transport en ${post.typeTransport}`);
            if (post.compagnieAerienne) features.push(`Vols ${post.compagnieAerienne}`);
        }
        // VOYAGE ORGANISE
        else if (post.subCategory === "Voyage Organise") {
            if (post.categoriaAlojamiento) features.push(`Hébergement ${post.categoriaAlojamiento}`);
            if (post.tipoHabitacion) features.push(`Chambres ${post.tipoHabitacion}`);
            if (post.regimenComidas) features.push(`Régime ${post.regimenComidas}`);
            if (post.modeTransport) features.push(`Transport ${post.modeTransport}`);
            if (post.nombreHotel) features.push(`Hôtel ${post.nombreHotel}`);
        }
        // LOCATION VACANCES
        else if (post.subCategory === "Location_Vacances") {
            if (post.tipoPropiedad) features.push(post.tipoPropiedad);
            if (post.capacidad) features.push(`Capacité ${post.capacidad}`);
            if (post.habitaciones) features.push(`${post.habitaciones} chambres`);
            if (post.superficie) features.push(`${post.superficie} m²`);
            if (post.nombrePropiedad) features.push(`"${post.nombrePropiedad}"`);
        }

        if (features.length > 0) {
            sections.push({ 
                type: 'features', 
                content: `Comprenant : ${features.join(' • ')}` 
            });
        }

        // 🔹 SECCIÓN 3: Duración
        if (post.dureeSejour || post.duracionviaje) {
            const duration = post.dureeSejour || post.duracionviaje;
            sections.push({ 
                type: 'duration', 
                content: `Durée du séjour : ${duration}` 
            });
        }

        // 🔹 SECCIÓN 4: Servicios Incluidos
        if (post.servicios && post.servicios.length > 0) {
            const limitedServices = post.servicios.slice(0, 5);
            sections.push({ 
                type: 'services', 
                content: `Services inclus : ${limitedServices.join(', ')}${post.servicios.length > 5 ? '...' : ''}` 
            });
        }

        // 🔹 SECCIÓN 5: Precios
        let pricing = '';
        if (post.subCategory === "hadj_Omra" && post.precioBase) {
            pricing = `Tarif à partir de ${post.precioBase} DA`;
            if (post.tipoPrecio) {
                pricing += ` (${post.tipoPrecio})`;
            }
        } else if (post.price) {
            pricing = `À partir de ${post.price} DA par personne`;
        } else if (post.prixAdulte) {
            pricing = `Adulte: ${post.prixAdulte} DA`;
            if (post.prixEnfant) pricing += ` • Enfant: ${post.prixEnfant} DA`;
            if (post.prixBebe) pricing += ` • Bébé: ${post.prixBebe} DA`;
        }

        if (pricing) {
            sections.push({ type: 'pricing', content: pricing });
        }

        // 🔹 SECCIÓN 6: Contacto
        if (post.contacto) {
            sections.push({ 
                type: 'contact', 
                content: `Réservation : ${post.contacto}` 
            });
        }

        return sections;
    };

    const travelSections = generateTravelStory();

    // Función para renderizar cada sección con su estilo correspondiente
    const renderSection = (section, index) => {
        const baseStyle = {
            lineHeight: '1.5',
            fontSize: '0.95rem',
            marginBottom: '0.5rem',
            padding: '0.5rem 0',
            borderBottom: index < travelSections.length - 1 ? '1px solid #f0f0f0' : 'none'
        };

        switch (section.type) {
            case 'main':
                return (
                    <div key={index} style={baseStyle}>
                        <div style={{ 
                            fontSize: '1.1rem', 
                            fontWeight: '600', 
                            color: accentColor,
                            marginBottom: '0.25rem'
                        }}>
                            {section.content}
                        </div>
                    </div>
                );

            case 'features':
                return (
                    <div key={index} style={baseStyle}>
                        <FaStar size={14} style={{ color: valueColor, marginRight: '8px' }} />
                        <span style={{ color: '#555' }}>{section.content}</span>
                    </div>
                );

            case 'duration':
                return (
                    <div key={index} style={baseStyle}>
                        <FaCalendarAlt size={14} style={{ color: valueColor, marginRight: '8px' }} />
                        <Highlight>{section.content.split(': ')[1]}</Highlight>
                    </div>
                );

            case 'services':
                return (
                    <div key={index} style={baseStyle}>
                        <FaConciergeBell size={14} style={{ color: valueColor, marginRight: '8px' }} />
                        <span style={{ color: '#555' }}>{section.content}</span>
                    </div>
                );

            case 'pricing':
                return (
                    <div key={index} style={baseStyle}>
                        <FaMoneyBillWave size={14} style={{ color: valueColor, marginRight: '8px' }} />
                        <Highlight>{section.content}</Highlight>
                    </div>
                );

            case 'contact':
                return (
                    <div key={index} style={{...baseStyle, borderBottom: 'none'}}>
                        <FaUsers size={14} style={{ color: valueColor, marginRight: '8px' }} />
                        <span style={{ 
                            color: '#2e7d32', 
                            fontWeight: '600',
                            backgroundColor: '#e8f5e9',
                            padding: '4px 8px',
                            borderRadius: '4px'
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
                <Badge key="location" bg="light" text="dark" className="me-1 mb-1">
                    <FaMapMarkerAlt className="me-1" style={{ color: valueColor }} />
                    {post.commune}, {post.wilaya}
                </Badge>
            );
        }

        if (post.datedepar) {
            badges.push(
                <Badge key="date" bg="light" text="dark" className="me-1 mb-1">
                    <FaCalendarAlt className="me-1" style={{ color: valueColor }} />
                    {formatDate(post.datedepar)}
                </Badge>
            );
        }

        // Información específica por categoría
        if (post.subCategory === "hadj_Omra") {
            if (post.categoriaHotelMeca) {
                badges.push(
                    <Badge key="hotel-meca" bg="light" text="dark" className="me-1 mb-1">
                        <FaHotel className="me-1" style={{ color: valueColor }} />
                        Meca: {post.categoriaHotelMeca}
                    </Badge>
                );
            }
            if (post.typeTransport) {
                badges.push(
                    <Badge key="transport" bg="light" text="dark" className="me-1 mb-1">
                        <FaBus className="me-1" style={{ color: valueColor }} />
                        {post.typeTransport}
                    </Badge>
                );
            }
        }

        if (post.subCategory === "Voyage Organise") {
            if (post.categoriaAlojamiento) {
                badges.push(
                    <Badge key="category" bg="light" text="dark" className="me-1 mb-1">
                        <FaStar className="me-1" style={{ color: valueColor }} />
                        {post.categoriaAlojamiento}
                    </Badge>
                );
            }
        }

        if (post.subCategory === "Location_Vacances") {
            if (post.tipoPropiedad) {
                badges.push(
                    <Badge key="property" bg="light" text="dark" className="me-1 mb-1">
                        <FaHome className="me-1" style={{ color: valueColor }} />
                        {post.tipoPropiedad}
                    </Badge>
                );
            }
        }

        return badges;
    };

    return (
        <Card className="mb-3 border-0 shadow-sm" style={{ borderRadius: '12px', overflow: 'hidden' }}>
            {/* Header Mejorado */}
            <Card.Header 
                className="border-0 text-white d-flex align-items-center justify-content-between"
                style={{ 
                    background: categoryInfo.gradient,
                    padding: '0.75rem 1rem'
                }}
            >
                <div className="d-flex align-items-center">
                    <div style={{
                        background: 'rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        padding: '8px',
                        marginRight: '12px'
                    }}>
                        <span style={{ fontSize: '1.2rem' }}>{categoryInfo.icon}</span>
                    </div>
                    <div>
                        <h6 className="mb-0 fw-bold" style={{ fontSize: '0.95rem' }}>
                            {categoryInfo.type.toUpperCase()}
                        </h6>
                        <small style={{ opacity: 0.9, fontSize: '0.8rem' }}>
                            Offre exclusive • Publié le {formatDate(post.createdAt)}
                        </small>
                    </div>
                </div>
                {post.views > 0 && (
                    <Badge bg="light" text="dark" style={{ fontSize: '0.75rem' }}>
                        👁️ {post.views} vues
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
                                    <FaComments size={16} style={{ color: valueColor, marginRight: '8px' }} />
                                    <small className="fw-bold" style={{ color: accentColor }}>
                                        Description détaillée
                                    </small>
                                </div>
                                <p style={{ 
                                    fontSize: '0.9rem', 
                                    lineHeight: '1.5',
                                    color: '#555',
                                    marginBottom: '0.5rem'
                                }}>
                                    {post.description}
                                </p>
                                <Button 
                                    variant="outline-primary" 
                                    size="sm"
                                    onClick={() => setReadMore(false)}
                                    style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem' }}
                                >
                                    Réduire
                                </Button>
                            </>
                        ) : (
                            <div 
                                className="d-flex align-items-center cursor-pointer"
                                onClick={() => setReadMore(true)}
                                style={{ color: valueColor }}
                            >
                                <FaComments size={14} className="me-2" />
                                <small className="fw-bold">
                                    Lire la description complète...
                                </small>
                            </div>
                        )}
                    </div>
                )}

                {/* Servicios Adicionales en formato compacto */}
                {(post.servicios && post.servicios.length > 0) && (
                    <div className="p-3">
                        <div className="d-flex align-items-center mb-2">
                            <FaConciergeBell size={14} style={{ color: valueColor, marginRight: '8px' }} />
                            <small className="fw-bold" style={{ color: accentColor }}>
                                Services & Équipements
                            </small>
                        </div>
                        <div className="d-flex flex-wrap gap-1">
                            {post.servicios.slice(0, 8).map((service, index) => (
                                <Badge 
                                    key={index}
                                    bg="light" 
                                    text="dark"
                                    style={{ 
                                        fontSize: '0.75rem',
                                        border: `1px solid ${valueColor}20`,
                                        backgroundColor: `${valueColor}08`
                                    }}
                                >
                                    {service}
                                </Badge>
                            ))}
                            {post.servicios.length > 8 && (
                                <Badge 
                                    bg="light" 
                                    text="dark"
                                    style={{ fontSize: '0.75rem' }}
                                >
                                    +{post.servicios.length - 8} autres
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
                    <small className="text-muted d-block mb-2">
                        💫 Une expérience unique vous attend
                    </small>
                    {post.contacto && (
                        <div style={{ 
                            color: valueColor, 
                            fontWeight: '600',
                            fontSize: '0.9rem'
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