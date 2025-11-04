import React from 'react';
import { Form, Card, Badge, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ContactReservation = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation([  "categories"]);
 
    // Detectar tipo de contacto para mostrar badges
    const detectContactType = (contactText) => {
        if (!contactText) return [];
        
        const types = [];
        if (contactText.includes('@') || contactText.toLowerCase().includes('email')) {
            types.push('email');
        }
        if (/\+\d{2,3}[-.\s]?\d{2,3}[-.\s]?\d{3}[-.\s]?\d{3}/.test(contactText) || 
            contactText.toLowerCase().includes('tel') || 
            contactText.toLowerCase().includes('whatsapp')) {
            types.push('phone');
        }
        if (contactText.toLowerCase().includes('http') || 
            contactText.toLowerCase().includes('www') || 
            contactText.toLowerCase().includes('.com') || 
            contactText.toLowerCase().includes('.dz')) {
            types.push('website');
        }
        if (contactText.toLowerCase().includes('facebook') || 
            contactText.toLowerCase().includes('instagram') || 
            contactText.toLowerCase().includes('twitter')) {
            types.push('social');
        }
        if (contactText.toLowerCase().includes('adresse') || 
            contactText.toLowerCase().includes('rue') || 
            contactText.toLowerCase().includes('address')) {
            types.push('address');
        }
        
        return types;
    };

    const contactTypes = detectContactType(postData.contacto || '');

    return (
        <Card>
            <Card.Header >
                <h5 className="mb-0">
                    📞 {t('contacto', 'Información de Contacto')}
                </h5>
            </Card.Header>
            <Card.Body className="p-3">
                <Form.Group className="w-100">
                    {/* Badges de tipos de contacto detectados */}
                    {contactTypes.length > 0 && (
                        <div className="mb-3">
                            <small className="text-muted me-2">{t('typesDetectes', 'Tipos detectados')}:</small>
                            {contactTypes.map((type, index) => (
                                <Badge 
                                    key={index} 
                                    bg={
                                        type === 'phone' ? 'success' :
                                        type === 'email' ? 'primary' :
                                        type === 'website' ? 'info' :
                                        type === 'social' ? 'warning' :
                                        'secondary'
                                    } 
                                    className="me-1 mb-1"
                                >
                                    {t(`type_${type}`, type)}
                                </Badge>
                            ))}
                        </div>
                    )}

                    <InputGroup>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="contacto"
                            value={postData.contacto || ''}
                            onChange={handleChangeInput}
                            placeholder={t('placeholderContacto', 'Teléfono, email, WhatsApp, dirección...')}
                            required
                            className="w-100"
                            style={{ resize: 'vertical' }}
                        />
                    </InputGroup>

                    {/* Contador de caracteres */}
                    <div className="text-end small text-muted mt-2">
                        {(postData.contacto || '').length} {t('caracteres', 'caracteres')}
                    </div>
                </Form.Group>
            </Card.Body>
        </Card>
    );
};

export default ContactReservation;