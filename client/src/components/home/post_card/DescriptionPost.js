import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

const DescriptionPost = ({ post }) => {
    const { t, i18n } = useTranslation(['descripcion', 'categories']);
    const isRTL = i18n.language === 'ar';
    const [readMore, setReadMore] = useState(false);

    // 🎨 Colores y estilos consistentes
    const styles = {
        primaryColor: "#1e88e5",
        accentColor: "#1565c0",
        successColor: "#059669",
        warningColor: "#d97706",
        mainGradient: "linear-gradient(135deg, #c2d9ff 0%, #4f46e5 100%)",
        contactGradient: "linear-gradient(135deg, #93c5fd 0%, #2563eb 100%)",
        cardShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
    };

    // 🏷️ Información de categoría mejorada
    const getCategoryInfo = () => {
        const categories = {
            "hadj_Omra": {
                icon: "🕋",
                title: t('categories.hajjUmrah', 'Pèlerinage Hajj & Omra'),
                color: "#8B4513",
                description: t('categories.hajjDescription', 'Expérience spirituelle unique')
            },
            "Voyage Organise": {
                icon: "✈️",
                title: t('categories.organizedTrip', 'Voyage Organisé'),
                color: "#3498db",
                description: t('categories.organizedDescription', 'Aventure planifiée pour votre confort')
            },
            "Location_Vacances": {
                icon: "🏠",
                title: t('categories.vacationRental', 'Location de Vacances'),
                color: "#e74c3c",
                description: t('categories.rentalDescription', 'Votre maison loin de chez vous')
            },
            "voyage affaires": {
                icon: "💼",
                title: t('categories.businessTrip', 'Voyage d\'Affaires'),
                color: "#2c3e50",
                description: t('categories.businessDescription', 'Solutions professionnelles pour vos déplacements')
            }
        };

        return categories[post.subCategory] || {
            icon: "🌟",
            title: post.subCategory || t('categories.general', 'Offre Exceptionnelle'),
            color: "#9b59b6",
            description: t('categories.generalDescription', 'Expérience de voyage unique')
        };
    };

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
                display: 'inline-block',
                wordBreak: 'break-word',
                maxWidth: '100%'
            }}>
                {children}
            </span>
        );
    };

    // 🗓️ Formateo de fechas mejorado
    const formatBeautifulDate = (dateString) => {
        if (!dateString) return '';

        const date = new Date(dateString);
        return date.toLocaleDateString(isRTL ? 'ar-EG' : 'fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    // 🆕 COMPONENTES REUTILIZABLES PARA CAMPOS
    const FieldDisplay = ({ label, value, icon, type = "text" }) => {
        if (!value && type !== "boolean") return null;

        return (
            <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                marginBottom: '8px',
                flexDirection: isRTL ? 'row-reverse' : 'row',
                width: '100%',
                wordBreak: 'break-word'
            }}>
                <span style={{
                    fontWeight: '600',
                    color: '#4a5568',
                    minWidth: isRTL ? 'auto' : '120px',
                    maxWidth: isRTL ? '140px' : '140px',
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    flexShrink: 0,
                    textAlign: isRTL ? 'right' : 'left'
                }}>
                    {isRTL ? <>{label} {icon}</> : <>{icon} {label}</>}:
                </span>
                <span style={{ 
                    fontSize: '13px', 
                    color: '#2d3748',
                    flex: 1,
                    textAlign: isRTL ? 'right' : 'left',
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word'
                }}>
                    {type === "boolean" ? (
                        value ? "✅ Oui" : "❌ Non"
                    ) : (
                        <Highlight>{value}</Highlight>
                    )}
                </span>
            </div>
        );
    };

    const PriceDisplay = ({ label, value, currency = "DZD" }) => {
        if (!value) return null;

        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                backgroundColor: 'white',
                borderRadius: '6px',
                border: '1px solid #10b981',
                marginBottom: '8px',
                flexDirection: isRTL ? 'row-reverse' : 'row',
                width: '100%',
                boxSizing: 'border-box'
            }}>
                <span style={{ 
                    fontWeight: '600', 
                    color: '#374151', 
                    fontSize: '13px',
                    textAlign: isRTL ? 'right' : 'left'
                }}>
                    {isRTL ? <>{label} 💰</> : <>💰 {label}</>}:
                </span>
                <div style={{ textAlign: isRTL ? 'left' : 'right' }}>
                    <div style={{ 
                        fontSize: '15px', 
                        fontWeight: 'bold', 
                        color: styles.successColor,
                        whiteSpace: 'nowrap'
                    }}>
                        {value} {currency}
                    </div>
                </div>
            </div>
        );
    };

    const ArrayDisplay = ({ label, items, icon }) => {
        if (!items || items.length === 0) return null;

        return (
            <div style={{ marginBottom: '12px', width: '100%' }}>
                <div style={{
                    fontWeight: '600',
                    color: '#4a5568',
                    marginBottom: '8px',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    flexDirection: isRTL ? 'row-reverse' : 'row'
                }}>
                    {isRTL ? <>{label} {icon}</> : <>{icon} {label}</>}:
                </div>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px',
                    justifyContent: isRTL ? 'flex-end' : 'flex-start'
                }}>
                    {items.map((item, index) => (
                        <span key={index} style={{
                            backgroundColor: '#e3f2fd',
                            color: styles.primaryColor,
                            padding: '6px 10px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: '500',
                            wordBreak: 'break-word',
                            textAlign: isRTL ? 'right' : 'left'
                        }}>
                            {isRTL ? <>{item} ✅</> : <>✅ {item}</>}
                        </span>
                    ))}
                </div>
            </div>
        );
    };

    // 🔹 PARTE 1: ANUNCIO PRINCIPAL MEJORADO
    const generateMainAnnouncement = () => {
        const categoryInfo = getCategoryInfo();

        return (
            <div style={{
                background: styles.mainGradient,
                color: 'white',
                padding: '16px',
                borderRadius: '10px',
                marginBottom: '12px',
                textAlign: 'center',
                width: '100%',
                boxSizing: 'border-box'
            }}>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>
                    {categoryInfo.icon}
                </div>
                <h1 style={{
                    margin: '0 0 6px 0',
                    fontSize: '18px',
                    fontWeight: '700',
                    wordBreak: 'break-word'
                }}>
                    {t('excitingNews', '🎉 Nouvelle Offre Exclusive !')}
                </h1>
                <p style={{
                    fontSize: '14px',
                    opacity: '0.95',
                    lineHeight: '1.5',
                    marginBottom: '12px',
                    padding: '0 8px',
                    wordBreak: 'break-word'
                }}>
                    <strong>{post.category}</strong> {t('proudlyPresents', 'a le plaisir de vous présenter un')}
                    <strong> {categoryInfo.title}</strong> {t('carefullyDesigned', 'soigneusement conçu pour votre plus grand plaisir.')}
                </p>

                {/* Información clave destacada */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '12px',
                    flexWrap: 'wrap',
                    marginTop: '12px'
                }}>
                    {post.datedepar && (
                        <div style={{ textAlign: 'center', minWidth: '140px', flex: '1 1 auto', maxWidth: '200px' }}>
                            <div style={{ fontSize: '11px', opacity: '0.85' }}>
                                {isRTL ? 'المغادرة 🗓️' : '🗓️ Départ'}
                            </div>
                            <div style={{ 
                                fontSize: '12px', 
                                fontWeight: '600',
                                wordBreak: 'break-word',
                                padding: '0 4px'
                            }}>
                                {formatBeautifulDate(post.datedepar)}
                            </div>
                            {post.horadudepar && (
                                <div style={{ fontSize: '11px', opacity: '0.85' }}>
                                    {isRTL ? post.horadudepar : t('at', 'à')} {isRTL ? '' : post.horadudepar}
                                </div>
                            )}
                        </div>
                    )}

                    {post.destinacion && (
                        <div style={{ 
                            textAlign: 'center',
                            minWidth: '120px',
                            flex: '1 1 auto',
                            maxWidth: '200px'
                        }}>
                            <div style={{ fontSize: '11px', opacity: '0.85' }}>
                                {isRTL ? 'الوجهة ✈️' : '✈️ Destination'}
                            </div>
                            <div style={{
                                fontSize: '12px',
                                fontWeight: '600',
                                wordBreak: 'break-word',
                                padding: '0 4px'
                            }}>
                                {post.destinacion}
                            </div>
                        </div>
                    )}

                    {post.dureeSejour && (
                        <div style={{ textAlign: 'center', minWidth: '100px', flex: '1 1 auto', maxWidth: '150px' }}>
                            <div style={{ fontSize: '11px', opacity: '0.85' }}>
                                {isRTL ? 'المدة ⏱️' : '⏱️ Durée'}
                            </div>
                            <div style={{ fontSize: '12px', fontWeight: '600' }}>
                                {post.dureeSejour}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // 🔹 PARTE 2: DESCRIPCIÓN CON "LEER MÁS"
    const generateDescriptionSection = () => {
        if (!post.description) return null;

        return (
            <div style={{
                backgroundColor: '#f8fafc',
                padding: '14px',
                borderRadius: '10px',
                marginBottom: '12px',
                border: '1px solid #e2e8f0',
                width: '100%',
                boxSizing: 'border-box'
            }}>
                <h2 style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginBottom: '10px',
                    color: styles.primaryColor,
                    fontSize: '16px',
                    flexDirection: isRTL ? 'row-reverse' : 'row'
                }}>
                    {isRTL ? 'وصف الرحلة 📝' : '📝 Description du Voyage'}
                </h2>
                <div style={{
                    fontSize: '13px',
                    color: '#4b5563',
                    lineHeight: '1.6',
                    textAlign: isRTL ? 'right' : 'left',
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word'
                }}>
                    <span>
                        {
                            post.description.length < 120
                                ? post.description
                                : readMore ? post.description + ' ' : post.description.slice(0, 120) + '...'
                        }
                    </span>
                    {post.description.length > 120 && (
                        <span
                            style={{
                                color: '#3b82f6',
                                cursor: 'pointer',
                                fontWeight: '500',
                                marginLeft: isRTL ? '0' : '6px',
                                marginRight: isRTL ? '6px' : '0',
                                fontSize: '12px',
                                display: 'inline-block',
                                marginTop: '4px'
                            }}
                            onClick={() => setReadMore(!readMore)}
                        >
                            {readMore ?
                                (isRTL ? 'عرض أقل ▲' : '▲ Voir moins') :
                                (isRTL ? 'قراءة المزيد ▼' : '▼ Lire la suite')}
                        </span>
                    )}
                </div>
            </div>
        );
    };

    // 🔹 PARTE 3: INFORMACIÓN BÁSICA DEL VIAJE
    const generateBasicInfoSection = () => {
        return (
            <div style={{
                backgroundColor: '#f0f9ff',
                padding: '14px',
                borderRadius: '10px',
                marginBottom: '12px',
                border: '1px solid #bae6fd',
                width: '100%',
                boxSizing: 'border-box'
            }}>
                <h2 style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginBottom: '10px',
                    color: styles.primaryColor,
                    fontSize: '16px',
                    flexDirection: isRTL ? 'row-reverse' : 'row'
                }}>
                    {isRTL ? 'معلومات الرحلة 🎯' : '🎯 Informations du Voyage'}
                </h2>
                <FieldDisplay
                    label={isRTL ? "العنوان" : "Titre"}
                    value={post.title}
                    icon="🏷️"
                />
                <FieldDisplay
                    label={isRTL ? "الفئة" : "Catégorie"}
                    value={post.subCategory}
                    icon="📂"
                />
                <FieldDisplay
                    label={isRTL ? "الوجهة" : "Destination"}
                    value={post.destinacion}
                    icon="📍"
                />
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '8px',
                    marginTop: '10px'
                }}>
                    <FieldDisplay
                        label={isRTL ? "تاريخ المغادرة" : "Date Départ"}
                        value={formatBeautifulDate(post.datedepar)}
                        icon="📅"
                    />
                    <FieldDisplay
                        label={isRTL ? "وقت المغادرة" : "Heure Départ"}
                        value={post.horadudepar}
                        icon="⏰"
                    />
                    <FieldDisplay
                        label={isRTL ? "تاريخ العودة" : "Date Retour"}
                        value={formatBeautifulDate(post.dateretour)}
                        icon="📅"
                    />
                    <FieldDisplay
                        label={isRTL ? "مدة الإقامة" : "Durée Séjour"}
                        value={post.dureeSejour}
                        icon="⏱️"
                    />
                </div>
            </div>
        );
    };

    // 🔹 PARTE 4: INFORMACIÓN DE UBICACIÓN
    const generateLocationSection = () => {
        if (!post.wilaya && !post.commune && !post.vile) return null;

        return (
            <div style={{
                backgroundColor: '#f0fdf4',
                padding: '14px',
                borderRadius: '10px',
                marginBottom: '12px',
                border: '1px solid #dcfce7',
                width: '100%',
                boxSizing: 'border-box'
            }}>
                <h2 style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginBottom: '10px',
                    color: styles.successColor,
                    fontSize: '16px',
                    flexDirection: isRTL ? 'row-reverse' : 'row'
                }}>
                    {isRTL ? 'الموقع 🗺️' : '🗺️ Localisation'}
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '8px'
                }}>
                    <FieldDisplay
                        label={isRTL ? "الولاية" : "Wilaya"}
                        value={post.wilaya}
                        icon="🏛️"
                    />
                    <FieldDisplay
                        label={isRTL ? "البلدية" : "Commune"}
                        value={post.commune}
                        icon="🏘️"
                    />
                    <FieldDisplay
                        label={isRTL ? "المدينة" : "Ville"}
                        value={post.vile}
                        icon="🏙️"
                    />
                    <FieldDisplay
                        label={isRTL ? "الاتصال" : "Contact"}
                        value={post.contacto}
                        icon="📞"
                    />
                </div>
            </div>
        );
    };

    // 🔹 PARTE 5: INFORMACIÓN DE PRECIOS
    const generatePricingSection = () => {
        const hasPricing = post.precioBase || post.price || post.prixAdulte || post.prixEnfant ||
            post.prixBebe || post.tarifaNinos || post.tarifaBebes;

        if (!hasPricing) return null;

        return (
            <div style={{
                backgroundColor: '#fff7ed',
                padding: '14px',
                borderRadius: '10px',
                marginBottom: '12px',
                border: '1px solid #fed7aa',
                width: '100%',
                boxSizing: 'border-box'
            }}>
                <h2 style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginBottom: '10px',
                    color: styles.warningColor,
                    fontSize: '16px',
                    flexDirection: isRTL ? 'row-reverse' : 'row'
                }}>
                    {isRTL ? 'التسعير 💰' : '💰 Tarification'}
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '8px'
                }}>
                    <PriceDisplay
                        label={isRTL ? "السعر الأساسي" : "Prix de Base"}
                        value={post.precioBase || post.price}
                    />
                    <PriceDisplay
                        label={isRTL ? "سعر البالغ" : "Prix Adulte"}
                        value={post.prixAdulte}
                    />
                    <PriceDisplay
                        label={isRTL ? "سعر الأطفال" : "Tarif Enfants"}
                        value={post.tarifaNinos || post.prixEnfant}
                    />
                    <PriceDisplay
                        label={isRTL ? "سعر الرضع" : "Tarif Bébés"}
                        value={post.tarifaBebes || post.prixBebe}
                    />
                </div>

                {post.tipoPrecio && (
                    <div style={{ marginTop: '8px' }}>
                        <FieldDisplay 
                            label={isRTL ? "نوع السعر" : "Type de Prix"} 
                            value={post.tipoPrecio}
                            icon="🏷️"
                        />
                    </div>
                )}

                {/* Descuentos y ofertas */}
                <div style={{ marginTop: '12px' }}>
                    <div style={{
                        fontSize: '13px',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '8px',
                        textAlign: isRTL ? 'right' : 'left'
                    }}>
                        {isRTL ? 'عروض خاصة 🎁' : '🎁 Offres Spéciales'}
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px'
                    }}>
                        <FieldDisplay
                            label={isRTL ? "خصم جماعي" : "Remise Groupe"}
                            value={post.descuentoGrupo}
                            type="boolean"
                            icon="👥"
                        />
                        <FieldDisplay
                            label={isRTL ? "عرض خاص" : "Offre Spéciale"}
                            value={post.ofertaEspecial}
                            type="boolean"
                            icon="⭐"
                        />
                        <FieldDisplay
                            label={isRTL ? "موسم منخفض" : "Basse Saison"}
                            value={post.descuentoTemporadaBaja}
                            type="boolean"
                            icon="🌸"
                        />
                        <FieldDisplay
                            label={isRTL ? "حجز مسبق" : "Réservation Anticipée"}
                            value={post.descuentoAnticipacion}
                            type="boolean"
                            icon="🎯"
                        />
                    </div>
                </div>
            </div>
        );
    };

    // 🔹 PARTE 6: INFORMACIÓN DEL HOTEL
    const generateHotelSection = () => {
        const hasHotelData = post.nombreHotel || post.ciudadHotel || post.zonaRegion || post.direccionHotel;

        if (!hasHotelData) return null;

        return (
            <div style={{
                backgroundColor: '#faf5ff',
                padding: '14px',
                borderRadius: '10px',
                marginBottom: '12px',
                border: '1px solid #e9d5ff',
                width: '100%',
                boxSizing: 'border-box'
            }}>
                <h2 style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginBottom: '10px',
                    color: '#8b5cf6',
                    fontSize: '16px',
                    flexDirection: isRTL ? 'row-reverse' : 'row'
                }}>
                    {isRTL ? 'معلومات الإقامة 🏨' : '🏨 Informations d\'Hébergement'}
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '8px'
                }}>
                    <FieldDisplay
                        label={isRTL ? "اسم الفندق" : "Nom de l'Hôtel"}
                        value={post.nombreHotel}
                        icon="🏨"
                    />
                    <FieldDisplay
                        label={isRTL ? "مدينة الفندق" : "Ville Hôtel"}
                        value={post.ciudadHotel}
                        icon="🏙️"
                    />
                    <FieldDisplay
                        label={isRTL ? "المنطقة/الجهة" : "Zone/Région"}
                        value={post.zonaRegion}
                        icon="📍"
                    />
                    <FieldDisplay
                        label={isRTL ? "عنوان الفندق" : "Adresse Hôtel"}
                        value={post.direccionHotel}
                        icon="📮"
                    />
                </div>
            </div>
        );
    };

    // 🔹 PARTE 7: INFORMACIÓN DE TRANSPORTE
    const generateTransportSection = () => {
        const hasTransportData = post.typeTransport || post.compagnieAerienne || post.classeVol || post.transportTerrestre;

        if (!hasTransportData) return null;

        return (
            <div style={{
                backgroundColor: '#ecfdf5',
                padding: '14px',
                borderRadius: '10px',
                marginBottom: '12px',
                border: '1px solid #a7f3d0',
                width: '100%',
                boxSizing: 'border-box'
            }}>
                <h2 style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginBottom: '10px',
                    color: styles.successColor,
                    fontSize: '16px',
                    flexDirection: isRTL ? 'row-reverse' : 'row'
                }}>
                    {isRTL ? 'معلومات النقل 🚗' : '🚗 Informations de Transport'}
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '8px'
                }}>
                    <FieldDisplay
                        label={isRTL ? "نوع النقل" : "Type Transport"}
                        value={post.typeTransport}
                        icon="🚗"
                    />
                    <FieldDisplay
                        label={isRTL ? "شركة الطيران" : "Compagnie Aérienne"}
                        value={post.compagnieAerienne}
                        icon="✈️"
                    />
                    <FieldDisplay
                        label={isRTL ? "فئة الرحلة" : "Classe Vol"}
                        value={post.classeVol}
                        icon="💺"
                    />
                    <FieldDisplay
                        label={isRTL ? "النقل البري" : "Transport Terrestre"}
                        value={post.transportTerrestre}
                        icon="🚐"
                    />
                </div>
            </div>
        );
    };

    // 🔹 PARTE 8: PROPIEDAD DE VACACIONES
    const generatePropertySection = () => {
        const hasPropertyData = post.tipoPropiedad || post.categoria || post.capacidad ||
            post.habitaciones || post.superficie || post.banos;

        if (!hasPropertyData) return null;

        return (
            <div style={{
                backgroundColor: '#fffbeb',
                padding: '14px',
                borderRadius: '10px',
                marginBottom: '12px',
                border: '1px solid #fde68a',
                width: '100%',
                boxSizing: 'border-box'
            }}>
                <h2 style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginBottom: '10px',
                    color: styles.warningColor,
                    fontSize: '16px',
                    flexDirection: isRTL ? 'row-reverse' : 'row'
                }}>
                    {isRTL ? 'خصائص العقار 🏠' : '🏠 Caractéristiques de la Propriété'}
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '8px'
                }}>
                    <FieldDisplay
                        label={isRTL ? "نوع العقار" : "Type Propriété"}
                        value={post.tipoPropiedad}
                        icon="🏠"
                    />
                    <FieldDisplay
                        label={isRTL ? "الفئة" : "Catégorie"}
                        value={post.categoria}
                        icon="⭐"
                    />
                    <FieldDisplay
                        label={isRTL ? "السعة" : "Capacité"}
                        value={post.capacidad}
                        icon="👥"
                    />
                    <FieldDisplay
                        label={isRTL ? "الغرف" : "Chambres"}
                        value={post.habitaciones}
                        icon="🛏️"
                    />
                    <FieldDisplay
                        label={isRTL ? "المساحة" : "Superficie"}
                        value={post.superficie}
                        icon="📐"
                    />
                    <FieldDisplay
                        label={isRTL ? "الحمامات" : "Salles de Bain"}
                        value={post.banos}
                        icon="🚻"
                    />
                </div>
            </div>
        );
    };

    // 🔹 PARTE 9: SERVICIOS INCLUIDOS
    const generateServicesSection = () => {
        if (!post.servicios || post.servicios.length === 0) return null;

        return (
            <div style={{
                backgroundColor: '#f0f9ff',
                padding: '14px',
                borderRadius: '10px',
                marginBottom: '12px',
                border: '1px solid #bae6fd',
                width: '100%',
                boxSizing: 'border-box'
            }}>
                <ArrayDisplay
                    label={isRTL ? "الخدمات المشمولة" : "Services Inclus"}
                    items={post.servicios}
                    icon="✨"
                />
            </div>
        );
    };

    // 🔹 PARTE 10: CONTACTO Y RESERVA
    const generateContactSection = () => {
        return (
            <div style={{
                background: styles.contactGradient,
                color: 'white',
                padding: '16px',
                borderRadius: '10px',
                textAlign: 'center',
                width: '100%',
                boxSizing: 'border-box'
            }}>
                <h2 style={{
                    margin: '0 0 10px 0',
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    flexWrap: 'wrap'
                }}>
                    {isRTL ? 'جاهز للحجز؟ 📞' : '📞 Prêt à Réserver ?'}
                </h2>

                <p style={{ 
                    marginBottom: '12px', 
                    fontSize: '14px', 
                    opacity: '0.95',
                    padding: '0 8px',
                    lineHeight: '1.5',
                    wordBreak: 'break-word'
                }}>
                    {isRTL 
                        ? 'لا تفوت هذه الفرصة الفريدة! اتصل بنا الآن.'
                        : t('contact.dontMiss', 'Ne manquez pas cette opportunité unique ! Contactez-nous dès maintenant.')
                    }
                </p>

                {post.contacto && (
                    <div style={{
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        display: 'inline-block',
                        marginBottom: '12px',
                        maxWidth: '100%',
                        wordBreak: 'break-word'
                    }}>
                        <div style={{ 
                            fontSize: '11px', 
                            opacity: '0.85', 
                            marginBottom: '4px'
                        }}>
                            {isRTL ? 'اتصل بنا 📞' : '📞 Contactez-nous'}
                        </div>
                        <div style={{ 
                            fontSize: '16px', 
                            fontWeight: 'bold',
                            direction: 'ltr'
                        }}>
                            {post.contacto}
                        </div>
                    </div>
                )}

                <p style={{ 
                    fontSize: '13px', 
                    opacity: '0.9', 
                    margin: '0',
                    wordBreak: 'break-word'
                }}>
                    {isRTL 
                        ? '🎉 احجز بثقة تامة!'
                        : t('contact.guarantee', 'Réservez en toute confiance !') + ' 🎉'
                    }
                </p>
            </div>
        );
    };

    // 🎯 RENDER PRINCIPAL MEJORADO Y RESPONSIVE
    return (
        <div style={{
            direction: isRTL ? 'rtl' : 'ltr',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            lineHeight: '1.5',
            color: '#2d3748',
            maxWidth: '800px',
            margin: '0 auto',
            padding: '12px',
            width: '100%',
            boxSizing: 'border-box',
            overflowX: 'hidden'
        }}>
            {generateMainAnnouncement()}
            {generateDescriptionSection()}
            {generateBasicInfoSection()}
            {generateLocationSection()}
            {generatePricingSection()}
            {generateHotelSection()}
            {generateTransportSection()}
            {generatePropertySection()}
            {generateServicesSection()}
            {generateContactSection()}
        </div>
    );
};

export default DescriptionPost;