import React from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

const DescriptionPost = ({ post, readMore, setReadMore }) => {
    const { t, i18n } = useTranslation('descripcion');
    const isRTL = i18n.language === 'ar';

    // 🎨 Colores y estilos consistentes - MÁS CLAROS Y SUAVES
    const styles = {
        primaryColor: "#1e88e5",        // Azul principal
        accentColor: "#1565c0",         // Azul más oscuro
        successColor: "#059669",        // Verde éxito
        warningColor: "#d97706",        // Naranja advertencia
        // 🆕 GRADIENTES MÁS CLAROS Y DEFINIDOS
        mainGradient: "linear-gradient(135deg, #c2d9ff 0%, #4f46e5 100%)",        // Azul lavanda a índigo
        contactGradient: "linear-gradient(135deg, #93c5fd 0%, #2563eb 100%)",     // Azul cielo a azul real
        cardShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
    };

    // 🏷️ Información de categoría mejorada
    const getCategoryInfo = () => {
        const categories = {
            "hadj_Omra": {
                icon: "🕋",
                title: t('categories.hajjUmrah', 'Pèlerinage Hajj & Omra'),
                color: "#8B4513",
                gradient: styles.mainGradient,
                description: t('categories.hajjDescription', 'Expérience spirituelle unique')
            },
            "Voyage Organise": {
                icon: "✈️",
                title: t('categories.organizedTrip', 'Voyage Organisé'),
                color: "#3498db",
                gradient: styles.mainGradient,
                description: t('categories.organizedDescription', 'Aventure planifiée pour votre confort')
            },
            "Location_Vacances": {
                icon: "🏠",
                title: t('categories.vacationRental', 'Location de Vacances'),
                color: "#e74c3c",
                gradient: styles.mainGradient,
                description: t('categories.rentalDescription', 'Votre maison loin de chez vous')
            }
        };

        return categories[post.subCategory] || {
            icon: "🌟",
            title: post.subCategory || t('categories.general', 'Offre Exceptionnelle'),
            color: "#9b59b6",
            gradient: styles.mainGradient,
            description: t('categories.generalDescription', 'Expérience de voyage unique')
        };
    };

    const categoryInfo = getCategoryInfo();

    // ✨ Componente para valores destacados
    const Highlight = ({ children, type = "default" }) => {
        const typeStyles = {
            default: { backgroundColor: '#e3f2fd', color: styles.primaryColor },
            price: { backgroundColor: '#dcfce7', color: styles.successColor, fontWeight: '700' },
            feature: { backgroundColor: '#fef3c7', color: styles.warningColor },
            contact: { backgroundColor: '#dbeafe', color: styles.accentColor, fontWeight: '600' }
        };

        const style = typeStyles[type] || typeStyles.default;

        return (
            <span style={{
                ...style,
                padding: '2px 6px',
                borderRadius: '4px',
                margin: '0 2px',
                fontSize: '0.85em',
                display: 'inline-block'
            }}>
                {children}
            </span>
        );
    };

    // 🗓️ Formateo de fechas mejorado
    const formatBeautifulDate = (dateString) => {
        if (!dateString) return '';
        
        const locales = {
            'fr': 'fr-FR',
            'ar': 'ar-EG',
            'es': 'es-ES'
        };

        const date = new Date(dateString);
        return date.toLocaleDateString(locales[i18n.language] || 'fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    // 🆕 FUNCIÓN PARA DETECTAR DISPOSITIVO MÓVIL
    const isMobileDevice = () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    // 🆕 FUNCIÓN PARA FORMATEAR NÚMERO DE TELÉFONO
    const formatPhoneNumber = (phone) => {
        if (!phone) return '';
        return phone.replace(/[\s\-\(\)\+]/g, '');
    };

    // 🎯 GENERACIÓN DEL ANUNCIO MEJORADO

    // 🔹 PARTE 1: ANUNCIO PRINCIPAL MEJORADO
    const generateMainAnnouncement = () => {
        return (
            <div style={{
                background: styles.mainGradient,
                color: 'white',
                padding: '20px',
                borderRadius: '10px',
                marginBottom: '16px',
                textAlign: 'center'
            }}>
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>
                    {categoryInfo.icon}
                </div>
                <h1 style={{ 
                    margin: '0 0 6px 0', 
                    fontSize: '20px',
                    fontWeight: '700'
                }}>
                    {t('announcement.excitingNews', '🎉 Nouvelle Offre Exclusive !')}
                </h1>
                <p style={{ 
                    fontSize: '16px', 
                    opacity: '0.9',
                    lineHeight: '1.4',
                    marginBottom: '12px'
                }}>
                    <strong>{post.category}</strong> {t('announcement.proudlyPresents', 'a le plaisir de vous présenter un')} 
                    <strong> {categoryInfo.title}</strong> {t('announcement.carefullyDesigned', 'soigneusement conçu pour votre plus grand plaisir.')}
                </p>

                {/* Información clave destacada */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '16px',
                    flexWrap: 'wrap',
                    marginTop: '12px'
                }}>
                    {post.datedepar && (
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '12px', opacity: '0.8' }}>🗓️ {t('announcement.departure', 'Départ')}</div>
                            <div style={{ fontSize: '14px', fontWeight: '600' }}>
                                {formatBeautifulDate(post.datedepar)}
                            </div>
                            {post.horadudepar && (
                                <div style={{ fontSize: '12px', opacity: '0.8' }}>
                                    {t('announcement.at', 'à')} {post.horadudepar}
                                </div>
                            )}
                        </div>
                    )}

                    {post.destinacion && (
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '12px', opacity: '0.8' }}>✈️ {t('announcement.destination', 'Destination')}</div>
                            <div style={{ fontSize: '14px', fontWeight: '600' }}>
                                {post.destinacion}
                            </div>
                        </div>
                    )}

                    {post.dureeSejour && (
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '12px', opacity: '0.8' }}>⏱️ {t('announcement.duration', 'Durée')}</div>
                            <div style={{ fontSize: '14px', fontWeight: '600' }}>
                                {post.dureeSejour}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // 🔹 PARTE 2: DETALLES DEL VIAJE MEJORADOS
    const generateTravelDetails = () => {
        return (
            <div style={{
                backgroundColor: '#f8fafc',
                padding: '16px',
                borderRadius: '10px',
                marginBottom: '16px',
                border: '1px solid #e2e8f0'
            }}>
                <h2 style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginBottom: '12px',
                    color: styles.primaryColor,
                    fontSize: '18px'
                }}>
                    🎯 {t('details.journeyDetails', 'Les Détails de Votre Voyage')}
                </h2>

                <div style={{ lineHeight: '1.5' }}>
                    {/* Información de ubicación */}
                    {(post.wilaya || post.commune || post.vile) && (
                        <p style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontWeight: '600', color: '#4a5568', minWidth: '120px' }}>
                                📍 {t('details.departureLocation', 'Lieu de départ')}:
                            </span>
                            <span>
                                {post.wilaya && `${post.wilaya}`}
                                {post.commune && `, ${post.commune}`}
                                {post.vile && ` (${post.vile})`}
                            </span>
                        </p>
                    )}

                    {/* Información específica por categoría */}
                    {renderCategorySpecificDetails()}

                    {/* 🆕 SECCIÓN MEJORADA DE SERVICIOS */}
                    {post.servicios && post.servicios.length > 0 && (
                        <div style={{ 
                            marginTop: '12px',
                            padding: '12px',
                            backgroundColor: '#f0f9ff',
                            borderRadius: '8px',
                            border: '1px solid #bae6fd'
                        }}>
                            <h3 style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                marginBottom: '8px',
                                color: styles.primaryColor,
                                fontSize: '16px',
                                fontWeight: '600'
                            }}>
                                ✨ {t('services.exclusiveServices', 'Services Exclusifs Inclus')}
                            </h3>
                            <p style={{ 
                                fontSize: '14px', 
                                color: '#475569',
                                marginBottom: '8px',
                                fontStyle: 'italic'
                            }}>
                                {t('services.presentation', 'Pour votre confort et satisfaction, nous avons soigneusement sélectionné ces services:')}
                            </p>
                            <div style={{ 
                                display: 'flex', 
                                flexWrap: 'wrap', 
                                gap: '6px',
                                alignItems: 'center'
                            }}>
                                {post.servicios.slice(0, 5).map((servicio, index) => (
                                    <span key={index} style={{
                                        backgroundColor: '#dbeafe',
                                        color: styles.primaryColor,
                                        padding: '4px 8px',
                                        borderRadius: '6px',
                                        fontSize: '12px',
                                        fontWeight: '500',
                                        border: '1px solid #93c5fd'
                                    }}>
                                        ✅ {servicio}
                                    </span>
                                ))}
                                {post.servicios.length > 5 && (
                                    <span style={{
                                        backgroundColor: '#fef3c7',
                                        color: styles.warningColor,
                                        padding: '4px 8px',
                                        borderRadius: '6px',
                                        fontSize: '12px',
                                        fontWeight: '500'
                                    }}>
                                        +{post.servicios.length - 5} {t('services.moreServices', 'autres services')}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // 🔹 PARTE 3: ALOJAMIENTO Y SERVICIOS MEJORADOS
    const generateAccommodationDetails = () => {
        if (!hasAccommodationData()) return null;

        return (
            <div style={{
                backgroundColor: '#fff7ed',
                padding: '16px',
                borderRadius: '10px',
                marginBottom: '16px',
                border: '1px solid #fed7aa'
            }}>
                <h2 style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginBottom: '12px',
                    color: styles.warningColor,
                    fontSize: '18px'
                }}>
                    🏨 {t('accommodation.yourStay', 'Votre Hébergement')}
                </h2>

                {renderAccommodationContent()}
            </div>
        );
    };

    // 🔹 PARTE 4: PRECIOS Y OFERTAS - CON NUEVO TÍTULO PARA SERVICIOS DE PRECIOS
    const generatePricingDetails = () => {
        if (!hasPricingData()) return null;

        return (
            <div style={{
                backgroundColor: '#f0fdf4',
                padding: '16px',
                borderRadius: '10px',
                marginBottom: '16px',
                border: '1px solid #dcfce7'
            }}>
                <h2 style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginBottom: '12px',
                    color: styles.successColor,
                    fontSize: '18px'
                }}>
                    💰 {t('pricing.investment', 'Votre Investissement')}
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {renderPricingContent()}
                </div>
            </div>
        );
    };

    // 🔹 PARTE 5: CONTACTO Y RESERVA MEJORADO
    const generateContactSection = () => {
        const phoneNumber = post.contacto ? formatPhoneNumber(post.contacto) : '';
        const mobileDevice = isMobileDevice();

        return (
            <div style={{
                background: styles.contactGradient,
                color: 'white',
                padding: '20px',
                borderRadius: '10px',
                textAlign: 'center'
            }}>
                <h2 style={{
                    margin: '0 0 12px 0',
                    fontSize: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                }}>
                    📞 {t('contact.readyToBook', 'Prêt à Réserver ?')}
                </h2>

                <p style={{ marginBottom: '12px', fontSize: '16px', opacity: '0.9' }}>
                    {t('contact.dontMiss', 'Ne manquez pas cette opportunité unique ! Notre équipe est à votre disposition pour répondre à toutes vos questions et finaliser votre réservation.')}
                </p>

                {post.contacto && (
                    <div style={{
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        display: 'inline-block',
                        marginBottom: '12px',
                        cursor: mobileDevice ? 'pointer' : 'default',
                        transition: 'all 0.3s ease',
                        border: mobileDevice ? '2px solid rgba(255,255,255,0.3)' : 'none'
                    }}
                    onMouseEnter={(e) => {
                        if (mobileDevice) {
                            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)';
                            e.currentTarget.style.transform = 'scale(1.02)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (mobileDevice) {
                            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
                            e.currentTarget.style.transform = 'scale(1)';
                        }
                    }}
                    >
                        <div style={{ fontSize: '12px', opacity: '0.8', marginBottom: '4px' }}>
                            📞 {t('contact.callNow', 'Appelez-nous dès maintenant')}
                        </div>
                        
                        {mobileDevice ? (
                            <a 
                                href={`tel:${phoneNumber}`}
                                style={{
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    textDecoration: 'none',
                                    display: 'block'
                                }}
                                onClick={(e) => {
                                    if (window.confirm(t('contact.confirmCall', `Voulez-vous appeler ${post.contacto} ?`))) {
                                        console.log('Llamando a:', post.contacto);
                                    } else {
                                        e.preventDefault();
                                    }
                                }}
                            >
                                {post.contacto}
                                <div style={{
                                    fontSize: '11px',
                                    opacity: '0.8',
                                    marginTop: '2px',
                                    fontStyle: 'italic'
                                }}>
                                    {t('contact.tapToCall', 'Touchez pour appeler')} 📱
                                </div>
                            </a>
                        ) : (
                            <div>
                                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                    {post.contacto}
                                </div>
                                <div style={{
                                    fontSize: '11px',
                                    opacity: '0.8',
                                    marginTop: '2px',
                                    fontStyle: 'italic'
                                }}>
                                    {t('contact.useMobileToCall', 'Utilisez votre mobile pour appeler')}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <p style={{ fontSize: '14px', opacity: '0.8', margin: '0' }}>
                    {t('contact.guarantee', 'Réservez en toute confiance et préparez-vous à vivre des moments inoubliables !')} 🎉
                </p>
            </div>
        );
    };

    // 🛠️ FUNCIONES AUXILIARES MEJORADAS

    const hasAccommodationData = () => {
        return post.nombreHotel || post.tipoPropiedad || post.capacidad || post.habitaciones;
    };

    const hasPricingData = () => {
        return post.precioBase || post.price || post.prixAdulte || 
               post.tarifaNinos || post.prixEnfant || post.tarifaBebes || 
               post.prixBebe || post.descuentoGrupo || post.ofertaEspecial ||
               post.descuentoTemporadaBaja || post.descuentoAnticipacion;
    };

    const renderCategorySpecificDetails = () => {
        const details = [];

        switch (post.subCategory) {
            case "hadj_Omra":
                if (post.nombreHotel) {
                    details.push(
                        <div key="hajj-hotel" style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontWeight: '600', color: '#4a5568', minWidth: '140px' }}>
                                🏨 {t('specific.hotel', 'Hôtel')}:
                            </span>
                            <Highlight type="feature">{post.nombreHotel}</Highlight>
                        </div>
                    );
                }
                if (post.typeTransport) {
                    details.push(
                        <div key="transport" style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontWeight: '600', color: '#4a5568', minWidth: '140px' }}>
                                🚗 {t('specific.transport', 'Transport')}:
                            </span>
                            <span>
                                <Highlight>{post.typeTransport}</Highlight>
                                {post.compagnieAerienne && ` avec ${post.compagnieAerienne}`}
                                {post.classeVol && ` (${post.classeVol})`}
                            </span>
                        </div>
                    );
                }
                break;

            case "Voyage Organise":
                if (post.nombreHotel) {
                    details.push(
                        <div key="hotel" style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontWeight: '600', color: '#4a5568', minWidth: '140px' }}>
                                🏨 {t('specific.hotel', 'Hôtel')}:
                            </span>
                            <span>
                                <Highlight type="feature">{post.nombreHotel}</Highlight>
                                {post.ciudadHotel && ` à ${post.ciudadHotel}`}
                            </span>
                        </div>
                    );
                }
                if (post.categoriaAlojamiento) {
                    details.push(
                        <div key="category" style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontWeight: '600', color: '#4a5568', minWidth: '140px' }}>
                                ⭐ {t('specific.category', 'Catégorie')}:
                            </span>
                            <Highlight>{post.categoriaAlojamiento}</Highlight>
                        </div>
                    );
                }
                break;

            case "Location_Vacances":
                if (post.tipoPropiedad) {
                    details.push(
                        <div key="property-type" style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontWeight: '600', color: '#4a5568', minWidth: '140px' }}>
                                🏠 {t('specific.propertyType', 'Type de propriété')}:
                            </span>
                            <Highlight type="feature">{post.tipoPropiedad}</Highlight>
                        </div>
                    );
                }
                if (post.capacidad) {
                    details.push(
                        <div key="capacity" style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontWeight: '600', color: '#4a5568', minWidth: '140px' }}>
                                👥 {t('specific.capacity', 'Capacité')}:
                            </span>
                            <Highlight>{post.capacidad} {t('specific.people', 'personnes')}</Highlight>
                        </div>
                    );
                }
                break;
        }

        return details;
    };

    const renderAccommodationContent = () => {
        const content = [];

        if (post.nombreHotel) {
            content.push(
                <div key="hotel-name" style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <span style={{ fontWeight: '600', color: '#4a5568', minWidth: '140px' }}>
                        🏨 {t('accommodation.hotelName', 'Nom de l\'hôtel')}:
                    </span>
                    <span>
                        <Highlight type="feature">{post.nombreHotel}</Highlight>
                        {post.ciudadHotel && ` à ${post.ciudadHotel}`}
                        {post.zonaRegion && `, ${post.zonaRegion}`}
                    </span>
                </div>
            );
        }

        return content;
    };

    // 🔥 NUEVA FUNCIÓN DE PRECIOS - CON TÍTULO PARA SERVICIOS DE PRECIOS
    const renderPricingContent = () => {
        const content = [];

        // Precio principal
        const mainPrice = post.precioBase || post.price || post.prixAdulte;
        if (mainPrice) {
            content.push(
                <div key="main-price" style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    backgroundColor: 'white',
                    borderRadius: '6px',
                    border: '1px solid #10b981'
                }}>
                    <span style={{ fontWeight: '600', color: '#374151' }}>
                        💰 {t('pricing.startingFrom', 'À partir de')}:
                    </span>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '20px', fontWeight: 'bold', color: styles.successColor }}>
                           {mainPrice} DA 
                        </div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>
                            {t('pricing.perPerson', 'par personne')}
                        </div>
                    </div>
                </div>
            );
        }

        // Tarifas por edad
        const agePrices = [];
        
        if (post.prixAdulte) {
            agePrices.push(
                <div key="adult" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0' }}>
                    <span style={{ fontSize: '14px', color: '#4b5563' }}>👨‍🦳 {t('pricing.adults', 'Adultes')}:</span>
                    <span style={{ fontWeight: '600', color: styles.successColor }}>${post.prixAdulte}</span>
                </div>
            );
        }

        if (post.prixEnfant || post.tarifaNinos) {
            agePrices.push(
                <div key="child" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0' }}>
                    <span style={{ fontSize: '14px', color: '#4b5563' }}>👧 {t('pricing.children', 'Enfants')}:</span>
                    <span style={{ fontWeight: '600', color: styles.successColor }}>${post.prixEnfant || post.tarifaNinos}</span>
                </div>
            );
        }

        if (post.prixBebe || post.tarifaBebes) {
            agePrices.push(
                <div key="baby" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0' }}>
                    <span style={{ fontSize: '14px', color: '#4b5563' }}>👶 {t('pricing.babies', 'Bébés')}:</span>
                    <span style={{ fontWeight: '600', color: styles.successColor }}>${post.prixBebe || post.tarifaBebes}</span>
                </div>
            );
        }

        if (agePrices.length > 0) {
            content.push(
                <div key="age-prices" style={{ 
                    backgroundColor: '#f8fafc', 
                    padding: '8px 12px', 
                    borderRadius: '6px',
                    border: '1px solid #e5e7eb'
                }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                        👨‍👩‍👧‍👦 {t('pricing.familyRates', 'Tarifs Famille')}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        {agePrices}
                    </div>
                </div>
            );
        }

        // 🆕 SERVICIOS DE PRECIOS CON TÍTULO
        const discounts = [];
        
        if (post.descuentoGrupo) discounts.push("👥 " + t('pricing.groupDiscount', 'Réduction Groupe'));
        if (post.ofertaEspecial) discounts.push("⭐ " + t('pricing.specialOffer', 'Offre Spéciale'));
        if (post.descuentoTemporadaBaja) discounts.push("🌸 " + t('pricing.lowSeason', 'Basse Saison'));
        if (post.descuentoAnticipacion) discounts.push("🎯 " + t('pricing.earlyBooking', 'Réservation Anticipée'));

        if (discounts.length > 0) {
            content.push(
                <div key="discounts" style={{ 
                    backgroundColor: '#fff7ed',
                    padding: '12px',
                    borderRadius: '6px',
                    border: '1px solid #fed7aa'
                }}>
                    <div style={{ 
                        fontSize: '14px', 
                        fontWeight: '600', 
                        color: styles.warningColor, 
                        marginBottom: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}>
                        🎁 {t('pricing.benefitsTitle', 'Avantages Exclusifs Inclus')}
                    </div>
                    <div style={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: '6px'
                    }}>
                        {discounts.map((discount, index) => (
                            <span key={index} style={{
                                backgroundColor: '#fef3c7',
                                color: styles.warningColor,
                                padding: '6px 10px',
                                borderRadius: '6px',
                                fontSize: '13px',
                                fontWeight: '500',
                                border: '1px solid #fcd34d'
                            }}>
                                {discount}
                            </span>
                        ))}
                    </div>
                </div>
            );
        }

        return content;
    };

    // 🎯 RENDER PRINCIPAL MEJORADO
    return (
        <div style={{ 
            direction: isRTL ? 'rtl' : 'ltr',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            lineHeight: '1.5',
            color: '#2d3748',
            maxWidth: '800px',
            margin: '0 auto',
            padding: '8px'
        }}>
            {generateMainAnnouncement()}
            {generateTravelDetails()}
            {generateAccommodationDetails()}
            {generatePricingDetails()}
            {generateContactSection()}
        </div>
    );
};

export default DescriptionPost;