import React from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';

const Destinacionvoyageorganise = ({ postData, handleChangeInput, destinationNumber = 1 }) => {
    const { t, i18n } = useTranslation('categories');
    const isRTL = i18n.language === 'ar' || i18n.language === 'ara';
    
    // Opciones de destino agrupadas con traducciones
    const destinationOptions = [
        {
            label: t('destinosArabes', 'Destinations Arabes'),
            options: [
                { value: 'Dubai', label: t('dubai', 'Dubai') },
                { value: 'Abu Dhabi', label: t('abuDhabi', 'Abu Dhabi') },
                { value: 'Sharjah', label: t('sharjah', 'Sharjah') },
                { value: 'El Cairo', label: t('elCairo', 'El Cairo') },
                { value: 'Sharm El Sheikh', label: t('sharmElSheikh', 'Sharm El Sheikh') },
                { value: 'Alejandría', label: t('alejandria', 'Alejandría') },
                { value: 'Túnez', label: t('tunez', 'Túnez') },
                { value: 'Sousse', label: t('sousse', 'Sousse') },
                { value: 'Djerba', label: t('djerba', 'Djerba') },
                { value: 'Hammamet', label: t('hammamet', 'Hammamet') },
                { value: 'Amán', label: t('aman', 'Amán') },
                { value: 'Aqaba', label: t('aqaba', 'Aqaba') },
                { value: 'Petra', label: t('petra', 'Petra') },
                { value: 'Doha', label: t('doha', 'Doha') },
                { value: 'Manama', label: t('manama', 'Manama') },
                { value: 'Mascate', label: t('mascate', 'Mascate') },
                { value: 'Salalah', label: t('salalah', 'Salalah') },
                { value: 'Beirut', label: t('beirut', 'Beirut') },
                { value: 'Trípoli', label: t('tripoli', 'Trípoli') }
            ]
        },
        {
            label: t('destinosTurquia', 'Destinations Turquie'),
            options: [
                { value: 'Estambul', label: t('estambul', 'Estambul') },
                { value: 'Ankara', label: t('ankara', 'Ankara') },
                { value: 'Esmirna', label: t('esmirna', 'Esmirna') },
                { value: 'Antalya', label: t('antalya', 'Antalya') },
                { value: 'Bursa', label: t('bursa', 'Bursa') },
                { value: 'Konya', label: t('konya', 'Konya') },
                { value: 'Trabzon', label: t('trabzon', 'Trabzon') },
                { value: 'Capadocia', label: t('capadocia', 'Capadocia') },
                { value: 'Pamukkale', label: t('pamukkale', 'Pamukkale') },
                { value: 'Éfeso', label: t('efeso', 'Éfeso') }
            ]
        },
        {
            label: t('destinosAsia', 'Destinations Asie'),
            options: [
                { value: 'Kuala Lumpur', label: t('kualaLumpur', 'Kuala Lumpur') },
                { value: 'Langkawi', label: t('langkawi', 'Langkawi') },
                { value: 'Penang', label: t('penang', 'Penang') },
                { value: 'Bangkok', label: t('bangkok', 'Bangkok') },
                { value: 'Phuket', label: t('phuket', 'Phuket') },
                { value: 'Chiang Mai', label: t('chiangMai', 'Chiang Mai') },
                { value: 'Singapur', label: t('singapur', 'Singapur') },
                { value: 'Bali', label: t('bali', 'Bali') },
                { value: 'Yakarta', label: t('yakarta', 'Yakarta') },
                { value: 'Seúl', label: t('seul', 'Seúl') }
            ]
        },
        {
            label: t('destinosEuropa', 'Destinations Europe'),
            options: [
                { value: 'París', label: t('paris', 'París') },
                { value: 'Lyon', label: t('lyon', 'Lyon') },
                { value: 'Marsella', label: t('marsella', 'Marsella') },
                { value: 'Londres', label: t('londres', 'Londres') },
                { value: 'Manchester', label: t('manchester', 'Manchester') },
                { value: 'Roma', label: t('roma', 'Roma') },
                { value: 'Milán', label: t('milan', 'Milán') },
                { value: 'Venecia', label: t('venecia', 'Venecia') },
                { value: 'Madrid', label: t('madrid', 'Madrid') },
                { value: 'Barcelona', label: t('barcelona', 'Barcelona') },
                { value: 'Berlín', label: t('berlin', 'Berlín') },
                { value: 'Múnich', label: t('munich', 'Múnich') },
                { value: 'Ámsterdam', label: t('amsterdam', 'Ámsterdam') },
                { value: 'Bruselas', label: t('bruselas', 'Bruselas') },
                { value: 'Ginebra', label: t('ginebra', 'Ginebra') },
                { value: 'Zúrich', label: t('zurich', 'Zúrich') }
            ]
        },
        {
            label: t('destinosAmerica', 'Destinations Amérique'),
            options: [
                { value: 'Nueva York', label: t('nuevaYork', 'Nueva York') },
                { value: 'Los Ángeles', label: t('losAngeles', 'Los Ángeles') },
                { value: 'Miami', label: t('miami', 'Miami') },
                { value: 'Las Vegas', label: t('lasVegas', 'Las Vegas') },
                { value: 'Toronto', label: t('toronto', 'Toronto') },
                { value: 'Montreal', label: t('montreal', 'Montreal') },
                { value: 'Vancouver', label: t('vancouver', 'Vancouver') }
            ]
        },
        {
            label: t('destinosAfrica', 'Destinations Afrique'),
            options: [
                { value: 'Casablanca', label: t('casablanca', 'Casablanca') },
                { value: 'Marrakech', label: t('marrakech', 'Marrakech') },
                { value: 'Tánger', label: t('tanger', 'Tánger') },
                { value: 'Dakar', label: t('dakar', 'Dakar') },
                { value: 'Túnez', label: t('tunez', 'Túnez') },
                { value: 'Nairobi', label: t('nairobi', 'Nairobi') },
                { value: 'Ciudad del Cabo', label: t('ciudadDelCabo', 'Ciudad del Cabo') }
            ]
        }
    ];

    const handleDestinationChange = (selectedOption) => {
        handleChangeInput({
            target: {
                name: `destinacionvoyage${destinationNumber}`,
                value: selectedOption ? selectedOption.value : ''
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
            width: '100%',
            minWidth: '100%',
            '&:hover': {
                borderColor: '#cbd5e0'
            }
        }),
        menu: (base) => ({
            ...base,
            textAlign: isRTL ? 'right' : 'left',
            direction: isRTL ? 'rtl' : 'ltr',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            width: '100%'
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
        }),
        container: (base) => ({
            ...base,
            width: '100%'
        })
    };

    const selectedValue = destinationOptions
        .flatMap(group => group.options)
        .find(option => option.value === postData[`destinacionvoyage${destinationNumber}`]);

    return (
        <div style={{ 
            direction: isRTL ? "rtl" : "ltr",
            marginBottom: '20px',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '20px',
            backgroundColor: 'white'
        }}>
            <div style={{ marginBottom: '20px' }}>
                <h6 style={{ 
                    margin: '0 0 6px 0', 
                    fontWeight: '600',
                    color: '#2d3748',
                    textAlign: isRTL ? 'right' : 'left',
                    fontSize: isRTL ? '1.1rem' : '1rem',
                    fontFamily: isRTL ? "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" : 'inherit',
                    letterSpacing: isRTL ? 'normal' : 'inherit'
                }}>
                    {isRTL ? `${t('internacional', 'International')} - ${t('destino', 'Destination')} ${destinationNumber} 📍` : `📍 ${t('destino', 'Destination')} ${destinationNumber} - ${t('internacional', 'International')}`}
                </h6>
            </div>
        
            <div style={{ marginBottom: '15px' }}>
              
                <Select
                    options={destinationOptions}
                    value={selectedValue}
                    onChange={handleDestinationChange}
                    styles={customStyles}
                    placeholder={t('elegirDestino', 'Choisir une destination...')}
                    noOptionsMessage={() => t('noOptions', 'Aucune option disponible')}
                    isSearchable
                    isClearable
                />
            </div>
        </div>
    );
};

export default Destinacionvoyageorganise;