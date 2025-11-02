import React from 'react';
import { Form, Card, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const TitleInput = ({ postData, handleChangeInput, placeholder }) => {
    const { t } = useTranslation(['categories', 'common']);
    
    // Opciones de títulos predefinidos por categoría
    const titleOptions = {
        // 🕋 HAJJ & OMRA
        hadj_Omra: [
            'hadj_omra_complete_package',
            'omra_special_ramadan',
            'hadj_2024_complete',
            'omra_economique',
            'hadj_premium_deluxe',
            'omra_famille_package',
            'hadj_groupe_organise',
            'omra_express_weekend'
        ],
        
        // 🏠 LOCATION VACANCES
        Location_Vacances: [
            'location_appartement_plage',
            'maison_vacances_famille',
            'villa_luxe_piscine',
            'chalet_montagne',
            'studio_centre_ville',
            'riad_traditionnel',
            'appartement_standing',
            'maison_jardin_calme'
        ],
        
        // 🛫 VOYAGE ORGANISE
        "Voyage Organise": [
            'circuit_turquie_complet',
            'tour_europe_7_jours',
            'voyage_organise_maroc',
            'decouverte_tunisie',
            'circuit_espagne_portugal',
            'tour_italie_culture',
            'voyage_grece_iles',
            'aventure_egypte_antique'
        ]
    };

    // Obtener opciones según la categoría seleccionada
    const getCurrentOptions = () => {
        if (!postData.subCategory) return [];
        return titleOptions[postData.subCategory] || [];
    };

    const currentOptions = getCurrentOptions();

    return (
        <Card className="mb-4 border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
                <h6 className="mb-0">
                    <i className="fas fa-heading me-2"></i>
                    {t('categories:titreAnnonce', 'Titre de l\'annonce')}
                </h6>
            </Card.Header>
            <Card.Body>
                <Form.Group className="mb-0">
                    <Form.Label className="fw-bold text-dark">
                        {t('categories:titre', 'Titre')} <span className="text-danger">*</span>
                    </Form.Label>
                    
                    <InputGroup>
                        <InputGroup.Text className="bg-light border-end-0">
                            <i className="fas fa-pencil-alt text-primary"></i>
                        </InputGroup.Text>
                        
                        {/* Select con opciones predefinidas */}
                        <Form.Select
                            name="title"
                            value={postData.title || ''}
                            onChange={handleChangeInput}
                            required
                            className="border-start-0"
                            style={{
                                fontSize: '1.1rem',
                                fontWeight: '500',
                                padding: '12px 16px'
                            }}
                        >
                            <option value="">
                                {t('categories:select_placeholder', 'Sélectionnez un titre pré-défini')}
                            </option>
                            
                            {/* Mostrar opciones según la categoría */}
                            {currentOptions.map((optionKey, index) => (
                                <option key={index} value={t(`categories:titles.${optionKey}`, optionKey)}>
                                    {t(`categories:titles.${optionKey}`, optionKey)}
                                </option>
                            ))}
                            
                            {/* Opción personalizada */}
                            <option value="custom">
                                {t('categories:custom_title', '+ Titre personnalisé')}
                            </option>
                        </Form.Select>
                    </InputGroup>

                    {/* Campo de texto personalizado (solo si se selecciona "Titre personnalisé") */}
                    {postData.title === 'custom' && (
                        <div className="mt-3">
                            <Form.Control
                                type="text"
                                name="title"
                                value={postData.customTitle || ''}
                                onChange={handleChangeInput}
                                placeholder={t('categories:custom_placeholder', 'Écrivez votre titre personnalisé...')}
                                style={{
                                    fontSize: '1.1rem',
                                    fontWeight: '500',
                                    padding: '12px 16px'
                                }}
                            />
                        </div>
                    )}

                    {/* Información y consejos */}
                    <Form.Text className="text-muted mt-2 d-block">
                        <i className="fas fa-lightbulb text-warning me-1"></i>
                        {postData.subCategory 
                            ? t('categories:conseilTitreCategorie', 'Choisissez un titre accrocheur pour votre annonce')
                            : t('categories:conseilTitreGeneral', 'Sélectionnez d\'abord une catégorie pour voir les titres disponibles')
                        }
                    </Form.Text>

                    {/* Contador de caracteres (solo para título personalizado) */}
                    {(postData.title === 'custom' && postData.customTitle) && (
                        <div className="text-end mt-2">
                            <small className={`${(postData.customTitle || '').length > 60 ? 'text-warning' : 'text-muted'}`}>
                                {(postData.customTitle || '').length} / 60 {t('common:caracteres', 'caractères')}
                                {(postData.customTitle || '').length > 60 && (
                                    <span className="ms-1">⚠️ {t('categories:titreTropLong', 'Titre trop long')}</span>
                                )}
                            </small>
                        </div>
                    )}

                    {/* Preview del título seleccionado */}
                    {postData.title && postData.title !== 'custom' && postData.title !== '' && (
                        <div className="mt-3 p-3 bg-light rounded border">
                            <h6 className="text-muted mb-2">
                                {t('categories:title_preview', 'Aperçu de votre titre')}:
                            </h6>
                            <p className="mb-0 fw-bold text-primary">
                                "{postData.title}"
                            </p>
                        </div>
                    )}
                </Form.Group>
            </Card.Body>
        </Card>
    );
};

export default TitleInput;