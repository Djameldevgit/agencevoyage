import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';

const Destinacionvoyageorganise = ({ postData, handleChangeInput }) => {
   
    const { t, i18n } = useTranslation(["categories"]);
    const isRTL = i18n.language === 'ar';
    // 🔥 DESTINOS SIMPLIFICADOS SIN GRUPOS
    const destinationOptions = [
        // Destinos Árabes
        { value: 'Dubai', label: t('dubai', 'Dubai') },
        { value: 'Abu Dhabi', label: t('abuDhabi', 'Abu Dhabi') },
        { value: 'El Cairo', label: t('elCairo', 'El Cairo') },
        { value: 'Sharm El Sheikh', label: t('sharmElSheikh', 'Sharm El Sheikh') },
        { value: 'Túnez', label: t('tunez', 'Túnez') },
        { value: 'Amán', label: t('aman', 'Amán') },
        { value: 'Petra', label: t('petra', 'Petra') },
        { value: 'Doha', label: t('doha', 'Doha') },
        { value: 'Beirut', label: t('beirut', 'Beirut') },

        // Turquía
        { value: 'Estambul', label: t('estambul', 'Estambul') },
        { value: 'Antalya', label: t('antalya', 'Antalya') },
        { value: 'Capadocia', label: t('capadocia', 'Capadocia') },
        { value: 'Pamukkale', label: t('pamukkale', 'Pamukkale') },

        // Asia
        { value: 'Kuala Lumpur', label: t('kualaLumpur', 'Kuala Lumpur') },
        { value: 'Bangkok', label: t('bangkok', 'Bangkok') },
        { value: 'Singapur', label: t('singapur', 'Singapur') },
        { value: 'Bali', label: t('bali', 'Bali') },
        { value: 'Seúl', label: t('seul', 'Seúl') },

        // Europa
        { value: 'París', label: t('paris', 'París') },
        { value: 'Londres', label: t('londres', 'Londres') },
        { value: 'Roma', label: t('roma', 'Roma') },
        { value: 'Madrid', label: t('madrid', 'Madrid') },
        { value: 'Barcelona', label: t('barcelona', 'Barcelona') },
        { value: 'Berlín', label: t('berlin', 'Berlín') },
        { value: 'Ámsterdam', label: t('amsterdam', 'Ámsterdam') },

        // América
        { value: 'Nueva York', label: t('nuevaYork', 'Nueva York') },
        { value: 'Los Ángeles', label: t('losAngeles', 'Los Ángeles') },
        { value: 'Miami', label: t('miami', 'Miami') },
        { value: 'Toronto', label: t('toronto', 'Toronto') },

        // África
        { value: 'Casablanca', label: t('casablanca', 'Casablanca') },
        { value: 'Marrakech', label: t('marrakech', 'Marrakech') },
        { value: 'Dakar', label: t('dakar', 'Dakar') },
        { value: 'Ciudad del Cabo', label: t('ciudadDelCabo', 'Ciudad del Cabo') }
    ];

    const handleChange = (e) => {
        handleChangeInput({
            target: {
                name: 'destinacion',
                value: e.target.value
            }
        });
    };

    return (
        <Form.Select
        name="destinacion"  
        value={postData.destinacion || ''}  
        onChange={handleChangeInput}
        className={`w-100 ${isRTL ? 'text-end' : ''}`}
        dir={isRTL ? 'rtl' : 'ltr'}
        size="lg"
        >
            <option value="">{t('elegirDestino', 'Seleccione destino...')}</option>
            {destinationOptions.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </Form.Select>
    );
};

export default Destinacionvoyageorganise;