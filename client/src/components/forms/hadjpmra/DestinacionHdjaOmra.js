import React from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const DestinacionHadjOmra = ({ postData, handleChangeInput, destinationNumber = 1 }) => {
    const { t } = useTranslation('categories');
    
    return (
        <Card className="mb-1">
            <Card.Header>
                <h6 className="mb-0">{t('destino')} {destinationNumber} </h6>
            </Card.Header>
          
               
                 
                        <Form.Group className="mb-3">
                               <Form.Select
                                name={`destinacionvoyage${destinationNumber}`}
                                value={postData[`destinacionvoyage${destinationNumber}`] || ''}
                                onChange={handleChangeInput}
                            >
                                <option value="">{t('elegirDestinoPeregrinacion')}</option>
                                <optgroup label={t('ciudadesSantas')}>
                                    <option value="La Meca">La Meca</option>
                                    <option value="Medina">Medina</option>
                                    <option value="La Meca y Medina">La Meca y Medina</option>
                                    <option value="Meca - Medina - Yeda">Meca - Medina - Yeda</option>
                                </optgroup>
                                <optgroup label={t('ciudadesSantasArabia')}>
                                    <option value="Yeda">Yeda</option>
                                    <option value="Taif">Taif</option>
                                    <option value="Riad">Riad</option>
                                    <option value="Dammam">Dammam</option>
                                    <option value="Jizan">Jizan</option>
                                    <option value="Abha">Abha</option>
                                </optgroup>
                            </Form.Select>
                        </Form.Group>
                   
         
        </Card>
    );
};

export default DestinacionHadjOmra;