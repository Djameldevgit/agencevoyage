import React from 'react';
import { Card, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const DestinacionHadjOmra = ({ postData, handleChangeInput, destinationNumber = 1 }) => {
    const { t, i18n } = useTranslation(["categories"]);
    const isRTL = i18n.language === 'ar';
    
    return (
        <Card className="mb-3">
            <Card.Header>
                <h5 className="mb-0">
                    🕋 {t('destinoHajjOmra', 'Destination Hajj & Omra')}
                </h5>
            </Card.Header>
            <Card.Body className="p-3">
                <Form.Select
                    name="destinacion"  
                    value={postData.destinacion || ''}  
                    onChange={handleChangeInput}
                    className={`w-100 ${isRTL ? 'text-end' : ''}`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                    size="lg"
                >
                    <option value="">{t('selectDestination', 'Sélectionnez la destination')}</option>
                    <optgroup label={t('ciudadesSantas', 'Villes Saintes')}>
                        <option value="La Meca">{t('citiessss.La Meca', 'La Mecque')}</option>
                        <option value="Medina">{t('citiessss.Medina', 'Médine')}</option>
                        <option value="La Meca y Medina">{t('citiessss.La Meca y Medina', 'La Mecque et Médine')}</option>
                        <option value="Meca - Medina - Yeda">{t('citiessss.Meca - Medina - Yeda', 'Mecque - Médine - Djeddah')}</option>
                    </optgroup>
                    <optgroup label={t('ciudadesSantasArabia', 'Autres villes d\'Arabie Saoudite')}>
                        <option value="Yeda">{t('citiessss.Yeda', 'Djeddah')}</option>
                        <option value="Taif">{t('citiessss.Taif', 'Taïf')}</option>
                        <option value="Riad">{t('citiessss.Riad', 'Riyad')}</option>
                        <option value="Dammam">{t('citiessss.Dammam', 'Dammam')}</option>
                        <option value="Jizan">{t('citiessss.Jizan', 'Jizan')}</option>
                        <option value="Abha">{t('citiessss.Abha', 'Abha')}</option>
                        {/* Nuevas ciudades agregadas */}
                        <option value="Al Khobar">{t('citiessss.Al Khobar', 'Al Khobar')}</option>
                        <option value="Dhahran">{t('citiessss.Dhahran', 'Dhahran')}</option>
                        <option value="Al Hofuf">{t('citiessss.Al Hofuf', 'Al Hofuf')}</option>
                        <option value="Tabuk">{t('citiessss.Tabuk', 'Tabuk')}</option>
                        <option value="Al Ula">{t('citiessss.Al Ula', 'Al Ula')}</option>
                        <option value="Najran">{t('citiessss.Najran', 'Najran')}</option>
                        <option value="Al Baha">{t('citiessss.Al Baha', 'Al Baha')}</option>
                        <option value="Hail">{t('citiessss.Hail', 'Hail')}</option>
                        <option value="Jubail">{t('citiessss.Jubail', 'Jubail')}</option>
                        <option value="Yanbu">{t('citiessss.Yanbu', 'Yanbu')}</option>
                        <option value="Al Qassim">{t('citiessss.Al Qassim', 'Al Qassim')}</option>
                        <option value="Al Jouf">{t('citiessss.Al Jouf', 'Al Jouf')}</option>
                        <option value="Asir">{t('citiessss.Asir', 'Asir')}</option>
                        <option value="Makkah Region">{t('citiessss.Makkah Region', 'Région de La Mecque')}</option>
                        <option value="Medina Region">{t('citiessss.Medina Region', 'Région de Médine')}</option>
                    </optgroup>
                </Form.Select>
            </Card.Body>
        </Card>
    );
};

export default DestinacionHadjOmra;