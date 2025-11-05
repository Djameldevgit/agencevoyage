import React, { useState, useEffect } from "react";
import { Form, Card, Badge } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Select from 'react-select';

const ServicesVoyageOrganise = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation(["categories"]);
  const isRTL = i18n.language === 'ar' || i18n.language === 'ara';
  
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);

  // SERVICIOS COMPLETOS PARA VOYAGE ORGANISÉ ORGANIZADOS POR CATEGORÍAS
  const serviciosCompletos = [
    // ✈️ TRANSPORT ET VOLS
    {
      category: "transport",
      label: "✈️ " + t("services.categoria_transport_vo", "Transport et Vols"),
      servicios: [
        { 
          id: "vol_international",
          label: "🛫 " + t("services.vol_international", "Vol international"),
          description: t("services.volInternationalDesc", "Billet d'avion aller-retour inclus")
        },
        { 
          id: "vol_domestique",
          label: "🛬 " + t("services.vol_domestique", "Vol domestique"),
          description: t("services.volDomestiqueDesc", "Vols intérieurs si nécessaire")
        },
        { 
          id: "transfert_aeroport_vo",
          label: "🚐 " + t("services.transfert_aeroport_vo", "Transfert aéroport"),
          description: t("services.transfertAeroportVoDesc", "Accueil et transfert aéroport-hôtel")
        },
        { 
          id: "bus_touristique",
          label: "🚌 " + t("services.bus_touristique", "Bus touristique climatisé"),
          description: t("services.busTouristiqueDesc", "Transport en bus confortable")
        },
        { 
          id: "minibus_prive",
          label: "🚐 " + t("services.minibus_prive", "Minibus privé"),
          description: t("services.minibusPriveDesc", "Transport en petit groupe")
        },
        { 
          id: "train_voyage",
          label: "🚄 " + t("services.train_voyage", "Voyage en train"),
          description: t("services.trainVoyageDesc", "Trajets en train inclus")
        }
      ]
    },

    // 🏨 HÉBERGEMENT ET HÔTELS
    {
      category: "hebergement",
      label: "🏨 " + t("services.categoria_hebergement_vo", "Hébergement et Hôtels"),
      servicios: [
        { 
          id: "hotel_3_etoiles_vo",
          label: "⭐ " + t("services.hotel_3_etoiles_vo", "Hôtel 3 étoiles"),
          description: t("services.hotel3EtoilesVoDesc", "Confort standard avec services")
        },
        { 
          id: "hotel_4_etoiles_vo",
          label: "⭐⭐ " + t("services.hotel_4_etoiles_vo", "Hôtel 4 étoiles"),
          description: t("services.hotel4EtoilesVoDesc", "Confort supérieur qualité")
        },
        { 
          id: "hotel_5_etoiles_vo",
          label: "⭐⭐⭐ " + t("services.hotel_5_etoiles_vo", "Hôtel 5 étoiles luxe"),
          description: t("services.hotel5EtoilesVoDesc", "Hôtels de luxe premium")
        },
        { 
          id: "chambre_double_vo",
          label: "🛌 " + t("services.chambre_double_vo", "Chambre double"),
          description: t("services.chambreDoubleVoDesc", "Chambre pour 2 personnes")
        },
        { 
          id: "chambre_single_vo",
          label: "👤 " + t("services.chambre_single_vo", "Chambre individuelle"),
          description: t("services.chambreSingleVoDesc", "Chambre single supplément")
        },
        { 
          id: "suite_familiale_vo",
          label: "👨‍👩‍👧‍👦 " + t("services.suite_familiale_vo", "Suite familiale"),
          description: t("services.suiteFamilialeVoDesc", "Suite pour familles")
        },
        { 
          id: "vue_mer_vo",
          label: "🌅 " + t("services.vue_mer_vo", "Chambre vue mer"),
          description: t("services.vueMerVoDesc", "Chambre avec vue sur mer")
        },
        { 
          id: "vue_montagne_vo",
          label: "🏔️ " + t("services.vue_montagne_vo", "Chambre vue montagne"),
          description: t("services.vueMontagneVoDesc", "Chambre avec vue montagne")
        }
      ]
    },

    // 🍽️ RESTAURATION ET REPAS
    {
      category: "restauration",
      label: "🍽️ " + t("services.categoria_restauration_vo", "Restauration et Repas"),
      servicios: [
        { 
          id: "petit_dejeuner_vo",
          label: "☕ " + t("services.petit_dejeuner_vo", "Petit déjeuner buffet"),
          description: t("services.petitDejeunerVoDesc", "Petit déjeuner inclus quotidien")
        },
        { 
          id: "demi_pension_vo",
          label: "🍲 " + t("services.demi_pension_vo", "Demi-pension"),
          description: t("services.demiPensionVoDesc", "Petit déjeuner + déjeuner OU dîner")
        },
        { 
          id: "pension_complete_vo",
          label: "🍽️ " + t("services.pension_complete_vo", "Pension complète"),
          description: t("services.pensionCompleteVoDesc", "Tous les repas inclus")
        },
        { 
          id: "repas_speciaux_vo",
          label: "🎭 " + t("services.repas_speciaux_vo", "Repas spéciaux inclus"),
          description: t("services.repasSpeciauxVoDesc", "Dîners spéciaux et spectacles")
        },
        { 
          id: "buffet_local",
          label: "🥘 " + t("services.buffet_local", "Buffet cuisine locale"),
          description: t("services.buffetLocalDesc", "Découverte gastronomique locale")
        },
        { 
          id: "boissons_incluses",
          label: "🥤 " + t("services.boissons_incluses", "Boissons incluses"),
          description: t("services.boissonsInclusesDesc", "Boissons aux repas")
        }
      ]
    },

    // 🎯 VISITES ET EXCURSIONS
    {
      category: "visites",
      label: "🎯 " + t("services.categoria_visites", "Visites et Excursions"),
      servicios: [
        { 
          id: "guide_accompagnateur",
          label: "🗣️ " + t("services.guide_accompagnateur", "Guide accompagnateur"),
          description: t("services.guideAccompagnateurDesc", "Guide francophone expert")
        },
        { 
          id: "visites_guidees",
          label: "🏛️ " + t("services.visites_guidees", "Visites guidées incluses"),
          description: t("services.visitesGuideesDesc", "Visites sites avec guide local")
        },
        { 
          id: "entrees_monuments",
          label: "🎫 " + t("services.entrees_monuments", "Entrées monuments incluses"),
          description: t("services.entreesMonumentsDesc", "Billets sites touristiques")
        },
        { 
          id: "excursions_optionnelles",
          label: "🚗 " + t("services.excursions_optionnelles", "Excursions optionnelles"),
          description: t("services.excursionsOptionnellesDesc", "Activités supplémentaires")
        },
        { 
          id: "circuit_culturel",
          label: "📚 " + t("services.circuit_culturel", "Circuit culturel"),
          description: t("services.circuitCulturelDesc", "Visites sites historiques")
        },
        { 
          id: "decouverte_nature",
          label: "🌿 " + t("services.decouverte_nature", "Découverte nature"),
          description: t("services.decouverteNatureDesc", "Randonnées et parcs naturels")
        }
      ]
    },

    // 🎉 ACTIVITÉS ET LOISIRS
    {
      category: "activites",
      label: "🎉 " + t("services.categoria_activites", "Activités et Loisirs"),
      servicios: [
        { 
          id: "soiree_traditionnelle",
          label: "💃 " + t("services.soiree_traditionnelle", "Soirée traditionnelle"),
          description: t("services.soireeTraditionnelleDesc", "Spectacle folklore local")
        },
        { 
          id: "croisiere_incluse",
          label: "🚢 " + t("services.croisiere_incluse", "Croisière incluse"),
          description: t("services.croisiereIncluseDesc", "Excursion en bateau")
        },
        { 
          id: "activites_aquatiques",
          label: "🏊 " + t("services.activites_aquatiques", "Activités aquatiques"),
          description: t("services.activitesAquatiquesDesc", "Sports nautiques inclus")
        },
        { 
          id: "randonnees_guidees",
          label: "🥾 " + t("services.randonnees_guidees", "Randonnées guidées"),
          description: t("services.randonneesGuideesDesc", "Randonnées avec guide")
        },
        { 
          id: "shopping_guide",
          label: "🛍️ " + t("services.shopping_guide", "Shopping guidé"),
          description: t("services.shoppingGuideDesc", "Visite marchés et boutiques")
        },
        { 
          id: "temps_libre",
          label: "🕐 " + t("services.temps_libre", "Temps libre programmé"),
          description: t("services.tempsLibreDesc", "Moments libres inclus")
        }
      ]
    },

    // 🏥 SANTÉ ET ASSURANCE
    {
      category: "sante",
      label: "🏥 " + t("services.categoria_sante_vo", "Santé et Assurance"),
      servicios: [
        { 
          id: "assurance_voyage",
          label: "📄 " + t("services.assurance_voyage", "Assurance voyage incluse"),
          description: t("services.assuranceVoyageDesc", "Couverture médicale voyage")
        },
        { 
          id: "assistance_medicale_vo",
          label: "⚕️ " + t("services.assistance_medicale_vo", "Assistance médicale 24h"),
          description: t("services.assistanceMedicaleVoDesc", "Support médical permanent")
        },
        { 
          id: "infirmier_groupe",
          label: "💊 " + t("services.infirmier_groupe", "Infirmier de groupe"),
          description: t("services.infirmierGroupeDesc", "Infirmier accompagnant")
        },
        { 
          id: "kit_premiers_secours",
          label: "🆘 " + t("services.kit_premiers_secours", "Kit premiers secours"),
          description: t("services.kitPremiersSecoursDesc", "Trousse médicale groupe")
        }
      ]
    },

    // 💼 SERVICES PRATIQUES
    {
      category: "pratique",
      label: "💼 " + t("services.categoria_pratique", "Services Pratiques"),
      servicios: [
        { 
          id: "bagages_inclus",
          label: "🧳 " + t("services.bagages_inclus", "Bagages inclus"),
          description: t("services.bagagesInclusDesc", "Franchise bagage avion")
        },
        { 
          id: "porteurs_bagages",
          label: "💪 " + t("services.porteurs_bagages", "Service porteurs"),
          description: t("services.porteursBagagesDesc", "Aide bagages hôtels")
        },
        { 
          id: "cartes_villes",
          label: "🗺️ " + t("services.cartes_villes", "Cartes des villes"),
          description: t("services.cartesVillesDesc", "Plans villes offerts")
        },
        { 
          id: "guide_voyage",
          label: "📘 " + t("services.guide_voyage", "Guide de voyage"),
          description: t("services.guideVoyageDesc", "Guide touristique offert")
        },
        { 
          id: "assistance_bilingue",
          label: "🔊 " + t("services.assistance_bilingue", "Assistance bilingue"),
          description: t("services.assistanceBilingueDesc", "Support français/arabe")
        }
      ]
    },

    // ⭐ SERVICES PREMIUM
    {
      category: "premium",
      label: "⭐ " + t("services.categoria_premium_vo", "Services Premium"),
      servicios: [
        { 
          id: "groupe_reduit_vo",
          label: "👥 " + t("services.groupe_reduit_vo", "Groupe réduit VIP"),
          description: t("services.groupeReduitVoDesc", "Max 15 personnes")
        },
        { 
          id: "hotel_boutique",
          label: "🏰 " + t("services.hotel_boutique", "Hôtel boutique charme"),
          description: t("services.hotelBoutiqueDesc", "Hôtels caractère exclusifs")
        },
        { 
          id: "restaurant_gastronomique_vo",
          label: "🍴 " + t("services.restaurant_gastronomique_vo", "Restaurant gastronomique"),
          description: t("services.restaurantGastronomiqueVoDesc", "Repas haute gastronomie")
        },
        { 
          id: "voiture_privee_vo",
          label: "🚗 " + t("services.voiture_privee_vo", "Voiture privée guide"),
          description: t("services.voiturePriveeVoDesc", "Transport privé avec guide")
        },
        { 
          id: "experiences_exclusives",
          label: "🎭 " + t("services.experiences_exclusives", "Expériences exclusives"),
          description: t("services.experiencesExclusivesDesc", "Activités uniques")
        },
        { 
          id: "concierge_voyage",
          label: "🔑 " + t("services.concierge_voyage", "Concierge voyage"),
          description: t("services.conciergeVoyageDesc", "Service personnalisé")
        }
      ]
    }
  ];

  // Convertir a formato plano para react-select con agrupación
  const opcionesServicios = serviciosCompletos.flatMap(categoria => 
    categoria.servicios.map(servicio => ({
      ...servicio,
      category: categoria.label
    }))
  );

  // Agrupar opciones por categoría para el select
  const groupedOptions = serviciosCompletos.map(categoria => ({
    label: categoria.label,
    options: categoria.servicios.map(servicio => ({
      value: servicio.id,
      label: servicio.label,
      description: servicio.description
    }))
  }));

  // Sincronizar con postData inicial
  useEffect(() => {
    if (postData?.servicios) {
      const serviciosFormateados = opcionesServicios.filter(option => 
        postData.servicios.includes(option.id)
      ).map(servicio => ({
        value: servicio.id,
        label: servicio.label,
        description: servicio.description
      }));
      setServiciosSeleccionados(serviciosFormateados);
    }
  }, [postData?.servicios]);

  const handleChange = (selectedOptions) => {
    const nuevosServicios = selectedOptions || [];
    setServiciosSeleccionados(nuevosServicios);
    
    const valoresServicios = nuevosServicios.map(servicio => servicio.value);
    
    handleChangeInput({ 
      target: { 
        name: "servicios", 
        value: valoresServicios 
      } 
    });
  };

  // Estilos personalizados para react-select con soporte RTL
  const customStyles = {
    control: (base, state) => ({
      ...base,
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '4px',
      boxShadow: 'none',
      textAlign: isRTL ? 'right' : 'left',
      direction: isRTL ? 'rtl' : 'ltr',
      '&:hover': {
        borderColor: '#007bff'
      }
    }),
    menu: (base) => ({
      ...base,
      textAlign: isRTL ? 'right' : 'left',
      direction: isRTL ? 'rtl' : 'ltr'
    }),
    groupHeading: (base) => ({
      ...base,
      fontWeight: 'bold',
      fontSize: '0.9rem',
      backgroundColor: '#f8f9fa',
      padding: '8px 12px',
      borderBottom: '1px solid #dee2e6'
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: '#ff6b35',
      borderRadius: '15px',
      flexDirection: isRTL ? 'row-reverse' : 'row'
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: 'white',
      fontWeight: 'bold',
      padding: isRTL ? '2px 8px 2px 4px' : '2px 4px 2px 8px'
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: 'white',
      borderRadius: isRTL ? '15px 0 0 15px' : '0 15px 15px 0',
      ':hover': {
        backgroundColor: '#e55a2b',
        color: 'white'
      }
    }),
    option: (base, state) => ({
      ...base,
      textAlign: isRTL ? 'right' : 'left',
      direction: isRTL ? 'rtl' : 'ltr',
      backgroundColor: state.isSelected ? '#ff6b35' : state.isFocused ? '#f8f9fa' : 'white',
      color: state.isSelected ? 'white' : '#333'
    })
  };

  // Componente personalizado para mostrar la descripción en las opciones
  const OptionWithDescription = ({ innerRef, innerProps, data, isSelected, isFocused }) => (
    <div
      ref={innerRef}
      {...innerProps}
      style={{
        padding: '8px 12px',
        backgroundColor: isSelected ? '#ff6b35' : isFocused ? '#f8f9fa' : 'white',
        color: isSelected ? 'white' : '#333',
        cursor: 'pointer',
        borderBottom: '1px solid #f0f0f0'
      }}
    >
      <div className="fw-bold" style={{ fontSize: '0.9rem' }}>
        {data.label}
      </div>
      <div 
        style={{ 
          fontSize: '0.75rem', 
          opacity: isSelected ? 0.8 : 0.7,
          lineHeight: '1.3'
        }}
      >
        {data.description}
      </div>
    </div>
  );

  return (
    <Card>
      <Card.Header style={{ direction: isRTL ? "rtl" : "ltr" }}>
        <h5 className="mb-0">
          ✈️ {t("services.servicesVoyageOrganise", "Services Voyage Organisé")}
        </h5>
        <small className="text-muted" style={{ 
          textAlign: isRTL ? "right" : "left",
          fontSize: "0.85rem"
        }}>
          {t("services.servicesDescriptionVoyage", "Sélectionnez les services inclus dans votre circuit")}
        </small>
      </Card.Header>
      <Card.Body>
        <div style={{ direction: isRTL ? "rtl" : "ltr" }}>
          <Form.Group>
            <Form.Label className="fw-bold">
              {t("services.selectServicesVoyage", "Choisissez les services:")}
            </Form.Label>
            
            <Select
              isMulti
              options={groupedOptions}
              value={serviciosSeleccionados}
              onChange={handleChange}
              styles={customStyles}
              components={{ Option: OptionWithDescription }}
              placeholder={t("services.selectPlaceholderVoyage", "Sélectionnez les services désirés...")}
              noOptionsMessage={() => t("services.noOptions", "Aucune option disponible")}
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              isSearchable
            />
            
           
          </Form.Group>

          {/* Vista previa de servicios seleccionados */}
          
        </div>
      </Card.Body>
    </Card>
  );
};

export default ServicesVoyageOrganise;