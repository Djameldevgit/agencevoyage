import React from 'react';
import { Form, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const CategorySelector = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation([ "categories"]);

    const categorias = [
        { value: "Voyage Organise", emoji: "🗺️", color: "primary" },
        { value: "Location_Vacances", emoji: "🏠", color: "success" },
        { value: "hadj_Omra", emoji: "🕋", color: "warning" },
        { value: "Reservations_Visa", emoji: "📋", color: "info" },
        { value: "Sejour", emoji: "🏨", color: "secondary" },
        { value: "Croisiere", emoji: "🚢", color: "danger" },
        { value: "Autre", emoji: "🔖", color: "dark" }
    ];

    return (
        <Card>
            <Card.Header >
                <h5 className="mb-0">
                    📂 {t('categoriaPublicacion', 'Categoría de Publicación')}
                </h5>
            </Card.Header>
            <Card.Body className="p-3">
                <Form.Group className="w-100">
                    <Form.Select 
                        name="subCategory" 
                        value={postData.subCategory || ''} 
                        onChange={handleChangeInput}
                        size="lg"
                        required
                        className="w-100"
                    >
                        <option value="">{t('seleccionarCategoria', 'Seleccione una categoría')}</option>
                        {categorias.map((categoria) => (
                            <option key={categoria.value} value={categoria.value}>
                                {categoria.emoji} {t(`categoriass.${categoria.value}`, categoria.value)}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Card.Body>
        </Card>
    );
};

export default CategorySelector;