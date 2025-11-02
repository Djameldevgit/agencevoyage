import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FaInfoCircle, FaComments, FaHeart, FaHotel, FaPlane, FaBus, FaHome, FaMapMarkerAlt, FaConciergeBell, FaMoneyBillWave } from 'react-icons/fa';

const DescriptionPost = ({ post, readMore, setReadMore }) => {
    const { t, i18n } = useTranslation('descripcion');
    const isRTL = i18n.language === 'ar';

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
                    type: "pèlerinage",
                    color: "#8B4513"
                };
            case "Voyage Organise":
                return {
                    icon: "✈️",
                    type: "voyage organisé",
                    color: "#3498db"
                };
            case "Location_Vacances":
                return {
                    icon: "🏠",
                    type: "location de vacances",
                    color: "#e74c3c"
                };
            default:
                return {
                    icon: "🌟",
                    type: "voyage",
                    color: "#9b59b6"
                };
        }
    };

    const categoryInfo = getCategoryInfo();

    // Función para generar el anuncio narrativo con todos los nuevos campos
    const generateTravelStory = () => {
        const paragraphs = [];
        
        // 🔹 PÁRRAFO 1: Saludo y presentación según categoría
        let paragraph1 = `Cher(e)s voyageurs, notre agence a le plaisir de vous présenter un ${categoryInfo.type} ${categoryInfo.icon} qui, nous en sommes sûrs, saura ravir vos cœurs d'aventuriers. `;

        // Destino según categoría
        if (post.subCategory === "hadj_Omra" && post.destinacionhadj) {
            paragraph1 += `Nous vous emmenons vivre une expérience spirituelle inoubliable à ${post.destinacionhadj} `;
        } else if (post.subCategory === "Voyage Organise" && post.destinacionvoyage) {
            paragraph1 += `Nous vous emmenons découvrir les merveilles de ${post.destinacionvoyage} `;
        } else if (post.subCategory === "Location_Vacances" && post.ciudad) {
            paragraph1 += `Nous vous proposons une location de vacances exceptionnelle à ${post.ciudad} `;
        } else if (post.destinacionvoyage1) {
            paragraph1 += `Nous vous emmenons découvrir les merveilles de ${post.destinacionvoyage1} `;
        }

        // Fechas
        if (post.datedepar) {
            paragraph1 += `à partir du ${formatDate(post.datedepar)} `;
        }

        if (post.horadudepar) {
            paragraph1 += `avec un départ prévu à ${post.horadudepar}. `;
        }

        // Ubicación de la agencia
        if (post.commune && post.wilaya) {
            paragraph1 += `Notre agence située à ${post.commune}, dans la wilaya de ${post.wilaya}, sera votre point de départ pour cette belle aventure.`;
        }

        paragraphs.push(paragraph1);

        // 🔹 PÁRRAFO 2: Información específica por categoría
        let paragraph2 = '';

        // HAJJ & OMRA
        if (post.subCategory === "hadj_Omra") {
            if (post.categoriaHotelMeca) {
                paragraph2 += `Vous serez hébergé dans un hôtel de catégorie ${post.categoriaHotelMeca} à La Mecque `;
            }
            if (post.typeTransport) {
                paragraph2 += `et voyagerez en ${post.typeTransport} `;
            }
            if (post.compagnieAerienne) {
                paragraph2 += `avec la compagnie ${post.compagnieAerienne}. `;
            }
        }
        // VOYAGE ORGANISE
        else if (post.subCategory === "Voyage Organise") {
            if (post.categoriaAlojamiento) {
                paragraph2 += `Votre hébergement sera dans des établissements de catégorie ${post.categoriaAlojamiento} `;
            }
            if (post.tipoHabitacion) {
                paragraph2 += `avec des chambres de type ${post.tipoHabitacion} `;
            }
            if (post.regimenComidas) {
                paragraph2 += `et un régime ${post.regimenComidas}. `;
            }
            if (post.modeTransport) {
                paragraph2 += `Le transport sera assuré en ${post.modeTransport} `;
            }
            if (post.classeTransport) {
                paragraph2 += `(classe ${post.classeTransport}) `;
            }
        }
        // LOCATION VACANCES
        else if (post.subCategory === "Location_Vacances") {
            if (post.tipoPropiedad) {
                paragraph2 += `Cette ${post.tipoPropiedad.toLowerCase()} `;
            }
            if (post.capacidad) {
                paragraph2 += `peut accueillir jusqu'à ${post.capacidad} personnes `;
            }
            if (post.habitaciones) {
                paragraph2 += `dans ${post.habitaciones} chambres `;
            }
            if (post.superficie) {
                paragraph2 += `sur une superficie de ${post.superficie}. `;
            }
            if (post.transportInclus) {
                paragraph2 += `Le transport ${post.transportInclus} est inclus. `;
            }
        }

        // Duración del viaje
        if (post.dureeSejour) {
            paragraph2 += `Ce séjour de ${post.dureeSejour} vous promet des moments inoubliables.`;
        } else if (post.duracionviaje) {
            paragraph2 += `Cette aventure de ${post.duracionviaje} sera riche en découvertes.`;
        }

        if (paragraph2) paragraphs.push(paragraph2);

        // 🔹 PÁRRAFO 3: Alojamiento detallado
        let paragraph3 = '';
        
        // Información del hotel/alojamiento según categoría
        if (post.subCategory === "Voyage Organise" && post.nombreHotel) {
            paragraph3 += `Vous séjournerez à l'hôtel ${post.nombreHotel} `;
            if (post.ciudadHotel) {
                paragraph3 += `situé à ${post.ciudadHotel} `;
            }
            if (post.direccionHotel) {
                paragraph3 += `(${post.direccionHotel}) `;
            }
            paragraph3 += `qui allie confort et authenticité. `;
        } 
        else if (post.subCategory === "Location_Vacances" && post.nombrePropiedad) {
            paragraph3 += `La propriété "${post.nombrePropiedad}" `;
            if (post.direccionCompleta) {
                paragraph3 += `située à ${post.direccionCompleta} `;
            }
            if (post.zonaBarrio) {
                paragraph3 += `dans le quartier ${post.zonaBarrio} `;
            }
            paragraph3 += `vous offre un cadre exceptionnel. `;
            if (post.descripcionUbicacion) {
                paragraph3 += `${post.descripcionUbicacion} `;
            }
        }
        else if (post.nombredelhotel) {
            paragraph3 += `Vous serez chaleureusement accueilli à l'hôtel ${post.nombredelhotel} `;
            if (post.estrellas) {
                paragraph3 += `, un établissement ${post.estrellas}-étoiles `;
            }
            if (post.adresshotel) {
                paragraph3 += `situé à ${post.adresshotel} `;
            }
            paragraph3 += `qui allie confort et authenticité. `;
        }

        // Servicios del hotel
        if (post.serviciosdelhotel) {
            paragraph3 += `Cet établissement vous propose ${post.serviciosdelhotel.toLowerCase()}. `;
        }

        // Servicios incluidos
        if (post.incluidoenelprecio) {
            paragraph3 += `Sachez que ${post.incluidoenelprecio.toLowerCase()} sont inclus dans votre forfait.`;
        }

        if (paragraph3) paragraphs.push(paragraph3);

        // 🔹 PÁRRAFO 4: Servicios y especificaciones
        let paragraph4 = '';
        
        // Servicios array (nuevo campo unificado)
        if (post.servicios && post.servicios.length > 0) {
            paragraph4 += `Pour agrémenter votre séjour, nous mettons à votre disposition : ${post.servicios.join(', ').toLowerCase()}. `;
        }

        // Services Inclus
        if (post.servicesInclus && post.servicesInclus.length > 0) {
            paragraph4 += `Les services inclus sont : ${post.servicesInclus.join(', ').toLowerCase()}. `;
        }

        // Activités
        if (post.activites && post.activites.length > 0) {
            paragraph4 += `Vous pourrez profiter des activités suivantes : ${post.activites.join(', ').toLowerCase()}. `;
        }

        // Especificaciones
        if (post.specifications && post.specifications.length > 0) {
            paragraph4 += `Ce voyage a été spécialement conçu pour vous offrir : ${post.specifications.join(', ').toLowerCase()}. `;
        }

        if (post.tipodehabutaciones && post.tipodehabutaciones.length > 0) {
            paragraph4 += `Plusieurs types de chambres sont disponibles : ${post.tipodehabutaciones.join(', ').toLowerCase()}.`;
        }

        if (paragraph4) paragraphs.push(paragraph4);

        // 🔹 PÁRRAFO 5: Precios y condiciones
        let paragraph5 = '';
        
        // Precios según categoría
        if (post.subCategory === "hadj_Omra" && post.precioBase) {
            paragraph5 += `Pour cette expérience spirituelle unique, nous proposons un tarif de ${post.precioBase} DA `;
            if (post.tipoPrecio) {
                paragraph5 += `par ${post.tipoPrecio} `;
            }
        } else if (post.price) {
            paragraph5 += `Pour cette expérience unique, nous proposons un tarif de ${post.price} DA par personne `;
        }
        
        if (post.prixAdulte) {
            paragraph5 += `(adulte: ${post.prixAdulte} DA `;
        }
        
        if (post.prixEnfant) {
            paragraph5 += `- enfant: ${post.prixEnfant} DA `;
        }
        
        if (post.prixBebe) {
            paragraph5 += `- bébé: ${post.prixBebe} DA). `;
        }

        if (post.tarifnuit) {
            paragraph5 += `Pour les réservations à la nuitée, comptez ${post.tarifnuit}. `;
        }

        // Información de equipamiento para Location Vacances
        if (post.subCategory === "Location_Vacances") {
            const equipments = [];
            
            if (post.wifiGratuit) equipments.push("WiFi gratuit");
            if (post.climatisation) equipments.push("climatisation");
            if (post.piscine) equipments.push("piscine");
            
            if (equipments.length > 0) {
                paragraph5 += `La propriété dispose de : ${equipments.join(', ')}. `;
            }
        }

        if (paragraph5) paragraphs.push(paragraph5);

        // 🔹 PÁRRAFO 6: Contacto y cierre
        let paragraph6 = '';
        if (post.contacto) {
            paragraph6 += `Votre aventure n'attend que vous ! Pour réserver ou pour toute question, notre équipe est disponible au ${post.contacto}. `;
        }

        if (post.hotelWebsite) {
            paragraph6 += `Visitez ${post.hotelWebsite} pour plus de détails. `;
        }

        // Información de publicación
        paragraph6 += `Cette annonce a été publiée le ${formatDate(post.createdAt)} `;

        if (post.views > 0) {
            paragraph6 += `et a déjà intéressé ${post.views} voyageurs. `;
        }

        // Despedida
        paragraph6 += `Toute notre équipe vous souhaite un merveilleux voyage rempli de belles rencontres et de souvenirs précieux. À très bientôt ! ${categoryInfo.icon}`;

        if (paragraph6) paragraphs.push(paragraph6);

        return paragraphs;
    };

    const travelParagraphs = generateTravelStory();

    // Función para renderizar párrafos con estilos
    const renderParagraphs = () => {
        return travelParagraphs.map((paragraph, index) => (
            <p 
                key={index} 
                className="travel-paragraph"
                style={{
                    lineHeight: '1.8',
                    fontSize: '1.1rem',
                    textAlign: isRTL ? 'right' : 'left',
                    color: '#2c3e50',
                    fontFamily: "'Georgia', serif",
                    marginBottom: '1.5rem',
                    textAlign: 'justify'
                }}
            >
                {/* Letra capital en el primer párrafo */}
                {index === 0 ? (
                    <>
                        <span 
                            className="first-letter"
                            style={{ color: categoryInfo.color }}
                        >
                            {paragraph.charAt(0)}
                        </span>
                        {paragraph.slice(1)}
                    </>
                ) : (
                    paragraph
                )}
            </p>
        ));
    };

    // Componente para mostrar información específica de categoría en badges
    const renderCategorySpecificInfo = () => {
        const specificInfo = [];

        // HAJJ & OMRA
        if (post.subCategory === "hadj_Omra") {
            if (post.categoriaHotelMeca) {
                specificInfo.push(`🏨 Catégorie: ${post.categoriaHotelMeca}`);
            }
            if (post.typeTransport) {
                specificInfo.push(`🚗 Transport: ${post.typeTransport}`);
            }
            if (post.compagnieAerienne) {
                specificInfo.push(`✈️ Compagnie: ${post.compagnieAerienne}`);
            }
        }
        // VOYAGE ORGANISE
        else if (post.subCategory === "Voyage Organise") {
            if (post.categoriaAlojamiento) {
                specificInfo.push(`⭐ Catégorie: ${post.categoriaAlojamiento}`);
            }
            if (post.tipoHabitacion) {
                specificInfo.push(`🛏️ Chambre: ${post.tipoHabitacion}`);
            }
            if (post.regimenComidas) {
                specificInfo.push(`🍽️ Repas: ${post.regimenComidas}`);
            }
            if (post.modeTransport) {
                specificInfo.push(`🚌 Transport: ${post.modeTransport}`);
            }
        }
        // LOCATION VACANCES
        else if (post.subCategory === "Location_Vacances") {
            if (post.tipoPropiedad) {
                specificInfo.push(`🏠 Type: ${post.tipoPropiedad}`);
            }
            if (post.capacidad) {
                specificInfo.push(`👥 Capacité: ${post.capacidad} pers`);
            }
            if (post.habitaciones) {
                specificInfo.push(`🛏️ Chambres: ${post.habitaciones}`);
            }
            if (post.superficie) {
                specificInfo.push(`📏 Surface: ${post.superficie}`);
            }
        }

        if (specificInfo.length === 0) return null;

        return (
            <div className="mt-4 pt-3">
                <h6 className="text-muted mb-3 text-center">
                    <FaConciergeBell className="me-2" />
                    Caractéristiques du {categoryInfo.type}
                </h6>
                <div className="d-flex flex-wrap gap-2 justify-content-center">
                    {specificInfo.map((info, index) => (
                        <span 
                            key={index} 
                            className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25"
                            style={{ fontSize: '0.85rem' }}
                        >
                            {info}
                        </span>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <Card className="mb-4 border-light shadow-sm">
            <Card.Header 
                className="text-white"
                style={{ 
                    background: `linear-gradient(135deg, ${categoryInfo.color} 0%, #2c3e50 100%)` 
                }}
            >
                <h5 className="mb-0 d-flex align-items-center">
                    <FaHeart size={18} className="me-2" />
                    {categoryInfo.icon} Notre Belle Invitation au Voyage
                </h5>
            </Card.Header>
            <Card.Body className="bg-light">
                {/* Historia principal del viaje con párrafos */}
                <div className="travel-story-container">
                    {renderParagraphs()}
                </div>

                {/* Información específica de categoría */}
                {renderCategorySpecificInfo()}

                {/* Descripción extendida con toggle si es muy larga */}
                {post.description && post.description.length > 300 && (
                    <div className="mt-4 pt-4 border-top">
                        <div className={isRTL ? 'text-end' : ''}>
                            {readMore ? (
                                <>
                                    <h6 className="fw-bold text-muted mb-3">
                                        <FaComments className="me-2" />
                                        Description Complète
                                    </h6>
                                    <p 
                                        style={{ 
                                            lineHeight: '1.7', 
                                            whiteSpace: 'pre-line',
                                            fontStyle: 'italic',
                                            color: '#555'
                                        }}
                                    >
                                        {post.description}
                                    </p>
                                    <Button 
                                        variant="outline-primary"
                                        onClick={() => setReadMore(false)}
                                        className="mt-2"
                                    >
                                        {t('read_less', 'Lire moins')}
                                    </Button>
                                </>
                            ) : (
                                <Button 
                                    variant="link" 
                                    className="p-0 text-decoration-none d-flex align-items-center"
                                    onClick={() => setReadMore(true)}
                                >
                                    <FaComments className="me-2" />
                                    {t('read_full_description', 'Lire la suite de la description complète...')}
                                </Button>
                            )}
                        </div>
                    </div>
                )}

                {/* Servicios adicionales */}
                {(post.wifi?.length > 0 || post.language?.length > 0 || post.servicios?.length > 0) && (
                    <div className="mt-4 pt-3">
                        <h6 className="text-muted mb-3 text-center">
                            <FaConciergeBell className="me-2" />
                            Services & Équipements
                        </h6>
                        <div className="d-flex flex-wrap gap-2 justify-content-center">
                            {post.wifi?.map((item, index) => (
                                <span 
                                    key={index} 
                                    className="badge bg-info bg-opacity-10 text-info border border-info border-opacity-25"
                                >
                                    📶 {item}
                                </span>
                            ))}
                            {post.language?.map((item, index) => (
                                <span 
                                    key={index} 
                                    className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25"
                                >
                                    🗣️ {item}
                                </span>
                            ))}
                            {post.servicios?.slice(0, 6).map((item, index) => (
                                <span 
                                    key={index} 
                                    className="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25"
                                >
                                    ⚡ {item}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </Card.Body>

            <style jsx>{`
                .travel-story-container {
                    background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
                    border-radius: 15px;
                    padding: 2rem;
                    position: relative;
                }
                
                .travel-story-container::before {
                    content: "${categoryInfo.icon}";
                    position: absolute;
                    top: -15px;
                    left: -15px;
                    font-size: 2rem;
                    opacity: 0.1;
                }

                .travel-paragraph {
                    text-indent: 1.5em;
                }

                .first-letter {
                    font-size: 2.5rem;
                    float: left;
                    line-height: 1;
                    margin-right: 8px;
                    font-weight: bold;
                    margin-top: 0.2rem;
                }
                
                /* Mejorar el espaciado entre párrafos */
                .travel-paragraph + .travel-paragraph {
                    margin-top: 1rem;
                }
            `}</style>
        </Card>
    );
};

export default DescriptionPost;