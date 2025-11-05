import React from 'react';
import { Card, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const DestinacionLocationvacances = ({ postData, handleChangeInput, destinationNumber = 1 }) => {
    const { t, i18n } = useTranslation(["categories"]);
    const isRTL = i18n.language === 'ar';
    
    return (
        <Card className="mb-3">
            <Card.Header>
                <h5 className="mb-0">
                    🏖️ {t('destinoLocation', 'Destination de la Propriété')}
                </h5>
            </Card.Header>
            <Card.Body className="p-3">
                <Form.Group className="w-100">
                <Form.Select
                    name="destinacion"  
                    value={postData.destinacion || ''}  
                    onChange={handleChangeInput}
                    className={`w-100 ${isRTL ? 'text-end' : ''}`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                    size="lg"
                >
                        <option value="">{t('elegirDestino', 'Sélectionnez la destination')}</option>
                        <optgroup label={t('destinosNacionales', 'Destinations Nationales')}>
                            <option value="Alger">{t('citiesss.Alger', 'Alger')}</option>
                            <option value="Oran">{t('citiesss.Oran', 'Oran')}</option>
                            <option value="Constantine">{t('citiesss.Constantine', 'Constantine')}</option>
                            <option value="Annaba">{t('citiesss.Annaba', 'Annaba')}</option>
                            <option value="Blida">{t('citiesss.Blida', 'Blida')}</option>
                            <option value="Batna">{t('citiesss.Batna', 'Batna')}</option>
                            <option value="Djelfa">{t('citiesss.Djelfa', 'Djelfa')}</option>
                            <option value="Sétif">{t('citiesss.Sétif', 'Sétif')}</option>
                            <option value="Sidi Bel Abbès">{t('citiesss.Sidi Bel Abbès', 'Sidi Bel Abbès')}</option>
                            <option value="Biskra">{t('citiesss.Biskra', 'Biskra')}</option>
                            <option value="Tébessa">{t('citiesss.Tébessa', 'Tébessa')}</option>
                            <option value="El Oued">{t('citiesss.El Oued', 'El Oued')}</option>
                            <option value="Skikda">{t('citiesss.Skikda', 'Skikda')}</option>
                            <option value="Tizi Ouzou">{t('citiesss.Tizi Ouzou', 'Tizi Ouzou')}</option>
                            <option value="Béjaïa">{t('citiesss.Béjaïa', 'Béjaïa')}</option>
                            <option value="Tlemcen">{t('citiesss.Tlemcen', 'Tlemcen')}</option>
                            <option value="Ghardaïa">{t('citiesss.Ghardaïa', 'Ghardaïa')}</option>
                            <option value="Mostaganem">{t('citiesss.Mostaganem', 'Mostaganem')}</option>
                            <option value="M'Sila">{t('citiesss.MSila', 'M\'Sila')}</option>
                            <option value="Saïda">{t('citiesss.Saïda', 'Saïda')}</option>
                        </optgroup>
                        <optgroup label={t('destinosSaharianos', 'Destinations Sahariennes')}>
                            <option value="Tamanrasset">{t('citiesss.Tamanrasset', 'Tamanrasset')}</option>
                            <option value="Djanet">{t('citiesss.Djanet', 'Djanet')}</option>
                            <option value="Illizi">{t('citiesss.Illizi', 'Illizi')}</option>
                            <option value="Adrar">{t('citiesss.Adrar', 'Adrar')}</option>
                            <option value="Timimoun">{t('citiesss.Timimoun', 'Timimoun')}</option>
                            <option value="Béchar">{t('citiesss.Béchar', 'Béchar')}</option>
                            <option value="El Menia">{t('citiesss.El Menia', 'El Menia')}</option>
                            <option value="In Salah">{t('citiesss.In Salah', 'In Salah')}</option>
                            <option value="Taghit">{t('citiesss.Taghit', 'Taghit')}</option>
                            <option value="Beni Abbes">{t('citiesss.Beni Abbes', 'Beni Abbes')}</option>
                        </optgroup>
                        <optgroup label={t('destinosCosteros', 'Destinations Côtières')}>
                            <option value="Tipaza">{t('citiesss.Tipaza', 'Tipaza')}</option>
                            <option value="Cherchell">{t('citiesss.Cherchell', 'Cherchell')}</option>
                            <option value="Aïn Taya">{t('citiesss.Aïn Taya', 'Aïn Taya')}</option>
                            <option value="Zéralda">{t('citiesss.Zéralda', 'Zéralda')}</option>
                            <option value="Sidi Fredj">{t('citiesss.Sidi Fredj', 'Sidi Fredj')}</option>
                            <option value="Tichy">{t('citiesss.Tichy', 'Tichy')}</option>
                            <option value="Azeffoun">{t('citiesss.Azeffoun', 'Azeffoun')}</option>
                            <option value="Jijel">{t('citiesss.Jijel', 'Jijel')}</option>
                            <option value="Collo">{t('citiesss.Collo', 'Collo')}</option>
                            <option value="El Kala">{t('citiesss.El Kala', 'El Kala')}</option>
                        </optgroup>
                    </Form.Select>
                </Form.Group>
            </Card.Body>
        </Card>
    );
};

export default DestinacionLocationvacances;