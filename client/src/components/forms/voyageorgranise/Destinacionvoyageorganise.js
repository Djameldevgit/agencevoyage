import React from 'react';
import { Card, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Destinacionvoyageorganise = ({ postData, handleChangeInput, destinationNumber = 1 }) => {
    const { t } = useTranslation(["categories"]);
    
    return (
        <Card className="mb-3">
            <Card.Header>
                <h5 className="mb-0">
                    🗺️ {t('destinoViaje', 'Destino del Viaje')}
                </h5>
            </Card.Header>
            <Card.Body className="p-3">
                <Form.Select
                    name={`destinacionvoyageorganise${destinationNumber}`}
                    value={postData[`destinacionvoyageorganise${destinationNumber}`] || ''}
                    onChange={handleChangeInput}
                    className="w-100"
                    size="lg"
                >
                    <option value="">{t('selectDestination', 'Seleccione destino')}</option>
                    <optgroup label={t('destinosArabia', 'Destinos Arabia y Medio Oriente')}>
                        <option value="Dubai">{t('cities.Dubai', 'Dubai')}</option>
                        <option value="Abu Dhabi">{t('cities.Abu Dhabi', 'Abu Dhabi')}</option>
                        <option value="Sharjah">{t('cities.Sharjah', 'Sharjah')}</option>
                        <option value="El Cairo">{t('cities.El Cairo', 'El Cairo')}</option>
                        <option value="Sharm El Sheikh">{t('cities.Sharm El Sheikh', 'Sharm El Sheikh')}</option>
                        <option value="Alejandría">{t('cities.Alejandría', 'Alejandría')}</option>
                        <option value="Túnez">{t('cities.Túnez', 'Túnez')}</option>
                        <option value="Sousse">{t('cities.Sousse', 'Sousse')}</option>
                        <option value="Djerba">{t('cities.Djerba', 'Djerba')}</option>
                        <option value="Hammamet">{t('cities.Hammamet', 'Hammamet')}</option>
                        <option value="Amán">{t('cities.Amán', 'Amán')}</option>
                        <option value="Aqaba">{t('cities.Aqaba', 'Aqaba')}</option>
                        <option value="Petra">{t('cities.Petra', 'Petra')}</option>
                        <option value="Doha">{t('cities.Doha', 'Doha')}</option>
                        <option value="Manama">{t('cities.Manama', 'Manama')}</option>
                        <option value="Mascate">{t('cities.Mascate', 'Mascate')}</option>
                        <option value="Salalah">{t('cities.Salalah', 'Salalah')}</option>
                        <option value="Beirut">{t('cities.Beirut', 'Beirut')}</option>
                        <option value="Trípoli">{t('cities.Trípoli', 'Trípoli')}</option>
                    </optgroup>
                    <optgroup label={t('destinosTurquia', 'Destinos Turquía')}>
                        <option value="Estambul">{t('cities.Estambul', 'Estambul')}</option>
                        <option value="Ankara">{t('cities.Ankara', 'Ankara')}</option>
                        <option value="Esmirna">{t('cities.Esmirna', 'Esmirna')}</option>
                        <option value="Antalya">{t('cities.Antalya', 'Antalya')}</option>
                        <option value="Bursa">{t('cities.Bursa', 'Bursa')}</option>
                        <option value="Konya">{t('cities.Konya', 'Konya')}</option>
                        <option value="Trabzon">{t('cities.Trabzon', 'Trabzon')}</option>
                        <option value="Capadocia">{t('cities.Capadocia', 'Capadocia')}</option>
                        <option value="Pamukkale">{t('cities.Pamukkale', 'Pamukkale')}</option>
                        <option value="Éfeso">{t('cities.Éfeso', 'Éfeso')}</option>
                    </optgroup>
                    <optgroup label={t('destinosAsia', 'Destinos Asia')}>
                        <option value="Kuala Lumpur">{t('cities.Kuala Lumpur', 'Kuala Lumpur')}</option>
                        <option value="Langkawi">{t('cities.Langkawi', 'Langkawi')}</option>
                        <option value="Penang">{t('cities.Penang', 'Penang')}</option>
                        <option value="Bangkok">{t('cities.Bangkok', 'Bangkok')}</option>
                        <option value="Phuket">{t('cities.Phuket', 'Phuket')}</option>
                        <option value="Chiang Mai">{t('cities.Chiang Mai', 'Chiang Mai')}</option>
                        <option value="Singapur">{t('cities.Singapur', 'Singapur')}</option>
                        <option value="Bali">{t('cities.Bali', 'Bali')}</option>
                        <option value="Yakarta">{t('cities.Yakarta', 'Yakarta')}</option>
                        <option value="Seúl">{t('cities.Seúl', 'Seúl')}</option>
                    </optgroup>
                    <optgroup label={t('destinosEuropa', 'Destinos Europa')}>
                        <option value="París">{t('cities.París', 'París')}</option>
                        <option value="Lyon">{t('cities.Lyon', 'Lyon')}</option>
                        <option value="Marsella">{t('cities.Marsella', 'Marsella')}</option>
                        <option value="Londres">{t('cities.Londres', 'Londres')}</option>
                        <option value="Manchester">{t('cities.Manchester', 'Manchester')}</option>
                        <option value="Roma">{t('cities.Roma', 'Roma')}</option>
                        <option value="Milán">{t('cities.Milán', 'Milán')}</option>
                        <option value="Venecia">{t('cities.Venecia', 'Venecia')}</option>
                        <option value="Madrid">{t('cities.Madrid', 'Madrid')}</option>
                        <option value="Barcelona">{t('cities.Barcelona', 'Barcelona')}</option>
                        <option value="Berlín">{t('cities.Berlín', 'Berlín')}</option>
                        <option value="Múnich">{t('cities.Múnich', 'Múnich')}</option>
                        <option value="Ámsterdam">{t('cities.Ámsterdam', 'Ámsterdam')}</option>
                        <option value="Bruselas">{t('cities.Bruselas', 'Bruselas')}</option>
                        <option value="Ginebra">{t('cities.Ginebra', 'Ginebra')}</option>
                        <option value="Zúrich">{t('cities.Zúrich', 'Zúrich')}</option>
                    </optgroup>
                    <optgroup label={t('destinosAmerica', 'Destinos América')}>
                        <option value="Nueva York">{t('cities.Nueva York', 'Nueva York')}</option>
                        <option value="Los Ángeles">{t('cities.Los Ángeles', 'Los Ángeles')}</option>
                        <option value="Miami">{t('cities.Miami', 'Miami')}</option>
                        <option value="Las Vegas">{t('cities.Las Vegas', 'Las Vegas')}</option>
                        <option value="Toronto">{t('cities.Toronto', 'Toronto')}</option>
                        <option value="Montreal">{t('cities.Montreal', 'Montreal')}</option>
                        <option value="Vancouver">{t('cities.Vancouver', 'Vancouver')}</option>
                    </optgroup>
                    <optgroup label={t('destinosAfrica', 'Destinos África')}>
                        <option value="Casablanca">{t('cities.Casablanca', 'Casablanca')}</option>
                        <option value="Marrakech">{t('cities.Marrakech', 'Marrakech')}</option>
                        <option value="Tánger">{t('cities.Tánger', 'Tánger')}</option>
                        <option value="Dakar">{t('cities.Dakar', 'Dakar')}</option>
                        <option value="Nairobi">{t('cities.Nairobi', 'Nairobi')}</option>
                        <option value="Ciudad del Cabo">{t('cities.Ciudad del Cabo', 'Ciudad del Cabo')}</option>
                    </optgroup>
                </Form.Select>
            </Card.Body>
        </Card>
    );
};

export default Destinacionvoyageorganise;