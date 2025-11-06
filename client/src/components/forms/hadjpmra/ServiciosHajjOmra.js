import React, { useState, useEffect } from "react";
import { Form, Card, Badge } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Select from 'react-select';

const ServicesHadjOmra = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation(["categories"]);
  const isRTL = i18n.language === "ar";
  
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);

  // SERVICIOS COMPLETOS ORGANIZADOS POR CATEGORÍAS
  const serviciosCompletos = [
    // 📋 SERVICIOS ADMINISTRATIVOS Y VISAS
    {
      category: "administrativos",
      label: "📋 " + t("servicess.categoria_administrativos", "Services Administratifs"),
      servicios: [
        { 
          id: "visa_hajj_omra",
          label: "🛂 " + t("servicess.visa_hajj_omra", "Visa Hajj/Omra"),
          description: t("servicess.visaDesc", "Traitement et obtention du visa officiel")
        },
        { 
          id: "permis_sortie",
          label: "📄 " + t("servicess.permis_sortie", "Permis de sortie territoire"),
          description: t("servicess.permisSortieDesc", "Autorisation de sortie du territoire algérien")
        },
        { 
          id: "certificat_vaccination",
          label: "💉 " + t("servicess.certificat_vaccination", "Certificat de vaccination"),
          description: t("servicess.certificatVaccinationDesc", "Vaccinations obligatoires et certificats")
        },
        { 
          id: "autorisation_ministerielle",
          label: "🏛️ " + t("servicess.autorisation_ministerielle", "Autorisation ministérielle"),
          description: t("servicess.autorisationMinisterielleDesc", "Autorisations officielles requises")
        },
        { 
          id: "assistance_documentation",
          label: "📁 " + t("servicess.assistance_documentation", "Assistance documentation complète"),
          description: t("servicess.assistanceDocumentationDesc", "Aide pour tous les documents nécessaires")
        }
      ]
    },

    // 🏨 HÉBERGEMENT ET LOGEMENT
    {
      category: "hebergement",
      label: "🏨 " + t("servicess.categoria_hebergement", "Hébergement et Logement"),
      servicios: [
        { 
          id: "hebergement_haram_meca",
          label: "🕌 " + t("servicess.hebergement_haram_meca", "Hébergement près du Haram à Mecca"),
          description: t("servicess.hebergementHaramMecaDesc", "Hôtels à proximité de la Mosquée Sacrée")
        },
        { 
          id: "hebergement_haram_medina",
          label: "🌙 " + t("servicess.hebergement_haram_medina", "Hébergement près du Haram à Médina"),
          description: t("servicess.hebergementHaramMedinaDesc", "Hôtels près de la Mosquée du Prophète")
        },
        { 
          id: "hotel_3_etoiles",
          label: "⭐ " + t("servicess.hotel_3_etoiles", "Hôtel 3 étoiles"),
          description: t("servicess.hotel3EtoilesDesc", "Confort standard avec services de base")
        },
        { 
          id: "hotel_4_etoiles",
          label: "⭐⭐ " + t("servicess.hotel_4_etoiles", "Hôtel 4 étoiles"),
          description: t("servicess.hotel4EtoilesDesc", "Confort supérieur avec services additionnels")
        },
        { 
          id: "hotel_5_etoiles",
          label: "⭐⭐⭐ " + t("servicess.hotel_5_etoiles", "Hôtel 5 étoiles luxe"),
          description: t("servicess.hotel5EtoilesDesc", "Hôtels de luxe avec services premium")
        },
        { 
          id: "chambre_double",
          label: "🛌 " + t("servicess.chambre_double", "Chambre double"),
          description: t("servicess.chambreDoubleDesc", "Chambre pour 2 personnes")
        },
        { 
          id: "chambre_triple",
          label: "🛌🛌 " + t("servicess.chambre_triple", "Chambre triple"),
          description: t("servicess.chambreTripleDesc", "Chambre pour 3 personnes")
        },
        { 
          id: "chambre_individuelle",
          label: "👤 " + t("servicess.chambre_individuelle", "Chambre individuelle"),
          description: t("servicess.chambreIndividuelleDesc", "Chambre single avec intimité")
        },
        { 
          id: "suite_familiale",
          label: "👨‍👩‍👧‍👦 " + t("servicess.suite_familiale", "Suite familiale"),
          description: t("servicess.suiteFamilialeDesc", "Suite spacieuse pour familles")
        }
      ]
    },

    // 🚗 TRANSPORT ET DÉPLACEMENTS
    {
      category: "transport",
      label: "🚗 " + t("servicess.categoria_transport", "Transport et Déplacements"),
      servicios: [
        { 
          id: "billet_avion_international",
          label: "✈️ " + t("servicess.billet_avion_international", "Billet d'avion international"),
          description: t("servicess.billetAvionDesc", "Vol aller-retour depuis l'Algérie")
        },
        { 
          id: "transfert_aeroport",
          label: "🚐 " + t("servicess.transfert_aeroport", "Transfert aéroport"),
          description: t("servicess.transfertAeroportDesc", "Accueil et transfert depuis les aéroports")
        },
        { 
          id: "bus_privé_meca_medina",
          label: "🚌 " + t("servicess.bus_prive_meca_medina", "Bus privé Mecca-Médina"),
          description: t("servicess.busPriveDesc", "Transport confortable entre les villes saintes")
        },
        { 
          id: "navettes_hotels",
          label: "🚎 " + t("servicess.navettes_hotels", "Navettes régulières hotels-Haram"),
          description: t("servicess.navettesHotelsDesc", "Navettes gratuites vers les mosquées")
        },
        { 
          id: "transport_mina_arafat",
          label: "🗻 " + t("servicess.transport_mina_arafat", "Transport Mina-Arafat-Muzdalifah"),
          description: t("servicess.transportMinaDesc", "Transport pendant les jours du Hajj")
        },
        { 
          id: "voiture_privée",
          label: "🚙 " + t("servicess.voiture_privee", "Voiture privée avec chauffeur"),
          description: t("servicess.voiturePriveeDesc", "Transport personnel et flexible")
        }
      ]
    },

    // 👥 GUIDES ET ACCOMPAGNEMENT SPIRITUEL
    {
      category: "guides",
      label: "👥 " + t("servicess.categoria_guides", "Guides et Accompagnement Spirituel"),
      servicios: [
        { 
          id: "guide_religieux_francophone",
          label: "🕋 " + t("servicess.guide_religieux_francophone", "Guide religieux francophone"),
          description: t("servicess.guideReligieuxDesc", "Guide spécialisé pour les rituels")
        },
        { 
          id: "guide_arabophone",
          label: "📖 " + t("servicess.guide_arabophone", "Guide religieux arabophone"),
          description: t("servicess.guideArabophoneDesc", "Guide pour pèlerins arabophones")
        },
        { 
          id: "cours_preparation_hajj",
          label: "🎓 " + t("servicess.cours_preparation_hajj", "Cours de préparation au Hajj"),
          description: t("servicess.coursPreparationDesc", "Formation avant le départ")
        },
        { 
          id: "cours_preparation_omra",
          label: "📚 " + t("servicess.cours_preparation_omra", "Cours de préparation à l'Omra"),
          description: t("servicess.coursPreparationOmraDesc", "Formation spécifique Omra")
        },
        { 
          id: "assistance_rituels",
          label: "🙏 " + t("servicess.assistance_rituels", "Assistance pendant les rituels"),
          description: t("servicess.assistanceRituelsDesc", "Accompagnement pendant tous les rituels")
        },
        { 
          id: "groupe_reduit",
          label: "👨‍👩‍👧‍👦 " + t("servicess.groupe_reduit", "Groupe réduit (max 20 personnes)"),
          description: t("servicess.groupeReduitDesc", "Attention personnalisée en petit groupe")
        }
      ]
    },

    // 🍽️ RESTAURATION ET NOURRITURE
    {
      category: "restauration",
      label: "🍽️ " + t("servicess.categoria_restauration", "Restauration et Nourriture"),
      servicios: [
        { 
          id: "petit_dejeuner",
          label: "☕ " + t("servicess.petit_dejeuner", "Petit déjeuner inclus"),
          description: t("servicess.petitDejeunerDesc", "Petit déjeuner buffet à l'hôtel")
        },
        { 
          id: "demi_pension",
          label: "🍲 " + t("servicess.demi_pension", "Demi-pension"),
          description: t("servicess.demiPensionDesc", "Petit déjeuner et dîner inclus")
        },
        { 
          id: "pension_complete",
          label: "🍽️ " + t("servicess.pension_complete", "Pension complète"),
          description: t("servicess.pensionCompleteDesc", "Tous les repas inclus")
        },
        { 
          id: "buffet_sahour",
          label: "🌙 " + t("servicess.buffet_sahour", "Buffet Sahour Ramadan"),
          description: t("servicess.buffetSahourDesc", "Repas de Sahour pendant Ramadan")
        },
        { 
          id: "repas_speciaux",
          label: "🥘 " + t("servicess.repas_speciaux", "Repas spéciaux Mina/Arafat"),
          description: t("servicess.repasSpeciauxDesc", "Repas pendant les jours du Hajj")
        },
        { 
          id: "eau_zamzam_illimite",
          label: "💧 " + t("servicess.eau_zamzam_illimite", "Eau Zamzam illimitée"),
          description: t("servicess.eauZamzamDesc", "Distribution d'eau Zamzam gratuite")
        }
      ]
    },

    // 🏥 SANTÉ ET SÉCURITÉ
    {
      category: "sante",
      label: "🏥 " + t("servicess.categoria_sante", "Santé et Sécurité"),
      servicios: [
        { 
          id: "assistance_medicale_24h",
          label: "⚕️ " + t("servicess.assistance_medicale_24h", "Assistance médicale 24h/24"),
          description: t("servicess.assistanceMedicale24hDesc", "Équipe médicale disponible")
        },
        { 
          id: "assurance_medicale",
          label: "🏥 " + t("servicess.assurance_medicale", "Assurance médicale complète"),
          description: t("servicess.assuranceMedicaleDesc", "Couverture santé internationale")
        },
        { 
          id: "infirmier_accompagnant",
          label: "💊 " + t("servicess.infirmier_accompagnant", "Infirmier accompagnant"),
          description: t("servicess.infirmierAccompagnantDesc", "Infirmier dédié au groupe")
        },
        { 
          id: "premier_secours",
          label: "🆘 " + t("servicess.premier_secours", "Kit premiers secours"),
          description: t("servicess.premierSecoursDesc", "Trousse de premiers soins")
        },
        { 
          id: "coordination_securite",
          label: "🛡️ " + t("servicess.coordination_securite", "Coordination sécurité"),
          description: t("servicess.coordinationSecuriteDesc", "Sécurité et organisation foules")
        },
        { 
          id: "localisateur_groupe",
          label: "📍 " + t("servicess.localisateur_groupe", "Système de localisation groupe"),
          description: t("servicess.localisateurGroupeDesc", "Bracelets GPS pour sécurité")
        }
      ]
    },

    // 🎁 SERVICES INCLUS ET KITS
    {
      category: "kits",
      label: "🎁 " + t("servicess.categoria_kits", "Services Inclus et Kits"),
      servicios: [
        { 
          id: "kit_pelegrin_complet",
          label: "🎒 " + t("servicess.kit_pelegrin_complet", "Kit complet du pèlerin"),
          description: t("servicess.kitPelegrinDesc", "Sac, Ihram, guide, accessoires")
        },
        { 
          id: "ihram_coton",
          label: "👕 " + t("servicess.ihram_coton", "Ihram 100% coton"),
          description: t("servicess.ihramCotonDesc", "Vêtement Ihram qualité premium")
        },
        { 
          id: "sac_voyage",
          label: "🧳 " + t("servicess.sac_voyage", "Sac de voyage officiel"),
          description: t("servicess.sacVoyageDesc", "Sac identifié agence")
        },
        { 
          id: "guide_manuel",
          label: "📘 " + t("servicess.guide_manuel", "Guide manuel du pèlerin"),
          description: t("servicess.guideManuelDesc", "Livre explicatif rituels")
        },
        { 
          id: "bouteille_zamzam",
          label: "💧 " + t("servicess.bouteille_zamzam", "Bouteille Zamzam 5L"),
          description: t("servicess.bouteilleZamzamDesc", "Eau Zamzam pour retour")
        },
        { 
          id: "cadeau_souvenir",
          label: "🎁 " + t("servicess.cadeau_souvenir", "Cadeau souvenir"),
          description: t("servicess.cadeauSouvenirDesc", "Souvenir du voyage sacré")
        }
      ]
    },

    // ⭐ SERVICES PREMIUM ET LUXE
    {
      category: "premium",
      label: "⭐ " + t("servicess.categoria_premium", "Services Premium et Luxe"),
      servicios: [
        { 
          id: "accompagnement_vip",
          label: "👑 " + t("servicess.accompagnement_vip", "Accompagnement VIP"),
          description: t("servicess.accompagnementVipDesc", "Service personnalisé haut de gamme")
        },
        { 
          id: "fast_track_aeroport",
          label: "🚀 " + t("servicess.fast_track_aeroport", "Fast Track aéroport"),
          description: t("servicess.fastTrackDesc", "Passage prioritaire aéroports")
        },
        { 
          id: "suite_executive",
          label: "🏰 " + t("servicess.suite_executive", "Suite executive"),
          description: t("servicess.suiteExecutiveDesc", "Suite luxueuse avec services")
        },
        { 
          id: "concierge_personnel",
          label: "🔑 " + t("servicess.concierge_personnel", "Concierge personnel"),
          description: t("servicess.conciergePersonnelDesc", "Assistant dédié 24h/24")
        },
        { 
          id: "restaurant_gastronomique",
          label: "🍴 " + t("servicess.restaurant_gastronomique", "Restaurant gastronomique"),
          description: t("servicess.restaurantGastronomiqueDesc", "Repas dans restaurants premium")
        },
        { 
          id: "transport_berline",
          label: "🚘 " + t("servicess.transport_berline", "Transport berline luxe"),
          description: t("servicess.transportBerlineDesc", "Voiture haut de gamme avec chauffeur")
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
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '4px',
      boxShadow: 'none',
      textAlign: isRTL ? 'right' : 'left',
      direction: isRTL ? 'rtl' : 'ltr',
      backgroundColor: state.isFocused ? '#f7fafc' : '#fff',
      '&:hover': {
        borderColor: '#cbd5e0'
      }
    }),
    menu: (base) => ({
      ...base,
      textAlign: isRTL ? 'right' : 'left',
      direction: isRTL ? 'rtl' : 'ltr',
      border: '1px solid #e2e8f0',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }),
    groupHeading: (base) => ({
      ...base,
      fontWeight: 'bold',
      fontSize: '0.9rem',
      backgroundColor: '#f8fafc',
      color: '#4a5568',
      padding: '8px 12px',
      borderBottom: '1px solid #e2e8f0'
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: '#edf2f7',
      borderRadius: '12px',
      flexDirection: isRTL ? 'row-reverse' : 'row'
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: '#4a5568',
      fontWeight: '600',
      padding: isRTL ? '2px 8px 2px 4px' : '2px 4px 2px 8px'
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: '#718096',
      borderRadius: isRTL ? '12px 0 0 12px' : '0 12px 12px 0',
      ':hover': {
        backgroundColor: '#e2e8f0',
        color: '#4a5568'
      }
    }),
    option: (base, state) => ({
      ...base,
      textAlign: isRTL ? 'right' : 'left',
      direction: isRTL ? 'rtl' : 'ltr',
      backgroundColor: state.isSelected ? '#e2e8f0' : state.isFocused ? '#f7fafc' : 'white',
      color: state.isSelected ? '#2d3748' : '#4a5568',
      ':active': {
        backgroundColor: '#edf2f7'
      }
    }),
    indicatorsContainer: (base) => ({
      ...base,
      color: '#a0aec0'
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: '#a0aec0',
      ':hover': {
        color: '#718096'
      }
    }),
    clearIndicator: (base) => ({
      ...base,
      color: '#a0aec0',
      ':hover': {
        color: '#718096'
      }
    })
  };
  
  // Componente personalizado para mostrar la descripción en las opciones
  const OptionWithDescription = ({ innerRef, innerProps, data, isSelected, isFocused }) => (
    <div
      ref={innerRef}
      {...innerProps}
      style={{
        padding: '10px 12px',
        backgroundColor: isSelected ? '#edf2f7' : isFocused ? '#f7fafc' : 'white',
        color: isSelected ? '#2d3748' : '#4a5568',
        cursor: 'pointer',
        borderBottom: '1px solid #f1f5f9',
        transition: 'background-color 0.2s ease'
      }}
    >
      <div style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '2px' }}>
        {data.label}
      </div>
      <div 
        style={{ 
          fontSize: '0.75rem', 
          opacity: 0.7,
          lineHeight: '1.3',
          color: isSelected ? '#4a5568' : '#718096'
        }}
      >
        {data.description}
      </div>
    </div>
  );
  
  return (
    <div style={{ direction: isRTL ? "rtl" : "ltr" }}>
      <div style={{ marginBottom: '20px' }}>
        <h5 style={{ 
          margin: '0 0 6px 0', 
          fontWeight: '600',
          color: '#2d3748'
        }}>
          🎁 {t("servicess.servicesHadjOmra", "Services Complets Hajj & Omra")}
        </h5>
        <small style={{ 
          color: '#718096',
          textAlign: isRTL ? 'right' : 'left',
          fontSize: '0.85rem',
          display: 'block',
          lineHeight: '1.4'
        }}>
          {t("servicess.servicesDescription", "Sélectionnez les services inclus dans votre package")}
        </small>
      </div>
  
      <div style={{ marginBottom: '15px' }}>
        <label style={{ 
          fontWeight: '600',
          display: 'block',
          marginBottom: '8px',
          color: '#4a5568',
          fontSize: '0.95rem'
        }}>
          {t("servicess.selectServices", "Sélectionnez les services:")}
        </label>
        
        <Select
          isMulti
          options={groupedOptions}
          value={serviciosSeleccionados}
          onChange={handleChange}
          styles={customStyles}
          components={{ Option: OptionWithDescription }}
          placeholder={t("servicess.selectPlaceholder", "Choisissez les services désirés...")}
          noOptionsMessage={() => t("servicess.noOptions", "Aucune option disponible")}
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          isSearchable
        />
      </div>
    </div>
  );
};

export default ServicesHadjOmra;