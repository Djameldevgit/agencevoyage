import React from 'react';
import { Card, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const DestinacionLocationvacances = ({ postData, handleChangeInput, destinationNumber = 1 }) => {
    const { t } = useTranslation('categories');
    
    return (
        <Card className="mb-3">
            <Card.Header  >
                <h5 className="mb-0">
                    🏖️ {t('destinoLocation', 'Destino de la Propiedad')}
                </h5>
            </Card.Header>
            <Card.Body className="p-3">
                <Form.Group className="w-100">
                    <Form.Select
                        name={`destinacionlocacionvoyage${destinationNumber}`}
                        value={postData[`destinacionlocacionvoyage${destinationNumber}`] || ''}
                        onChange={handleChangeInput}
                        className="w-100"
                        size="lg"
                    >
                        <option value="">{t('elegirDestino', 'Seleccione el destino')}</option>
                        <optgroup label={t('destinosNacionales', 'Destinos Nacionales')}>
                            <option value="Alger">Alger</option>
                            <option value="Oran">Oran</option>
                            <option value="Constantine">Constantine</option>
                            <option value="Annaba">Annaba</option>
                            <option value="Blida">Blida</option>
                            <option value="Batna">Batna</option>
                            <option value="Djelfa">Djelfa</option>
                            <option value="Sétif">Sétif</option>
                            <option value="Sidi Bel Abbès">Sidi Bel Abbès</option>
                            <option value="Biskra">Biskra</option>
                            <option value="Tébessa">Tébessa</option>
                            <option value="El Oued">El Oued</option>
                            <option value="Skikda">Skikda</option>
                            <option value="Tizi Ouzou">Tizi Ouzou</option>
                            <option value="Béjaïa">Béjaïa</option>
                            <option value="Tlemcen">Tlemcen</option>
                            <option value="Ghardaïa">Ghardaïa</option>
                            <option value="Mostaganem">Mostaganem</option>
                            <option value="M'Sila">M'Sila</option>
                            <option value="Saïda">Saïda</option>
                        </optgroup>
                        <optgroup label={t('destinosSaharianos', 'Destinos Saharianos')}>
                            <option value="Tamanrasset">Tamanrasset</option>
                            <option value="Djanet">Djanet</option>
                            <option value="Illizi">Illizi</option>
                            <option value="Adrar">Adrar</option>
                            <option value="Timimoun">Timimoun</option>
                            <option value="Béchar">Béchar</option>
                            <option value="El Menia">El Menia</option>
                            <option value="In Salah">In Salah</option>
                            <option value="Taghit">Taghit</option>
                            <option value="Beni Abbes">Beni Abbes</option>
                        </optgroup>
                        <optgroup label={t('destinosCosteros', 'Destinos Costeros')}>
                            <option value="Tipaza">Tipaza</option>
                            <option value="Cherchell">Cherchell</option>
                            <option value="Aïn Taya">Aïn Taya</option>
                            <option value="Zéralda">Zéralda</option>
                            <option value="Sidi Fredj">Sidi Fredj</option>
                            <option value="Tichy">Tichy</option>
                            <option value="Azeffoun">Azeffoun</option>
                            <option value="Jijel">Jijel</option>
                            <option value="Collo">Collo</option>
                            <option value="El Kala">El Kala</option>
                        </optgroup>
                    </Form.Select>
                </Form.Group>
            </Card.Body>
        </Card>
    );
};

export default DestinacionLocationvacances;