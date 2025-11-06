import React from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

const DescriptionPost = ({ post, readMore, setReadMore }) => {
    const { t, i18n } = useTranslation('descripcion');
    const isRTL = i18n.language === 'ar';

    // 🎨 Colores y estilos consistentes
    const styles = {
        primaryColor: "#1e88e5",
        accentColor: "#1565c0",
        successColor: "#059669",
        warningColor: "#d97706",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        cardShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
    };

    // 🏷️ Información de categoría mejorada
    const getCategoryInfo = () => {
        const categories = {
            "hadj_Omra": {
                icon: "🕋",
                title: t('categories.hajjUmrah', 'Pèlerinage Hajj & Omra'),
                color: "#8B4513",
                gradient: "linear-gradient(135deg, #8B4513 0%, #D2691E 100%)",
                description: t('categories.hajjDescription', 'Expérience spirituelle unique')
            },
            "Voyage Organise": {
                icon: "✈️",
                title: t('categories.organizedTrip', 'Voyage Organisé'),
                color: "#3498db",
                gradient: "linear-gradient(135deg, #3498db 0%, #1abc9c 100%)",
                description: t('categories.organizedDescription', 'Aventure planifiée pour votre confort')
            },
            "Location_Vacances": {
                icon: "🏠",
                title: t('categories.vacationRental', 'Location de Vacances'),
                color: "#e74c3c",
                gradient: "linear-gradient(135deg, #e74c3c 0%, #e67e22 100%)",
                description: t('categories.rentalDescription', 'Votre maison loin de chez vous')
            }
        };

        return categories[post.subCategory] || {
            icon: "🌟",
            title: post.subCategory || t('categories.general', 'Offre Exceptionnelle'),
            color: "#9b59b6",
            gradient: "linear-gradient(135deg, #9b59b6 0%, #3498db 100%)",
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
                padding: '3px 8px',
                borderRadius: '6px',
                margin: '0 2px',
                fontSize: '0.9em',
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

    // 🎯 GENERACIÓN DEL ANUNCIO MEJORADO - 5 PARTES

    // 🔹 PARTE 1: ANUNCIO PRINCIPAL MEJORADO
    const generateMainAnnouncement = () => {
        return (
            <div style={{
                background: categoryInfo.gradient,
                color: 'white',
                padding: '24px',
                borderRadius: '12px',
                marginBottom: '20px',
                textAlign: 'center'
            }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>
                    {categoryInfo.icon}
                </div>
                <h1 style={{ 
                    margin: '0 0 8px 0', 
                    fontSize: '24px',
                    fontWeight: '700'
                }}>
                    {t('announcement.excitingNews', '🎉 Nouvelle Offre Exclusive !')}
                </h1>
                <p style={{ 
                    fontSize: '18px', 
                    opacity: '0.9',
                    lineHeight: '1.5',
                    marginBottom: '16px'
                }}>
                    <strong>{post.category}</strong> {t('announcement.proudlyPresents', 'a le plaisir de vous présenter un')} 
                    <strong> {categoryInfo.title}</strong> {t('announcement.carefullyDesigned', 'soigneusement conçu pour votre plus grand plaisir.')}
                </p>

                {/* Información clave destacada */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '20px',
                    flexWrap: 'wrap',
                    marginTop: '16px'
                }}>
                    {post.datedepar && (
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '14px', opacity: '0.8' }}>🗓️ {t('announcement.departure', 'Départ')}</div>
                            <div style={{ fontSize: '16px', fontWeight: '600' }}>
                                {formatBeautifulDate(post.datedepar)}
                            </div>
                            {post.horadudepar && (
                                <div style={{ fontSize: '14px', opacity: '0.8' }}>
                                    {t('announcement.at', 'à')} {post.horadudepar}
                                </div>
                            )}
                        </div>
                    )}

                    {post.destinacion && (
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '14px', opacity: '0.8' }}>✈️ {t('announcement.destination', 'Destination')}</div>
                            <div style={{ fontSize: '16px', fontWeight: '600' }}>
                                {post.destinacion}
                            </div>
                        </div>
                    )}

                    {post.dureeSejour && (
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '14px', opacity: '0.8' }}>⏱️ {t('announcement.duration', 'Durée')}</div>
                            <div style={{ fontSize: '16px', fontWeight: '600' }}>
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
                padding: '20px',
                borderRadius: '12px',
                marginBottom: '20px',
                border: '1px solid #e2e8f0'
            }}>
                <h2 style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '16px',
                    color: styles.primaryColor,
                    fontSize: '20px'
                }}>
                    🎯 {t('details.journeyDetails', 'Les Détails de Votre Voyage')}
                </h2>

                <div style={{ lineHeight: '1.6' }}>
                    {/* Información de ubicación */}
                    {(post.wilaya || post.commune || post.vile) && (
                        <p style={{ marginBottom: '12px' }}>
                            <span style={{ fontWeight: '600', color: '#4a5568' }}>
                                📍 {t('details.departureLocation', 'Lieu de départ')}: 
                            </span>
                            {post.wilaya && ` ${post.wilaya}`}
                            {post.commune && `, ${post.commune}`}
                            {post.vile && ` (${post.vile})`}
                        </p>
                    )}

                    {/* Información específica por categoría */}
                    {renderCategorySpecificDetails()}

                    {/* Servicios incluidos preview */}
                    {post.servicios && post.servicios.length > 0 && (
                        <p style={{ marginBottom: '12px' }}>
                            <span style={{ fontWeight: '600', color: '#4a5568' }}>
                                ✅ {t('details.includes', 'Comprend')}:
                            </span>
                            {' '}{post.servicios.slice(0, 3).join(', ')}
                            {post.servicios.length > 3 && ` ${t('details.andMore', 'et plus encore...')}`}
                        </p>
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
                padding: '20px',
                borderRadius: '12px',
                marginBottom: '20px',
                border: '1px solid #fed7aa'
            }}>
                <h2 style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '16px',
                    color: styles.warningColor,
                    fontSize: '20px'
                }}>
                    🏨 {t('accommodation.yourStay', 'Votre Hébergement')}
                </h2>

                {renderAccommodationContent()}
            </div>
        );
    };

    // 🔹 PARTE 4: PRECIOS Y OFERTAS MEJORADOS
    const generatePricingDetails = () => {
        return (
            <div style={{
                backgroundColor: '#f0fdf4',
                padding: '20px',
                borderRadius: '12px',
                marginBottom: '20px',
                border: '1px solid #dcfce7'
            }}>
                <h2 style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '16px',
                    color: styles.successColor,
                    fontSize: '20px'
                }}>
                    💰 {t('pricing.investment', 'Votre Investissement')}
                </h2>

                {renderPricingContent()}
            </div>
        );
    };

    // 🔹 PARTE 5: CONTACTO Y RESERVA MEJORADO
    const generateContactSection = () => {
        return (
            <div style={{
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                color: 'white',
                padding: '24px',
                borderRadius: '12px',
                textAlign: 'center'
            }}>
                <h2 style={{
                    margin: '0 0 16px 0',
                    fontSize: '22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                }}>
                    📞 {t('contact.readyToBook', 'Prêt à Réserver ?')}
                </h2>

                <p style={{ marginBottom: '16px', fontSize: '18px', opacity: '0.9' }}>
                    {t('contact.dontMiss', 'Ne manquez pas cette opportunité unique ! Notre équipe est à votre disposition pour répondre à toutes vos questions et finaliser votre réservation.')}
                </p>

                {post.contacto && (
                    <div style={{
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        padding: '12px 20px',
                        borderRadius: '8px',
                        display: 'inline-block',
                        marginBottom: '16px'
                    }}>
                        <div style={{ fontSize: '14px', opacity: '0.8', marginBottom: '4px' }}>
                            📞 {t('contact.callNow', 'Appelez-nous dès maintenant')}
                        </div>
                        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                            {post.contacto}
                        </div>
                    </div>
                )}

                <p style={{ fontSize: '16px', opacity: '0.8', margin: '0' }}>
                    {t('contact.guarantee', 'Réservez en toute confiance et préparez-vous à vivre des moments inoubliables !')} 🎉
                </p>
            </div>
        );
    };

    // 🛠️ FUNCIONES AUXILIARES MEJORADAS

    const hasAccommodationData = () => {
        return post.nombreHotel || post.hotelMeca || post.hotelMedina || 
               post.tipoPropiedad || post.capacidad || post.habitaciones;
    };

    const renderCategorySpecificDetails = () => {
        switch (post.subCategory) {
            case "hadj_Omra":
                return (
                    <>
                        {post.hotelMeca && (
                            <p style={{ marginBottom: '8px' }}>
                                <span style={{ fontWeight: '600' }}>🕋 {t('specific.hotelMeca', 'Hôtel à La Mecque')}:</span>
                                <Highlight type="feature">{post.hotelMeca}</Highlight>
                            </p>
                        )}
                        {post.hotelMedina && (
                            <p style={{ marginBottom: '8px' }}>
                                <span style={{ fontWeight: '600' }}>🕌 {t('specific.hotelMedina', 'Hôtel à Médine')}:</span>
                                <Highlight type="feature">{post.hotelMedina}</Highlight>
                            </p>
                        )}
                        {post.typeTransport && (
                            <p style={{ marginBottom: '8px' }}>
                                <span style={{ fontWeight: '600' }}>🚗 {t('specific.transport', 'Transport')}:</span>
                                <Highlight>{post.typeTransport}</Highlight>
                                {post.compagnieAerienne && ` avec ${post.compagnieAerienne}`}
                                {post.classeVol && ` (${post.classeVol})`}
                            </p>
                        )}
                    </>
                );

            case "Voyage Organise":
                return (
                    <>
                        {post.nombreHotel && (
                            <p style={{ marginBottom: '8px' }}>
                                <span style={{ fontWeight: '600' }}>🏨 {t('specific.hotel', 'Hôtel')}:</span>
                                <Highlight type="feature">{post.nombreHotel}</Highlight>
                                {post.ciudadHotel && ` à ${post.ciudadHotel}`}
                            </p>
                        )}
                        {post.categoriaAlojamiento && (
                            <p style={{ marginBottom: '8px' }}>
                                <span style={{ fontWeight: '600' }}>⭐ {t('specific.category', 'Catégorie')}:</span>
                                <Highlight>{post.categoriaAlojamiento}</Highlight>
                            </p>
                        )}
                        {post.regimenComidas && (
                            <p style={{ marginBottom: '8px' }}>
                                <span style={{ fontWeight: '600' }}>🍽️ {t('specific.mealPlan', 'Régime')}:</span>
                                <Highlight>{post.regimenComidas}</Highlight>
                            </p>
                        )}
                    </>
                );

            case "Location_Vacances":
                return (
                    <>
                        {post.tipoPropiedad && (
                            <p style={{ marginBottom: '8px' }}>
                                <span style={{ fontWeight: '600' }}>🏠 {t('specific.propertyType', 'Type de propriété')}:</span>
                                <Highlight type="feature">{post.tipoPropiedad}</Highlight>
                            </p>
                        )}
                        {post.capacidad && (
                            <p style={{ marginBottom: '8px' }}>
                                <span style={{ fontWeight: '600' }}>👥 {t('specific.capacity', 'Capacité')}:</span>
                                <Highlight>{post.capacidad} {t('specific.people', 'personnes')}</Highlight>
                            </p>
                        )}
                        {post.habitaciones && (
                            <p style={{ marginBottom: '8px' }}>
                                <span style={{ fontWeight: '600' }}>🛏️ {t('specific.rooms', 'Chambres')}:</span>
                                <Highlight>{post.habitaciones}</Highlight>
                            </p>
                        )}
                        {post.superficie && (
                            <p style={{ marginBottom: '8px' }}>
                                <span style={{ fontWeight: '600' }}>📐 {t('specific.area', 'Surface')}:</span>
                                <Highlight>{post.superficie}m²</Highlight>
                            </p>
                        )}
                    </>
                );

            default:
                return null;
        }
    };

    const renderAccommodationContent = () => {
        const content = [];

        // Información general de hotel
        if (post.nombreHotel) {
            content.push(
                <p key="hotel-name" style={{ marginBottom: '12px' }}>
                    <span style={{ fontWeight: '600', color: '#4a5568' }}>
                        🏰 {t('accommodation.hotelName', 'Nom de l\'hôtel')}:
                    </span>
                    {' '}<Highlight type="feature">{post.nombreHotel}</Highlight>
                    {post.ciudadHotel && ` à ${post.ciudadHotel}`}
                    {post.zonaRegion && `, ${post.zonaRegion}`}
                </p>
            );

            if (post.direccionHotel) {
                content.push(
                    <p key="hotel-address" style={{ 
                        marginBottom: '12px', 
                        fontSize: '14px', 
                        color: '#718096',
                        paddingLeft: '20px'
                    }}>
                        📍 {post.direccionHotel}
                    </p>
                );
            }
        }

        // Hoteles específicos para Hajj/Omra
        if (post.hotelMeca) {
            content.push(
                <p key="meca-hotel" style={{ marginBottom: '8px' }}>
                    <span style={{ fontWeight: '600', color: '#4a5568' }}>🕋 {t('accommodation.meca', 'La Mecque')}:</span>
                    {' '}<Highlight type="feature">{post.hotelMeca}</Highlight>
                </p>
            );
        }

        if (post.hotelMedina) {
            content.push(
                <p key="medina-hotel" style={{ marginBottom: '8px' }}>
                    <span style={{ fontWeight: '600', color: '#4a5568' }}>🕌 {t('accommodation.medina', 'Médine')}:</span>
                    {' '}<Highlight type="feature">{post.hotelMedina}</Highlight>
                </p>
            );
        }

        return content;
    };

    const renderPricingContent = () => {
        const content = [];

        // Precio principal destacado
        const mainPrice = post.precioBase || post.price || post.prixAdulte;
        if (mainPrice) {
            content.push(
                <div key="main-price" style={{ 
                    textAlign: 'center', 
                    marginBottom: '20px',
                    padding: '20px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    border: '2px solid #10b981'
                }}>
                    <div style={{ fontSize: '16px', color: '#64748b', marginBottom: '8px' }}>
                        {t('pricing.startingFrom', 'À partir de')}
                    </div>
                    <div style={{ fontSize: '36px', fontWeight: 'bold', color: styles.successColor }}>
                        ${mainPrice}
                    </div>
                    <div style={{ fontSize: '14px', color: '#64748b' }}>
                        {t('pricing.perPerson', 'par personne')}
                        {post.tipoPrecio && ` • ${post.tipoPrecio}`}
                    </div>
                </div>
            );
        }

        // Tarifas por edad
        const hasAgePrices = post.tarifaNinos || post.prixEnfant || post.tarifaBebes || post.prixBebe;
        if (hasAgePrices) {
            content.push(
                <div key="age-prices" style={{ marginBottom: '16px' }}>
                    <h3 style={{ color: '#4a5568', marginBottom: '12px', fontSize: '18px' }}>
                        👨‍👩‍👧‍👦 {t('pricing.familyRates', 'Tarifs Famille')}
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
                        {(post.prixAdulte || post.tarifaNinos) && (
                            <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#f1f5f9', borderRadius: '8px' }}>
                                <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>👨‍🦳 {t('pricing.adults', 'Adultes')}</div>
                                <div style={{ fontSize: '20px', fontWeight: 'bold', color: styles.successColor }}>
                                    ${post.prixAdulte || post.tarifaNinos}
                                </div>
                            </div>
                        )}
                        {(post.prixEnfant || post.tarifaBebes) && (
                            <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#f1f5f9', borderRadius: '8px' }}>
                                <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>👧 {t('pricing.children', 'Enfants')}</div>
                                <div style={{ fontSize: '20px', fontWeight: 'bold', color: styles.successColor }}>
                                    ${post.prixEnfant || post.tarifaBebes}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        // Ofertas y descuentos
        const hasDiscounts = post.descuentoGrupo || post.ofertaEspecial || post.descuentoTemporadaBaja || post.descuentoAnticipacion;
        if (hasDiscounts) {
            content.push(
                <div key="discounts">
                    <h3 style={{ color: '#4a5568', marginBottom: '12px', fontSize: '18px' }}>
                        🎊 {t('pricing.specialOffers', 'Offres Spéciales')}
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {post.descuentoGrupo && (
                            <Highlight type="feature">👥 {t('pricing.groupDiscount', 'Réduction Groupe')}</Highlight>
                        )}
                        {post.ofertaEspecial && (
                            <Highlight type="feature">⭐ {t('pricing.specialOffer', 'Offre Spéciale')}</Highlight>
                        )}
                        {post.descuentoTemporadaBaja && (
                            <Highlight type="feature">🌸 {t('pricing.lowSeason', 'Basse Saison')}</Highlight>
                        )}
                        {post.descuentoAnticipacion && (
                            <Highlight type="feature">🎯 {t('pricing.earlyBooking', 'Réservation Anticipée')}</Highlight>
                        )}
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
            lineHeight: '1.6',
            color: '#2d3748',
            maxWidth: '800px',
            margin: '0 auto',
            padding: '5px'
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