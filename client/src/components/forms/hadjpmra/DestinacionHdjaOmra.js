import React from 'react';
import { Card, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const DestinacionHadjOmra = ({ postData, handleChangeInput, destinationNumber = 1 }) => {
    const { t } = useTranslation('categories');
    
    return (
        <Card className="mb-3">
            <Card.Header  >
                <h5 className="mb-0">
                    🕋 {t('destinoHajjOmra', 'Destino Hajj & Omra')}
                </h5>
            </Card.Header>
            <Card.Body className="p-3">
                <Form.Select
                    name={`destinacionomra${destinationNumber}`}
                    value={postData[`destinacionomra${destinationNumber}`] || ''}
                    onChange={handleChangeInput}
                    className="w-100"
                    size="lg"
                >
                    <option value="">{t('selectDestination', 'Seleccione destino')}</option>
                    <optgroup label={t('ciudadesSantas', 'Ciudades Santas')}>
                        <option value="La Meca">La Meca</option>
                        <option value="Medina">Medina</option>
                        <option value="La Meca y Medina">La Meca y Medina</option>
                        <option value="Meca - Medina - Yeda">Meca - Medina - Yeda</option>
                    </optgroup>
                    <optgroup label={t('ciudadesSantasArabia', 'Otras ciudades de Arabia Saudita')}>
                        <option value="Yeda">Yeda</option>
                        <option value="Taif">Taif</option>
                        <option value="Riad">Riad</option>
                        <option value="Dammam">Dammam</option>
                        <option value="Jizan">Jizan</option>
                        <option value="Abha">Abha</option>
                        {/* Nuevas ciudades agregadas */}
                        <option value="Al Khobar">Al Khobar</option>
                        <option value="Dhahran">Dhahran</option>
                        <option value="Al Hofuf">Al Hofuf</option>
                        <option value="Tabuk">Tabuk</option>
                        <option value="Al Ula">Al Ula</option>
                        <option value="Najran">Najran</option>
                        <option value="Al Baha">Al Baha</option>
                        <option value="Hail">Hail</option>
                        <option value="Jubail">Jubail</option>
                        <option value="Yanbu">Yanbu</option>
                        <option value="Al Qassim">Al Qassim</option>
                        <option value="Al Jouf">Al Jouf</option>
                        <option value="Asir">Asir</option>
                        <option value="Makkah Region">Makkah Region</option>
                        <option value="Medina Region">Medina Region</option>
                    </optgroup>
                </Form.Select>
            </Card.Body>
        </Card>
    );
};

export default DestinacionHadjOmra;