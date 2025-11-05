import React, { useState, useEffect } from "react";
import { Form, Card, Badge } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Select from 'react-select';

const ServicesLocationVacances = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation(["categories"]);
  const isRTL = i18n.language === 'ar' || i18n.language === 'ara';
  
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);

  // SERVICIOS COMPLETOS PARA LOCATION VACANCES ORGANIZADOS POR CATEGORÍAS
  const serviciosCompletos = [
    // 🏠 SERVICIOS BÁSICOS Y COMODIDADES
    {
      category: "basicos",
      label: "🏠 " + t("servicesss.categoria_basicos", "Services de Base"),
      servicios: [
        { 
          id: "wifi_gratuito",
          label: "📶 " + t("servicesss.wifi_gratuito", "Wi-Fi gratuit"),
          description: t("servicesss.wifiGratuitoDesc", "Connexion internet haut débit")
        },
        { 
          id: "parking_gratuito",
          label: "🅿️ " + t("servicesss.parking_gratuito", "Parking gratuit"),
          description: t("servicesss.parkingGratuitoDesc", "Stationnement sécurisé inclus")
        },
        { 
          id: "climatisation",
          label: "❄️ " + t("servicesss.climatisation", "Climatisation"),
          description: t("servicesss.climatisationDesc", "Air conditionné dans tout le logement")
        },
        { 
          id: "chauffage",
          label: "🔥 " + t("servicesss.chauffage", "Chauffage central"),
          description: t("servicesss.chauffageDesc", "Système de chauffage efficace")
        },
        { 
          id: "eau_chaude",
          label: "🚿 " + t("servicesss.eau_chaude", "Eau chaude 24h/24"),
          description: t("servicesss.eauChaudeDesc", "Chauffe-eau performant")
        }
      ]
    },

    // 🧹 MENAGE ET ENTRETIEN
    {
      category: "menage",
      label: "🧹 " + t("servicesss.categoria_menage", "Ménage et Entretien"),
      servicios: [
        { 
          id: "menage_quotidien",
          label: "✨ " + t("servicesss.menage_quotidien", "Ménage quotidien"),
          description: t("servicesss.menageQuotidienDesc", "Nettoyage journalier des espaces")
        },
        { 
          id: "changement_linge",
          label: "🛏️ " + t("servicesss.changement_linge", "Changement de linge"),
          description: t("servicesss.changementLingeDesc", "Draps et serviettes changés régulièrement")
        },
        { 
          id: "serviettes_fournies",
          label: "🧺 " + t("servicesss.serviettes_fournies", "Serviettes fournies"),
          description: t("servicesss.serviettesFourniesDesc", "Serviettes de bain incluses")
        },
        { 
          id: "draps_fournis",
          label: "🛌 " + t("servicesss.draps_fournis", "Draps fournis"),
          description: t("servicesss.drapsFournisDesc", "Linge de lit de qualité")
        },
        { 
          id: "produits_menage",
          label: "🧴 " + t("servicesss.produits_menage", "Produits ménage fournis"),
          description: t("servicesss.produitsMenageDesc", "Produits d'entretien disponibles")
        }
      ]
    },

    // 🍽️ CUISINE ET ÉQUIPEMENTS
    {
      category: "cuisine",
      label: "🍽️ " + t("servicesss.categoria_cuisine", "Cuisine et Équipements"),
      servicios: [
        { 
          id: "cuisine_equipee",
          label: "🔪 " + t("servicesss.cuisine_equipee", "Cuisine équipée"),
          description: t("servicesss.cuisineEquipeeDesc", "Équipement complet de cuisine")
        },
        { 
          id: "refrigerateur",
          label: "🧊 " + t("servicesss.refrigerateur", "Réfrigérateur/congélateur"),
          description: t("servicesss.refrigerateurDesc", "Frigo et congélateur spacieux")
        },
        { 
          id: "lave_vaisselle",
          label: "🍽️ " + t("servicesss.lave_vaisselle", "Lave-vaisselle"),
          description: t("servicesss.laveVaisselleDesc", "Lave-vaisselle inclus")
        },
        { 
          id: "micro_ondes",
          label: "📦 " + t("servicesss.micro_ondes", "Four à micro-ondes"),
          description: t("servicesss.microOndesDesc", "Micro-ondes pratique")
        },
        { 
          id: "cafe_the",
          label: "☕ " + t("servicesss.cafe_the", "Machine à café/thé"),
          description: t("servicesss.cafeTheDesc", "Machine à café et thé fournie")
        },
        { 
          id: "ustensiles_cuisine",
          label: "🍳 " + t("servicesss.ustensiles_cuisine", "Ustensiles de cuisine"),
          description: t("servicesss.ustensilesCuisineDesc", "Vaisselle et ustensiles complets")
        }
      ]
    },

    // 🎉 LOISIRS ET DIVERTISSEMENTS
    {
      category: "loisirs",
      label: "🎉 " + t("servicesss.categoria_loisirs", "Loisirs et Divertissements"),
      servicios: [
        { 
          id: "piscine_privee",
          label: "🏊 " + t("servicesss.piscine_privee", "Piscine privée"),
          description: t("servicesss.piscinePriveeDesc", "Piscine exclusive au logement")
        },
        { 
          id: "piscine_commune",
          label: "🏊‍♂️ " + t("servicesss.piscine_commune", "Piscine commune"),
          description: t("servicesss.piscineCommuneDesc", "Accès à piscine partagée")
        },
        { 
          id: "jacuzzi",
          label: "💦 " + t("servicesss.jacuzzi", "Jacuzzi/Spa"),
          description: t("servicesss.jacuzziDesc", "Jacuzzi ou spa privatif")
        },
        { 
          id: "bbq_zone",
          label: "🔥 " + t("servicesss.bbq_zone", "Zone barbecue"),
          description: t("servicesss.bbqZoneDesc", "Espace barbecue équipé")
        },
        { 
          id: "terrasse_jardin",
          label: "🌳 " + t("servicesss.terrasse_jardin", "Terrasse/Jardin privé"),
          description: t("servicesss.terrasseJardinDesc", "Espace extérieur privatif")
        },
        { 
          id: "tv_cable",
          label: "📺 " + t("servicesss.tv_cable", "TV câble/satellite"),
          description: t("servicesss.tvCableDesc", "Télévision avec chaînes internationales")
        }
      ]
    },

    // 👨‍👩‍👧‍👦 SERVICES FAMILIAUX
    {
      category: "familiaux",
      label: "👨‍👩‍👧‍👦 " + t("servicesss.categoria_familiaux", "Services Familiaux"),
      servicios: [
        { 
          id: "cuna_bebe",
          label: "👶 " + t("servicesss.cuna_bebe", "Lit bébé"),
          description: t("servicesss.cunaBebeDesc", "Lit parapluie ou berceau")
        },
        { 
          id: "chaise_haute",
          label: "🪑 " + t("servicesss.chaise_haute", "Chaise haute"),
          description: t("servicesss.chaiseHauteDesc", "Chaise haute pour bébé")
        },
        { 
          id: "jouets_enfants",
          label: "🧸 " + t("servicesss.jouets_enfants", "Jouets enfants"),
          description: t("servicesss.jouetsEnfantsDesc", "Jeux et jouets pour enfants")
        },
        { 
          id: "parc_jeux",
          label: "🎠 " + t("servicesss.parc_jeux", "Parc de jeux"),
          description: t("servicesss.parcJeuxDesc", "Espace jeux pour enfants")
        },
        { 
          id: "securite_enfants",
          label: "🔒 " + t("servicesss.securite_enfants", "Sécurité enfants"),
          description: t("servicesss.securiteEnfantsDesc", "Équipements de sécurité")
        }
      ]
    },

    // 🧺 LAVERIE ET BLANCHISSERIE
    {
      category: "laverie",
      label: "🧺 " + t("servicesss.categoria_laverie", "Laverie et Blanchisserie"),
      servicios: [
        { 
          id: "machine_laver",
          label: "🧼 " + t("servicesss.machine_laver", "Machine à laver"),
          description: t("servicesss.machineLaverDesc", "Lave-linge à disposition")
        },
        { 
          id: "seche_linge",
          label: "🌬️ " + t("servicesss.seche_linge", "Sèche-linge"),
          description: t("servicesss.secheLingeDesc", "Sèche-linge inclus")
        },
        { 
          id: "fer_repasser",
          label: "👔 " + t("servicesss.fer_repasser", "Fer à repasser"),
          description: t("servicesss.ferRepasserDesc", "Fer et table à repasser")
        },
        { 
          id: "table_repassage",
          label: "🧽 " + t("servicesss.table_repassage", "Table à repasser"),
          description: t("servicesss.tableRepassageDesc", "Table de repassage fournie")
        }
      ]
    },

    // 🏖️ ACCÈS ET LOCALISATION
    {
      category: "acces",
      label: "🏖️ " + t("servicesss.categoria_acces", "Accès et Localisation"),
      servicios: [
        { 
          id: "acces_plage",
          label: "🏖️ " + t("servicesss.acces_plage", "Accès direct plage"),
          description: t("servicesss.accesPlageDesc", "Accès privé ou proche plage")
        },
        { 
          id: "vue_mer",
          label: "🌅 " + t("servicesss.vue_mer", "Vue sur mer"),
          description: t("servicesss.vueMerDesc", "Vue panoramique sur la mer")
        },
        { 
          id: "centre_ville",
          label: "🏙️ " + t("servicesss.centre_ville", "Proche centre-ville"),
          description: t("servicesss.centreVilleDesc", "À proximité du centre-ville")
        },
        { 
          id: "commerces_proximite",
          label: "🛒 " + t("servicesss.commerces_proximite", "Commerces à proximité"),
          description: t("servicesss.commercesProximiteDesc", "Magasins et restaurants proches")
        },
        { 
          id: "transport_public",
          label: "🚍 " + t("servicesss.transport_public", "Transport public proche"),
          description: t("servicesss.transportPublicDesc", "Arrêts de transport à proximité")
        }
      ]
    },

    // 💪 SPORT ET BIEN-ÊTRE
    {
      category: "sport",
      label: "💪 " + t("servicesss.categoria_sport", "Sport et Bien-être"),
      servicios: [
        { 
          id: "acces_gym",
          label: "💪 " + t("servicesss.acces_gym", "Accès salle de sport"),
          description: t("servicesss.accesGymDesc", "Accès à une salle de sport")
        },
        { 
          id: "equipement_sport",
          label: "🚴 " + t("servicesss.equipement_sport", "Équipement sportif"),
          description: t("servicesss.equipementSportDesc", "Matériel sportif disponible")
        },
        { 
          id: "velos_disponibles",
          label: "🚲 " + t("servicesss.velos_disponibles", "Vélos disponibles"),
          description: t("servicesss.velosDisponiblesDesc", "Vélos en libre-service")
        },
        { 
          id: "rando_guides",
          label: "🥾 " + t("servicesss.rando_guides", "Guides randonnée"),
          description: t("servicesss.randoGuidesDesc", "Cartes et guides randonnée")
        }
      ]
    },

    // 🔐 SÉCURITÉ ET SERVICES
    {
      category: "securite",
      label: "🔐 " + t("servicesss.categoria_securite", "Sécurité et Services"),
      servicios: [
        { 
          id: "securite_24h",
          label: "🛡️ " + t("servicesss.securite_24h", "Sécurité 24h/24"),
          description: t("servicesss.securite24hDesc", "Service de sécurité permanent")
        },
        { 
          id: "coffre_fort",
          label: "💰 " + t("servicesss.coffre_fort", "Coffre-fort"),
          description: t("servicesss.coffreFortDesc", "Coffre-fort dans le logement")
        },
        { 
          id: "assistance_locale",
          label: "📞 " + t("servicesss.assistance_locale", "Assistance locale"),
          description: t("servicesss.assistanceLocaleDesc", "Personne de contact sur place")
        },
        { 
          id: "menage_fin_sejour",
          label: "✨ " + t("servicesss.menage_fin_sejour", "Ménage fin de séjour"),
          description: t("servicesss.menageFinSejourDesc", "Nettoyage complet inclus")
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
      backgroundColor: '#28a745',
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
        backgroundColor: '#218838',
        color: 'white'
      }
    }),
    option: (base, state) => ({
      ...base,
      textAlign: isRTL ? 'right' : 'left',
      direction: isRTL ? 'rtl' : 'ltr',
      backgroundColor: state.isSelected ? '#28a745' : state.isFocused ? '#f8f9fa' : 'white',
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
        backgroundColor: isSelected ? '#28a745' : isFocused ? '#f8f9fa' : 'white',
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
          🏡 {t("servicesss.servicesLocationVacances", "Services Location de Vacances")}
        </h5>
        <small className="text-muted" style={{ 
          textAlign: isRTL ? "right" : "left",
          fontSize: "0.85rem"
        }}>
          {t("servicesss.servicesDescriptionLocation", "Sélectionnez les équipements et services inclus")}
        </small>
      </Card.Header>
      <Card.Body>
        <div style={{ direction: isRTL ? "rtl" : "ltr" }}>
          <Form.Group>
            <Form.Label className="fw-bold">
              {t("servicesss.selectServicesLocation", "Choisissez les équipements:")}
            </Form.Label>
            
            <Select
              isMulti
              options={groupedOptions}
              value={serviciosSeleccionados}
              onChange={handleChange}
              styles={customStyles}
              components={{ Option: OptionWithDescription }}
              placeholder={t("servicesss.selectPlaceholderLocation", "Sélectionnez les équipements désirés...")}
              noOptionsMessage={() => t("servicess.noOptions", "Aucune option disponible")}
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              isSearchable
            />
            
            <Form.Text className="text-muted" style={{ 
              textAlign: isRTL ? "right" : "left",
              display: 'block',
              marginTop: '8px'
            }}>
              {t("servicesss.multiselectHelpLocation", "Vous pouvez sélectionner plusieurs équipements. Utilisez la recherche pour trouver rapidement.")}
            </Form.Text>
          </Form.Group>

         
        </div>
      </Card.Body>
    </Card>
  );
};

export default ServicesLocationVacances;